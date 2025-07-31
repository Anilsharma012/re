import { RequestHandler } from "express";
import { getDatabase } from "../services/database";

export const getStorageStatus: RequestHandler = async (req, res) => {
  try {
    const db = await getDatabase();
    
    // Try to get counts from all collections
    const vehiclesCount = await db.collection('vehicles').countDocuments();
    const enquiriesCount = await db.collection('enquiries').countDocuments();
    const contactsCount = await db.collection('contacts').countDocuments();
    
    // Try to get sample data
    const sampleVehicles = await db.collection('vehicles').find({}).limit(3).toArray();
    
    res.json({
      success: true,
      storage: {
        type: vehiclesCount > 0 ? 'MongoDB or Memory' : 'Memory',
        collections: {
          vehicles: vehiclesCount,
          enquiries: enquiriesCount,
          contacts: contactsCount
        },
        sampleVehicles: sampleVehicles.map(v => ({
          id: v._id,
          name: v.name,
          type: v.type,
          price: v.price
        }))
      }
    });
  } catch (error) {
    console.error('Debug storage error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get storage status',
      error: error.message
    });
  }
};

export const seedTestVehicles: RequestHandler = async (req, res) => {
  try {
    const db = await getDatabase();
    
    // Clear existing vehicles
    await db.collection('vehicles').deleteMany({});
    
    const testVehicles = [
      {
        name: "Test Vehicle 1",
        type: "Sedan",
        capacity: 4,
        price: 2500,
        features: ["AC", "GPS"],
        description: "Test vehicle with image",
        available: true,
        image: "./image/maruti.webp",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Test Vehicle 2",
        type: "SUV",
        capacity: 7,
        price: 4000,
        features: ["AC", "GPS", "Entertainment"],
        description: "Another test vehicle",
        available: true,
        image: "./image/c.avif",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    const result = await db.collection('vehicles').insertMany(testVehicles);
    
    res.json({
      success: true,
      message: `Seeded ${result.insertedCount} test vehicles`,
      vehicles: testVehicles
    });
  } catch (error) {
    console.error('Seed test vehicles error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to seed test vehicles',
      error: error.message
    });
  }
};
