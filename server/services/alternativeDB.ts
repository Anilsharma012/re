import { MongoClient, Db } from "mongodb";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToMongoDBAtlas(): Promise<{
  db: Db | null;
  isConnected: boolean;
}> {
  try {
    if (cachedClient && cachedDb) {
      // Test if connection is still alive
      await cachedDb.admin().ping();
      console.log("✅ Using cached MongoDB connection");
      return { db: cachedDb, isConnected: true };
    }

    console.log("🔥 Creating new MongoDB Atlas connection...");

    // Try different connection strings
    const connectionStrings = [
      "mongodb+srv://Tour:Anilsharma123@cluster0.mfp2blo.mongodb.net/tours?retryWrites=true&w=majority&ssl=false",
      "mongodb+srv://Tour:Anilsharma123@cluster0.mfp2blo.mongodb.net/tours?retryWrites=true&w=majority",
      "mongodb+srv://Tour:Anilsharma123@cluster0.mfp2blo.mongodb.net/?retryWrites=true&w=majority&authSource=admin",
    ];

    for (let i = 0; i < connectionStrings.length; i++) {
      const uri = connectionStrings[i];
      console.log(
        `🔄 Attempting connection ${i + 1}/${connectionStrings.length}...`,
      );

      try {
        const client = new MongoClient(uri, {
          connectTimeoutMS: 30000,
          serverSelectionTimeoutMS: 30000,
          maxPoolSize: 5,
          minPoolSize: 1,
          retryWrites: true,
          retryReads: true,
        });

        console.log("⏳ Connecting...");
        await client.connect();

        console.log("🏓 Testing ping...");
        const db = client.db("tours");
        await db.admin().ping();

        console.log("✅ MongoDB Atlas connected successfully!");
        cachedClient = client;
        cachedDb = db;

        return { db: db, isConnected: true };
      } catch (connectionError) {
        console.log(
          `❌ Connection attempt ${i + 1} failed:`,
          connectionError.message,
        );
        if (i === connectionStrings.length - 1) {
          throw connectionError;
        }
      }
    }

    throw new Error("All connection attempts failed");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB Atlas:", error.message);
    return { db: null, isConnected: false };
  }
}

export async function forceMongoDBTest(): Promise<any> {
  console.log("🚀 FORCE MongoDB Test Starting...");

  const { db, isConnected } = await connectToMongoDBAtlas();

  if (!isConnected || !db) {
    throw new Error("MongoDB connection failed");
  }

  // Test operations
  console.log("📝 Testing vehicle operations...");

  // Clear test vehicles
  await db
    .collection("vehicles")
    .deleteMany({ name: { $regex: /^Force Test/ } });

  // Insert test vehicle
  const testVehicle = {
    name: `Force Test Vehicle ${Date.now()}`,
    type: "Test",
    capacity: 4,
    price: 2000,
    features: ["AC", "GPS", "Force Test"],
    description: "Force test vehicle to verify MongoDB Atlas",
    available: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const insertResult = await db.collection("vehicles").insertOne(testVehicle);
  console.log("✅ Test vehicle inserted:", insertResult.insertedId);

  // Get all vehicles
  const allVehicles = await db.collection("vehicles").find({}).toArray();
  console.log("📊 Total vehicles:", allVehicles.length);

  return {
    success: true,
    connectionType: "MongoDB Atlas",
    database: "tours",
    totalVehicles: allVehicles.length,
    testInsertId: insertResult.insertedId.toString(),
    recentVehicles: allVehicles.slice(-3).map((v) => ({
      id: v._id.toString(),
      name: v.name,
      type: v.type,
      price: v.price,
    })),
  };
}
