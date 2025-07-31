import { MongoClient, Db } from 'mongodb';

export async function connectDirectToAtlas(): Promise<Db> {
  console.log('🚀 DIRECT MongoDB Atlas Connection Starting...');
  
  // Try the exact connection string from your message
  const connectionStrings = [
    'mongodb+srv://Tour:Anilsharma123@cluster0.mfp2blo.mongodb.net/tours?retryWrites=true&w=majority&ssl=false',
    'mongodb+srv://Tour:Anilsharma123@cluster0.mfp2blo.mongodb.net/tours?ssl=false&authSource=admin',
    'mongodb+srv://Tour:Anilsharma123@cluster0.mfp2blo.mongodb.net/tours',
    'mongodb+srv://Tour:Anilsharma123@cluster0.mfp2blo.mongodb.net/?retryWrites=true&w=majority&authSource=admin'
  ];

  for (let i = 0; i < connectionStrings.length; i++) {
    const uri = connectionStrings[i];
    console.log(`🔄 Trying connection method ${i + 1}: ${uri.replace('Anilsharma123', '****')}`);
    
    try {
      const client = new MongoClient(uri, {
        connectTimeoutMS: 60000,
        serverSelectionTimeoutMS: 60000,
        socketTimeoutMS: 60000,
        maxIdleTimeMS: 60000,
        bufferMaxEntries: 0,
        useNewUrlParser: true,
        useUnifiedTopology: true
      } as any);

      console.log('⏳ Connecting...');
      await client.connect();
      
      console.log('🏓 Testing ping...');
      const db = client.db('tours');
      await db.admin().ping();
      
      console.log('✅ SUCCESS! Connected to MongoDB Atlas!');
      return db;
      
    } catch (error) {
      console.log(`❌ Method ${i + 1} failed:`, error.message);
      if (i === connectionStrings.length - 1) {
        throw new Error(`All connection methods failed. Last error: ${error.message}`);
      }
    }
  }
  
  throw new Error('Could not connect to MongoDB Atlas');
}

export async function testAndInsertVehicle(): Promise<any> {
  try {
    console.log('🚗 Testing vehicle insertion to MongoDB Atlas...');
    
    const db = await connectDirectToAtlas();
    
    // Clear any existing test vehicles
    await db.collection('vehicles').deleteMany({ name: { $regex: /^Direct Test/ } });
    console.log('🧹 Cleared existing test vehicles');
    
    // Insert a test vehicle
    const testVehicle = {
      name: `Direct Test Vehicle ${new Date().toLocaleTimeString()}`,
      type: "Sedan",
      capacity: 4,
      price: 2500,
      features: ["AC", "GPS", "Direct Connection Test"],
      description: "Test vehicle added directly to MongoDB Atlas",
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    console.log('➕ Inserting test vehicle...');
    const insertResult = await db.collection('vehicles').insertOne(testVehicle);
    console.log('✅ Vehicle inserted with ID:', insertResult.insertedId);
    
    // Verify insertion
    const verifyVehicle = await db.collection('vehicles').findOne({ _id: insertResult.insertedId });
    console.log('🔍 Verification successful:', !!verifyVehicle);
    
    // Get total count
    const totalVehicles = await db.collection('vehicles').countDocuments();
    console.log('📊 Total vehicles in MongoDB Atlas:', totalVehicles);
    
    // Get all vehicles
    const allVehicles = await db.collection('vehicles').find({}).toArray();
    
    return {
      success: true,
      message: 'Vehicle successfully added to MongoDB Atlas!',
      insertedId: insertResult.insertedId.toString(),
      totalVehicles: totalVehicles,
      allVehicles: allVehicles.map(v => ({
        id: v._id.toString(),
        name: v.name,
        type: v.type,
        price: v.price,
        createdAt: v.createdAt
      }))
    };
    
  } catch (error) {
    console.error('❌ Direct vehicle test failed:', error.message);
    throw error;
  }
}
