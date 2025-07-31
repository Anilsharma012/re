import { RequestHandler } from "express";
import { getDatabase } from "../services/database";

export const testCompleteVehicleFlow: RequestHandler = async (req, res) => {
  try {
    console.log('🚗 Testing complete vehicle creation flow...');
    
    const db = await getDatabase();
    
    // Create a test vehicle
    const testVehicle = {
      name: `Test Vehicle ${Date.now()}`,
      type: "Sedan",
      capacity: 4,
      price: 2500,
      features: ["AC", "GPS", "Music System"],
      description: "Test vehicle created via API",
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    console.log('📝 Inserting test vehicle...');
    const insertResult = await db.collection('vehicles').insertOne(testVehicle);
    console.log('✅ Insert result:', insertResult.insertedId);
    
    // Fetch all vehicles to verify
    console.log('📋 Fetching all vehicles...');
    const allVehicles = await db.collection('vehicles').find({}).toArray();
    console.log(`📊 Total vehicles in database: ${allVehicles.length}`);
    
    // Get the created vehicle
    const createdVehicle = await db.collection('vehicles').findOne({ _id: insertResult.insertedId });
    
    res.json({
      success: true,
      message: 'Vehicle creation test completed successfully',
      test: {
        insertedId: insertResult.insertedId.toString(),
        totalVehicles: allVehicles.length,
        createdVehicle: createdVehicle,
        allVehicleNames: allVehicles.map(v => v.name)
      },
      database: {
        type: 'MongoDB Atlas',
        collections: ['vehicles', 'enquiries', 'contacts']
      }
    });
    
  } catch (error) {
    console.error('❌ Vehicle creation test failed:', error);
    
    res.status(500).json({
      success: false,
      message: 'Vehicle creation test failed',
      error: error.message
    });
  }
};
