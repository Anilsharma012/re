import { RequestHandler } from "express";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const verifyToken: RequestHandler = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided',
        authenticated: false 
      });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log('✅ Token verification successful for:', (decoded as any).username);
      
      return res.json({
        success: true,
        message: 'Token is valid',
        authenticated: true,
        user: {
          username: (decoded as any).username,
          role: (decoded as any).role
        }
      });
      
    } catch (jwtError) {
      console.log('❌ JWT verification failed:', jwtError.message);
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
        authenticated: false
      });
    }
    
  } catch (error) {
    console.error('❌ Token verification endpoint error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Token verification failed',
      authenticated: false
    });
  }
};
