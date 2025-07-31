import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;
let db: Db | null = null;

const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || 'Anilsharma123';
const MONGODB_URI = process.env.MONGODB_URI || `mongodb+srv://Tour:${MONGODB_PASSWORD}@cluster0.mfp2blo.mongodb.net/?retryWrites=true&w=majority&ssl=true`;
const DB_NAME = 'tour_admin';

// All data now stored in MongoDB Atlas only - no local storage fallback

export async function connectToDatabase(): Promise<Db> {
  if (db) {
    return db;
  }

  try {
    console.log('Attempting to connect to MongoDB Atlas with correct credentials...');
    client = new MongoClient(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 15000,
      retryWrites: true,
      ssl: true
    });

    await client.connect();
    console.log('MongoDB client connected, testing ping...');

    await client.db("admin").command({ ping: 1 });
    console.log('MongoDB ping successful');

    db = client.db(DB_NAME);
    console.log(`✅ Connected to MongoDB Atlas database: ${DB_NAME}`);
    return db;
  } catch (error) {
    console.error('❌ FAILED to connect to MongoDB Atlas:', error.message);
    console.error('Full error:', error);
    throw new Error(`MongoDB connection failed: ${error.message}`);
  }
}

// No mock database - MongoDB Atlas only

export async function getDatabase(): Promise<Db> {
  if (!db) {
    return await connectToDatabase();
  }
  return db;
}

export async function closeDatabaseConnection(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}
