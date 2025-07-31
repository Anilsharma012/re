import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;
let db: Db | null = null;

const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || 'admin123';
const MONGODB_URI = process.env.MONGODB_URI || `mongodb+srv://Tour:${MONGODB_PASSWORD}@cluster0.mfp2blo.mongodb.net/?retryWrites=true&w=majority&ssl=true`;
const DB_NAME = 'tour_admin';

// In-memory storage as fallback with auto-incrementing IDs
let idCounter = 1;
const memoryStorage = {
  enquiries: [] as any[],
  contacts: [] as any[],
  vehicles: [] as any[]
};

// Initialize with some sample data if empty
const initializeSampleData = () => {
  if (memoryStorage.vehicles.length === 0) {
    memoryStorage.vehicles = [
      {
        _id: `mem_${idCounter++}`,
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
        _id: `mem_${idCounter++}`,
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
      }
    ];
  }
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
  console.log('Creating mock database with memory storage');
  initializeSampleData();

  return {
    collection: (name: string) => ({
      countDocuments: () => {
        const count = memoryStorage[name]?.length || 0;
        console.log(`Memory storage - ${name} count:`, count);
        return Promise.resolve(count);
      },
      find: (filter: any = {}) => ({
        sort: (sortOptions: any) => ({
          limit: (limitNum: number) => ({
            toArray: () => {
              const data = memoryStorage[name] || [];
              console.log(`Memory storage - ${name} find with limit ${limitNum}:`, data.length);
              return Promise.resolve(data.slice(0, limitNum));
            }
          })
        }),
        toArray: () => {
          const data = memoryStorage[name] || [];
          console.log(`Memory storage - ${name} find all:`, data.length);
          return Promise.resolve(data);
        }
      }),
      findOne: (filter: any) => {
        if (!memoryStorage[name]) memoryStorage[name] = [];
        const item = memoryStorage[name].find(item => item._id === filter._id);
        console.log(`Memory storage - ${name} findOne:`, item ? 'found' : 'not found');
        return Promise.resolve(item || null);
      },
      insertOne: (doc: any) => {
        if (!memoryStorage[name]) memoryStorage[name] = [];
        const docWithId = { ...doc, _id: `mem_${idCounter++}_${Date.now()}` };
        memoryStorage[name].push(docWithId);
        console.log(`Memory storage - ${name} insertOne:`, docWithId._id);
        return Promise.resolve({ insertedId: docWithId._id });
      },
      insertMany: (docs: any[]) => {
        if (!memoryStorage[name]) memoryStorage[name] = [];
        const docsWithIds = docs.map(doc => ({ ...doc, _id: `mem_${idCounter++}_${Date.now()}` }));
        memoryStorage[name].push(...docsWithIds);
        console.log(`Memory storage - ${name} insertMany:`, docsWithIds.length);
        return Promise.resolve({ insertedCount: docsWithIds.length });
      },
      updateOne: (filter: any, update: any) => {
        if (!memoryStorage[name]) memoryStorage[name] = [];
        const index = memoryStorage[name].findIndex(item => item._id === filter._id);
        if (index !== -1) {
          memoryStorage[name][index] = { ...memoryStorage[name][index], ...update.$set };
          console.log(`Memory storage - ${name} updateOne: updated`);
        } else {
          console.log(`Memory storage - ${name} updateOne: not found`);
        }
        return Promise.resolve({ modifiedCount: index !== -1 ? 1 : 0 });
      },
      deleteOne: (filter: any) => {
        if (!memoryStorage[name]) memoryStorage[name] = [];
        const index = memoryStorage[name].findIndex(item => item._id === filter._id);
        if (index !== -1) {
          memoryStorage[name].splice(index, 1);
          console.log(`Memory storage - ${name} deleteOne: deleted`);
        } else {
          console.log(`Memory storage - ${name} deleteOne: not found`);
        }
        return Promise.resolve({ deletedCount: index !== -1 ? 1 : 0 });
      },
      deleteMany: (filter: any = {}) => {
        if (!memoryStorage[name]) memoryStorage[name] = [];
        const originalLength = memoryStorage[name].length;
        memoryStorage[name] = [];
        console.log(`Memory storage - ${name} deleteMany: deleted ${originalLength}`);
        return Promise.resolve({ deletedCount: originalLength });
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
