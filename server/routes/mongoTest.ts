import { RequestHandler } from "express";
import { getDatabase } from "../services/database";

export const testMongoConnection: RequestHandler = async (req, res) => {
  try {
    console.log('🧪 Testing MongoDB Atlas connection...');
    const db = await getDatabase();
    
    // Test collection operations
    const vehicles = await db.collection('vehicles').find({}).toArray();
    const enquiries = await db.collection('enquiries').find({}).toArray();
    const contacts = await db.collection('contacts').find({}).toArray();
    
    // Test inserting a test document
    const testDoc = {
      test: true,
      timestamp: new Date(),
      message: "MongoDB Atlas connection test"
    };
    
    const insertResult = await db.collection('connection_tests').insertOne(testDoc);
    console.log('✅ Test document inserted with ID:', insertResult.insertedId);
    
    // Test deleting the test document
    await db.collection('connection_tests').deleteOne({ _id: insertResult.insertedId });
    console.log('✅ Test document deleted successfully');
    
    const result = {
      success: true,
      message: 'MongoDB Atlas connection successful',
      database: 'tours',
      collections: {
        vehicles: vehicles.length,
        enquiries: enquiries.length,
        contacts: contacts.length
      },
      testInsertId: insertResult.insertedId.toString(),
      timestamp: new Date()
    };
    
    console.log('✅ MongoDB Atlas test completed:', result);
    res.json(result);
    
  } catch (error) {
    console.error('❌ MongoDB Atlas test failed:', error.message);
    res.status(500).json({
      success: false,
      message: 'MongoDB Atlas connection failed',
      error: error.message,
      timestamp: new Date()
    });
  }
};
