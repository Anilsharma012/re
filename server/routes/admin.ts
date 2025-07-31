import { RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getDatabase } from '../services/database';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here-change-in-production';

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  token?: string;
  message: string;
}

export interface AdminStatsResponse {
  totalVisitors: number;
  totalEnquiries: number;
  totalContacts: number;
  recentActivity: Array<{
    type: string;
    message: string;
    timestamp: Date;
  }>;
}

export const adminLogin: RequestHandler = async (req, res) => {
  try {
    const { username, password }: AdminLoginRequest = req.body;

    // Simple hardcoded admin credentials
    if (username === 'Admin' && password === 'admin123') {
      const token = jwt.sign(
        { username: 'Admin', role: 'admin' },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      const response: AdminLoginResponse = {
        success: true,
        token,
        message: 'Login successful'
      };

      res.json(response);
    } else {
      const response: AdminLoginResponse = {
        success: false,
        message: 'Invalid credentials'
      };
      res.status(401).json(response);
    }
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export const verifyAdmin: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export const getAdminStats: RequestHandler = async (req, res) => {
  try {
    console.log('📊 Fetching admin stats...');
    const db = await getDatabase();

    // Get stats from different collections
    const enquiriesCount = await db.collection('enquiries').countDocuments();
    const contactsCount = await db.collection('contacts').countDocuments();

    console.log(`📊 Stats: ${enquiriesCount} enquiries, ${contactsCount} contacts`);

    // Get recent activity
    const recentEnquiries = await db.collection('enquiries')
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    const recentContacts = await db.collection('contacts')
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    const recentActivity = [
      ...recentEnquiries.map(e => ({
        type: 'enquiry',
        message: `New enquiry from ${e.name}`,
        timestamp: e.createdAt || new Date()
      })),
      ...recentContacts.map(c => ({
        type: 'contact',
        message: `New contact from ${c.name}`,
        timestamp: c.createdAt || new Date()
      }))
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10);

    const response: AdminStatsResponse = {
      totalVisitors: 1250, // You can implement actual visitor tracking
      totalEnquiries: enquiriesCount,
      totalContacts: contactsCount,
      recentActivity
    };

    console.log('✅ Admin stats retrieved successfully');
    res.json(response);
  } catch (error) {
    console.error('❌ Admin stats error:', error.message);

    // Return a working response even if database fails
    const fallbackResponse: AdminStatsResponse = {
      totalVisitors: 1250,
      totalEnquiries: 0,
      totalContacts: 0,
      recentActivity: []
    };

    res.json(fallbackResponse);
  }
};

// Get all contacts
export const getContacts: RequestHandler = async (req, res) => {
  try {
    const db = await getDatabase();

    // Handle both real MongoDB and fallback database
    let contacts;
    try {
      contacts = await db.collection('contacts')
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
    } catch (sortError) {
      // Fallback database doesn't support sort().toArray()
      const findResult = await db.collection('contacts').find({});
      contacts = Array.isArray(findResult) ? findResult : [];
      // Sort manually if needed
      contacts.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB.getTime() - dateA.getTime();
      });
    }

    res.json({
      success: true,
      contacts: contacts || []
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.json({
      success: false,
      message: 'Failed to fetch contacts',
      contacts: []
    });
  }
};

// Get all enquiries
export const getEnquiries: RequestHandler = async (req, res) => {
  try {
    const db = await getDatabase();
    const enquiries = await db.collection('enquiries')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.json({
      success: true,
      enquiries: enquiries
    });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiries'
    });
  }
};

// Update contact status
export const updateContactStatus: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const db = await getDatabase();
    const result = await db.collection('contacts').updateOne(
      { _id: id },
      { $set: { status, updatedAt: new Date() } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact status updated successfully'
    });
  } catch (error) {
    console.error('Error updating contact status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact status'
    });
  }
};

// Update enquiry status
export const updateEnquiryStatus: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const db = await getDatabase();
    const result = await db.collection('enquiries').updateOne(
      { _id: id },
      { $set: { status, updatedAt: new Date() } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    res.json({
      success: true,
      message: 'Enquiry status updated successfully'
    });
  } catch (error) {
    console.error('Error updating enquiry status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update enquiry status'
    });
  }
};

// Delete contact
export const deleteContact: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getDatabase();

    const result = await db.collection('contacts').deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact'
    });
  }
};

// Delete enquiry
export const deleteEnquiry: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getDatabase();

    const result = await db.collection('enquiries').deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    res.json({
      success: true,
      message: 'Enquiry deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete enquiry'
    });
  }
};
