import { RequestHandler } from "express";
import { MongoClient } from "mongodb";

export const instantMongoTest: RequestHandler = async (req, res) => {
  let client: MongoClient | null = null;

  try {
    console.log("🔥 INSTANT MongoDB Atlas Test Starting...");

    // Use environment variable first, then fallback
    const MONGODB_URI =
      process.env.MONGODB_URI ||
      "mongodb+srv://Tour:Anilsharma123@cluster0.mfp2blo.mongodb.net/?retryWrites=true&w=majority";

    console.log("🌐 Connecting to:", MONGODB_URI.replace(/:[^:@]*@/, ":****@"));

    // Create client with minimal options for better compatibility
    client = new MongoClient(MONGODB_URI);

    console.log("⏳ Attempting connection...");
    await client.connect();
    console.log("✅ Connected successfully!");

    // Connect to the tours database
    const db = client.db("tours");
    console.log("📂 Using database: tours");

    // Test with a ping
    await db.admin().ping();
    console.log("🏓 Ping successful!");

    // Clear any existing test data
    await db.collection("vehicles").deleteMany({ name: { $regex: /^Test/ } });
    console.log("🧹 Cleared existing test vehicles");

    // Insert a test vehicle
    const testVehicle = {
      name: `Test Vehicle ${new Date().toLocaleTimeString()}`,
      type: "Test",
      capacity: 4,
      price: 1500,
      features: ["AC", "GPS", "Test Feature"],
      description: "Test vehicle created to verify MongoDB Atlas connection",
      available: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log("➕ Inserting test vehicle...");
    const insertResult = await db.collection("vehicles").insertOne(testVehicle);
    console.log("✅ Vehicle inserted with ID:", insertResult.insertedId);

    // Fetch all vehicles to count
    const allVehicles = await db.collection("vehicles").find({}).toArray();
    console.log(`📊 Total vehicles in MongoDB: ${allVehicles.length}`);

    // Get recent vehicles
    const recentVehicles = allVehicles.slice(-5).map((v) => ({
      id: v._id.toString(),
      name: v.name,
      type: v.type,
      price: v.price,
      createdAt: v.createdAt,
    }));

    const response = {
      success: true,
      message: "🎉 MongoDB Atlas Connection Successful!",
      connection: {
        database: "tours",
        status: "connected",
        totalVehicles: allVehicles.length,
        testInsertId: insertResult.insertedId.toString(),
      },
      recentVehicles: recentVehicles,
      timestamp: new Date(),
    };

    console.log("✅ MongoDB Atlas test completed successfully!");
    res.json(response);
  } catch (error) {
    console.error("❌ MongoDB Atlas connection failed:", error.message);
    console.error("❌ Error details:", error);

    res.status(500).json({
      success: false,
      message: "MongoDB Atlas connection failed",
      error: error.message,
      errorType: error.name,
      timestamp: new Date(),
    });
  } finally {
    if (client) {
      await client.close();
      console.log("🔌 MongoDB connection closed");
    }
  }
};
