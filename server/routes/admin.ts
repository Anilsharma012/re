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
    const db = await getDatabase();
    
    // Get stats from different collections
    const enquiriesCount = await db.collection('enquiries').countDocuments();
    const contactsCount = await db.collection('contacts').countDocuments();
    
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

    res.json(response);
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats'
    });
  }
};
