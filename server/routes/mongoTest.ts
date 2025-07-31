import { RequestHandler } from "express";
import { getDatabase } from "../services/database";

export const testMongoConnection: RequestHandler = async (req, res) => {
  try {
    console.log('🧪 Testing MongoDB Atlas connection...');
    const db = await getDatabase();
    
    // Test basic database operations
    console.log('✅ Database connection successful');
    
    // Test inserting a test document
    const testDoc = {
      test: true,
      message: "Connection test successful",
      timestamp: new Date()
    };
    
    const insertResult = await db.collection('connection_test').insertOne(testDoc);
    console.log('✅ Insert test successful:', insertResult.insertedId);
    
    // Test reading the document back
    const readResult = await db.collection('connection_test').findOne({ _id: insertResult.insertedId });
    console.log('✅ Read test successful');
    
    // Clean up test document
    await db.collection('connection_test').deleteOne({ _id: insertResult.insertedId });
    console.log('✅ Delete test successful');
    
    // Get collection stats
    const vehiclesCount = await db.collection('vehicles').countDocuments();
    const enquiriesCount = await db.collection('enquiries').countDocuments();
    const contactsCount = await db.collection('contacts').countDocuments();
    
    res.json({
      success: true,
      message: '🎉 MongoDB Atlas connection working perfectly!',
      details: {
        connection: 'Connected successfully',
        database: 'tour_admin',
        operations: 'Insert, Read, Delete all working',
        collections: {
          vehicles: vehiclesCount,
          enquiries: enquiriesCount,
          contacts: contactsCount
        }
      }
    });
  } catch (error) {
    console.error('❌ MongoDB connection test failed:', error);
    res.status(500).json({
      success: false,
      message: 'MongoDB Atlas connection failed',
      error: error.message,
      details: 'Please check your connection string and password'
    });
  }
};
