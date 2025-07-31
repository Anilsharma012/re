import { RequestHandler } from "express";
import { getDatabase } from "../services/database";

export const seedVehicles: RequestHandler = async (req, res) => {
  try {
    const db = await getDatabase();

    // Clear existing vehicles
    await db.collection("vehicles").deleteMany({});

    // Sample vehicles with images
    const sampleVehicles = [
      {
        name: "Maruti Suzuki Dzire",
        type: "Sedan",
        capacity: 4,
        price: 2500,
        features: ["AC", "Music System", "GPS", "First Aid"],
        description: "Perfect for small family trips and city tours",
        available: true,
        image: "./image/maruti.webp",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hyundai Verna",
        type: "Sedan",
        capacity: 4,
        price: 3000,
        features: ["AC", "Premium Interior", "GPS", "Bluetooth"],
        description: "Luxury sedan for comfortable long-distance travel",
        available: true,
        image: "./image/v.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Toyota Innova Crysta",
        type: "SUV",
        capacity: 7,
        price: 4000,
        features: ["AC", "Captain Seats", "GPS", "Entertainment", "Large Boot"],
        description: "Most popular choice for family and group travel",
        available: true,
        image: "./image/c.avif",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mahindra Scorpio",
        type: "SUV",
        capacity: 7,
        price: 3800,
        features: ["AC", "4WD", "GPS", "Robust Build"],
        description: "Ideal for rough terrains and adventure trips",
        available: true,
        image: "./image/s.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Force Urbania",
        type: "Tempo Traveller",
        capacity: 12,
        price: 6500,
        features: [
          "AC",
          "Reclining Seats",
          "GPS",
          "Entertainment",
          "Luggage Space",
        ],
        description: "Perfect for group tours and pilgrimages",
        available: true,
        image: "./image/t.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tempo Traveller 17 Seater",
        type: "Tempo Traveller",
        capacity: 17,
        price: 7500,
        features: ["AC", "Comfortable Seats", "GPS", "Music System", "Ice Box"],
        description: "Ideal for medium-sized groups and corporate trips",
        available: true,
        image: "./image/tt.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mini Bus 25 Seater",
        type: "Bus",
        capacity: 25,
        price: 8500,
        features: ["AC", "Spacious", "GPS", "Entertainment", "Large Luggage"],
        description: "Great for large groups and events",
        available: true,
        image: "./image/mm.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mini Bus 32 Seater",
        type: "Bus",
        capacity: 32,
        price: 9500,
        features: ["AC", "Premium Seats", "GPS", "Entertainment", "Washroom"],
        description: "Perfect for large corporate groups and wedding parties",
        available: true,
        image: "./image/mmm.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Insert vehicles
    const result = await db.collection("vehicles").insertMany(sampleVehicles);

    res.json({
      success: true,
      message: `Successfully seeded ${result.insertedCount} vehicles`,
      vehicles: sampleVehicles.length,
    });
  } catch (error) {
    console.error("Error seeding vehicles:", error);
    res.status(500).json({
      success: false,
      message: "Failed to seed vehicles",
    });
  }
};
