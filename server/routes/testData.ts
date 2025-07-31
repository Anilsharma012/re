import { RequestHandler } from "express";
import { getDatabase } from "../services/database";

export const seedTestData: RequestHandler = async (req, res) => {
  try {
    const db = await getDatabase();

    // Sample vehicles
    const sampleVehicles = [
      {
        name: "Maruti Suzuki Dzire",
        type: "Sedan",
        capacity: 4,
        price: 2500,
        features: ["AC", "Music System", "GPS", "First Aid"],
        description: "Perfect for small family trips and city tours",
        available: true,
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
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Sample contacts
    const sampleContacts = [
      {
        name: "Rajesh Kumar",
        email: "rajesh@example.com",
        phone: "9876543210",
        subject: "Tour Package Inquiry",
        message:
          "Hi, I'm interested in a 5-day tour package to Rajasthan for my family of 4. Could you please provide details and pricing?",
        status: "new",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        name: "Priya Singh",
        email: "priya.singh@example.com",
        phone: "9123456789",
        subject: "Vehicle Booking",
        message:
          "I need to book an Innova for a one-day local sightseeing in Jaipur. What are your rates?",
        status: "responded",
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      },
      {
        name: "Amit Sharma",
        email: "amit.sharma@example.com",
        phone: "9988776655",
        subject: "Corporate Booking",
        message:
          "We need transportation for our company outing for 25 people. Please share your packages.",
        status: "new",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      },
    ];

    // Sample enquiries
    const sampleEnquiries = [
      {
        name: "Suresh Patel",
        mobile: "9876543210",
        email: "suresh@example.com",
        pickupLocation: "Delhi",
        destination: "Agra",
        travelDate: "2024-02-15",
        passengers: "4",
        vehicleType: "SUV",
        message:
          "Planning a family trip to Agra. Need pickup from IGI Airport and full day tour.",
        status: "new",
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      },
      {
        name: "Kavita Joshi",
        mobile: "9123456789",
        email: "kavita@example.com",
        pickupLocation: "Mumbai",
        destination: "Shirdi",
        travelDate: "2024-02-20",
        passengers: "8",
        vehicleType: "Tempo Traveller",
        message:
          "Religious trip to Shirdi for elderly people. Need comfortable vehicle.",
        status: "quoted",
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      },
      {
        name: "Ravi Gupta",
        mobile: "9988776655",
        pickupLocation: "Jaipur",
        destination: "Udaipur",
        travelDate: "2024-02-25",
        passengers: "2",
        vehicleType: "Sedan",
        message: "Honeymoon trip to Udaipur. Looking for luxury sedan.",
        status: "confirmed",
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      },
    ];

    // Insert sample data
    await db.collection("vehicles").insertMany(sampleVehicles);
    await db.collection("contacts").insertMany(sampleContacts);
    await db.collection("enquiries").insertMany(sampleEnquiries);

    res.json({
      success: true,
      message: "Test data seeded successfully",
      data: {
        vehicles: sampleVehicles.length,
        contacts: sampleContacts.length,
        enquiries: sampleEnquiries.length,
      },
    });
  } catch (error) {
    console.error("Error seeding test data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to seed test data",
    });
  }
};
