import { RequestHandler } from "express";
import { MongoClient } from "mongodb";

export const testDirectMongo: RequestHandler = async (req, res) => {
  let client: MongoClient | null = null;
  
  try {
    console.log('🚀 Direct MongoDB Atlas connection test starting...');
    
    const MONGODB_URI = process.env.MONGODB_URI || `mongodb+srv://Tour:Anilsharma123@cluster0.mfp2blo.mongodb.net/tours?retryWrites=true&w=majority&appName=TourApp`;
    
    console.log('🔗 Connection URI (masked):', MONGODB_URI.replace(/:[^:@]*@/, ':****@'));
    
    // Create client with minimal options
    client = new MongoClient(MONGODB_URI);
    
    console.log('🤝 Attempting to connect...');
    await client.connect();
    
    console.log('✅ Connected! Testing database access...');
    const db = client.db('tours');
    
    // Test ping
    await db.admin().ping();
    console.log('✅ Ping successful!');
    
    // Test collections access
    const collections = await db.listCollections().toArray();
    console.log('📂 Available collections:', collections.map(c => c.name));
    
    // Test vehicle collection
    const vehicleCount = await db.collection('vehicles').countDocuments();
    console.log('🚗 Vehicle count:', vehicleCount);
    
    // Insert a test vehicle
    const testVehicle = {
      name: "Test Vehicle " + Date.now(),
      type: "Test",
      capacity: 4,
      price: 1000,
      features: ["Test Feature"],
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const insertResult = await db.collection('vehicles').insertOne(testVehicle);
    console.log('✅ Test vehicle inserted with ID:', insertResult.insertedId);
    
    // Fetch all vehicles
    const vehicles = await db.collection('vehicles').find({}).toArray();
    console.log('📋 Total vehicles in database:', vehicles.length);
    
    res.json({
      success: true,
      message: 'MongoDB Atlas connection successful!',
      database: 'tours',
      collections: collections.map(c => c.name),
      vehicleCount: vehicles.length,
      testInsertId: insertResult.insertedId.toString(),
      vehicles: vehicles.map(v => ({
        _id: v._id,
        name: v.name,
        type: v.type,
        price: v.price
      }))
    });
    
  } catch (error) {
    console.error('❌ Direct MongoDB test failed:', error);
    
    res.status(500).json({
      success: false,
      message: 'MongoDB Atlas connection failed',
      error: error.message,
      stack: error.stack
    });
    
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 Connection closed');
    }
  }
};
