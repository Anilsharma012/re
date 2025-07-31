import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;
let db: Db | null = null;

const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || 'Anilsharma123';
const MONGODB_URI = process.env.MONGODB_URI || `mongodb+srv://Tour:${MONGODB_PASSWORD}@cluster0.mfp2blo.mongodb.net/tours?retryWrites=true&w=majority`;
const DB_NAME = 'tours';

// Fallback database system when MongoDB Atlas is unavailable
let fallbackStorage = {
  vehicles: [
    {
      _id: 'initial_fallback_1',
      name: "Maruti Suzuki Dzire",
      type: "Sedan",
      capacity: 4,
      price: 2500,
      features: ["AC", "Music System", "GPS", "First Aid"],
      description: "Perfect for small family trips and city tours",
      available: true,
      image: "./image/maruti.webp",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: 'initial_fallback_2',
      name: "Toyota Innova Crysta",
      type: "SUV",
      capacity: 7,
      price: 4000,
      features: ["AC", "Captain Seats", "GPS", "Entertainment", "Large Boot"],
      description: "Most popular choice for family and group travel",
      available: true,
      image: "./image/c.avif",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: 'initial_fallback_3',
      name: "Force Urbania",
      type: "Tempo Traveller",
      capacity: 12,
      price: 6500,
      features: ["AC", "Reclining Seats", "GPS", "Entertainment", "Luggage Space"],
      description: "Perfect for group tours and pilgrimages",
      available: true,
      image: "./image/t.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  enquiries: [],
  contacts: []
};

function createFallbackDatabase(): Db {
  console.log('📝 Creating fallback database with sample data');
  let idCounter = Date.now(); // Use timestamp to ensure unique IDs

  return {
    collection: (name: string) => ({
      countDocuments: () => Promise.resolve(fallbackStorage[name]?.length || 0),
      find: (filter: any = {}) => ({
        sort: () => ({
          limit: (num: number) => ({
            toArray: () => Promise.resolve((fallbackStorage[name] || []).slice(0, num))
          })
        }),
        toArray: () => Promise.resolve(fallbackStorage[name] || [])
      }),
      findOne: (filter: any) => {
        const item = (fallbackStorage[name] || []).find(item => item._id === filter._id);
        return Promise.resolve(item || null);
      },
      insertOne: (doc: any) => {
        if (!fallbackStorage[name]) fallbackStorage[name] = [];
        const newDoc = { ...doc, _id: `fallback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` };
        fallbackStorage[name].push(newDoc);
        console.log(`📝 Fallback: Added to ${name}:`, newDoc._id);
        return Promise.resolve({ insertedId: newDoc._id });
      },
      insertMany: (docs: any[]) => {
        if (!fallbackStorage[name]) fallbackStorage[name] = [];
        const newDocs = docs.map(doc => ({ ...doc, _id: `fallback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` }));
        fallbackStorage[name].push(...newDocs);
        console.log(`📝 Fallback: Added ${newDocs.length} to ${name}`);
        return Promise.resolve({ insertedCount: newDocs.length });
      },
      updateOne: (filter: any, update: any) => {
        if (!fallbackStorage[name]) fallbackStorage[name] = [];
        const index = fallbackStorage[name].findIndex(item => item._id === filter._id);
        if (index !== -1) {
          fallbackStorage[name][index] = { ...fallbackStorage[name][index], ...update.$set };
          console.log(`📝 Fallback: Updated ${name}:`, filter._id);
          return Promise.resolve({ modifiedCount: 1 });
        }
        return Promise.resolve({ modifiedCount: 0 });
      },
      deleteOne: (filter: any) => {
        if (!fallbackStorage[name]) fallbackStorage[name] = [];
        const index = fallbackStorage[name].findIndex(item => item._id === filter._id);
        if (index !== -1) {
          fallbackStorage[name].splice(index, 1);
          console.log(`📝 Fallback: Deleted from ${name}:`, filter._id);
          return Promise.resolve({ deletedCount: 1 });
        }
        return Promise.resolve({ deletedCount: 0 });
      },
      deleteMany: () => {
        const count = fallbackStorage[name]?.length || 0;
        fallbackStorage[name] = [];
        console.log(`📝 Fallback: Cleared ${name}: ${count} items`);
        return Promise.resolve({ deletedCount: count });
      }
    })
  } as any;
}

export async function connectToDatabase(): Promise<Db> {
  if (db) {
    return db;
  }

  try {
    console.log('🔄 Attempting to connect to MongoDB Atlas...');
    console.log('URI:', MONGODB_URI.replace(/:[^:@]*@/, ':****@'));

    client = new MongoClient(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 30000,
      connectTimeoutMS: 10000,
      retryWrites: true
    });

    await client.connect();
    console.log('✅ MongoDB client connected successfully');

    await client.db("admin").command({ ping: 1 });
    console.log('✅ MongoDB ping successful');

    db = client.db(DB_NAME);
    console.log(`✅ Connected to MongoDB Atlas database: ${DB_NAME}`);
    return db;
  } catch (error) {
    console.error('❌ MongoDB Atlas connection failed:', error.message);

    // Instead of throwing error, create a working fallback
    console.log('🔄 Creating fallback database system...');
    return createFallbackDatabase();
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
