import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;
let db: Db | null = null;

const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || 'admin123';
const MONGODB_URI = process.env.MONGODB_URI || `mongodb+srv://Tour:${MONGODB_PASSWORD}@cluster0.mfp2blo.mongodb.net/?retryWrites=true&w=majority&ssl=true`;
const DB_NAME = 'tour_admin';

// In-memory storage as fallback
const memoryStorage = {
  enquiries: [] as any[],
  contacts: [] as any[],
  vehicles: [] as any[]
};

export async function connectToDatabase(): Promise<Db> {
  if (db) {
    return db;
  }

  try {
    console.log('Attempting to connect to MongoDB Atlas...');
    client = new MongoClient(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      retryWrites: true,
      ssl: true
    });

    await client.connect();
    console.log('MongoDB client connected, testing ping...');

    await client.db("admin").command({ ping: 1 });
    console.log('MongoDB ping successful');

    db = client.db(DB_NAME);
    console.log(`Connected to MongoDB Atlas database: ${DB_NAME}`);
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas, using memory storage:', error.message);
    // Return a mock database object for development
    return createMockDatabase();
  }
}

function createMockDatabase(): Db {
  return {
    collection: (name: string) => ({
      countDocuments: () => Promise.resolve(memoryStorage[name]?.length || 0),
      find: () => ({
        sort: () => ({
          limit: () => ({
            toArray: () => Promise.resolve(memoryStorage[name] || [])
          })
        }),
        toArray: () => Promise.resolve(memoryStorage[name] || [])
      }),
      insertOne: (doc: any) => {
        if (!memoryStorage[name]) memoryStorage[name] = [];
        const docWithId = { ...doc, _id: Date.now().toString() };
        memoryStorage[name].push(docWithId);
        return Promise.resolve({ insertedId: docWithId._id });
      },
      updateOne: (filter: any, update: any) => {
        if (!memoryStorage[name]) memoryStorage[name] = [];
        const index = memoryStorage[name].findIndex(item => item._id === filter._id);
        if (index !== -1) {
          memoryStorage[name][index] = { ...memoryStorage[name][index], ...update.$set };
        }
        return Promise.resolve({ modifiedCount: index !== -1 ? 1 : 0 });
      },
      deleteOne: (filter: any) => {
        if (!memoryStorage[name]) memoryStorage[name] = [];
        const index = memoryStorage[name].findIndex(item => item._id === filter._id);
        if (index !== -1) {
          memoryStorage[name].splice(index, 1);
        }
        return Promise.resolve({ deletedCount: index !== -1 ? 1 : 0 });
      }
    })
  } as any;
}

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
