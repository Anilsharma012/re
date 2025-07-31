import { RequestHandler } from "express";
import { getDatabase } from "../services/database";

export const quickTestVehicle: RequestHandler = async (req, res) => {
  try {
    const db = await getDatabase();
    
    const testVehicle = {
      name: "Test Car - " + new Date().toLocaleTimeString(),
      type: "Sedan",
      capacity: 4,
      price: 2500,
      features: ["AC", "GPS", "Music System"],
      description: "This is a test vehicle added automatically",
      available: true,
      image: "./image/maruti.webp",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('vehicles').insertOne(testVehicle);
    
    res.json({
      success: true,
      message: 'Test vehicle added successfully',
      vehicleId: result.insertedId,
      vehicle: testVehicle
    });
  } catch (error) {
    console.error('Quick test error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add test vehicle',
      error: error.message
    });
  }
};

export const getAllVehiclesTest: RequestHandler = async (req, res) => {
  try {
    const db = await getDatabase();
    const vehicles = await db.collection('vehicles').find({}).toArray();
    
    res.json({
      success: true,
      count: vehicles.length,
      vehicles: vehicles
    });
  } catch (error) {
    console.error('Get vehicles test error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get vehicles',
      error: error.message
    });
  }
};
