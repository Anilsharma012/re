import { RequestHandler } from "express";
import { getDatabase } from "../services/database";

export interface Vehicle {
  _id?: string;
  name: string;
  type: string;
  capacity: number;
  price: number;
  features: string[];
  image?: string;
  description?: string;
  available: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VehicleResponse {
  success: boolean;
  message: string;
  vehicle?: Vehicle;
  vehicles?: Vehicle[];
}

// Get all vehicles
export const getAllVehicles: RequestHandler = async (req, res) => {
  try {
    console.log('🚗 Fetching all vehicles...');
    const db = await getDatabase();

    const vehicles = await db.collection('vehicles').find({}).toArray();
    console.log(`📊 Retrieved ${vehicles.length} vehicles from database`);

    // Log the first few vehicle names for debugging
    if (vehicles.length > 0) {
      console.log('🚗 Sample vehicles:', vehicles.slice(0, 3).map(v => v.name));
    } else {
      console.log('⚠️ No vehicles found in database');
    }

    const response: VehicleResponse = {
      success: true,
      message: `Retrieved ${vehicles.length} vehicles from MongoDB Atlas`,
      vehicles: vehicles as Vehicle[]
    };

    res.json(response);
  } catch (error) {
    console.error('❌ Error fetching vehicles:', error.message);
    console.error('❌ Full error:', error);

    // Return a proper error response instead of 500
    res.json({
      success: false,
      message: `Database error: ${error.message}`,
      vehicles: []
    });
  }
};

// Get single vehicle
export const getVehicle: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getDatabase();
    const vehicle = await db.collection('vehicles').findOne({ _id: id });
    
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }
    
    const response: VehicleResponse = {
      success: true,
      message: 'Vehicle retrieved successfully',
      vehicle: vehicle as Vehicle
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch vehicle'
    });
  }
};

// Create new vehicle
export const createVehicle: RequestHandler = async (req, res) => {
  try {
    console.log('🚗 Creating new vehicle...');
    console.log('📝 Vehicle data received:', req.body);

    const vehicleData: Omit<Vehicle, '_id' | 'createdAt' | 'updatedAt'> = req.body;

    // Validate required fields
    const requiredFields = ['name', 'type', 'capacity', 'price'];
    const missingFields = requiredFields.filter(field => !vehicleData[field as keyof typeof vehicleData]);

    if (missingFields.length > 0) {
      console.log('❌ Missing fields:', missingFields);
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    console.log('💾 Getting database connection...');
    const db = await getDatabase();

    const vehicle = {
      ...vehicleData,
      available: vehicleData.available ?? true,
      features: vehicleData.features || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    console.log('🔄 Inserting vehicle into MongoDB Atlas...');
    const result = await db.collection('vehicles').insertOne(vehicle);
    console.log('✅ Vehicle inserted with ID:', result.insertedId);

    // Verify the vehicle was actually inserted
    const insertedVehicle = await db.collection('vehicles').findOne({ _id: result.insertedId });
    console.log('🔍 Verification - Vehicle found in DB:', !!insertedVehicle);

    const response: VehicleResponse = {
      success: true,
      message: 'Vehicle created successfully and saved to MongoDB Atlas',
      vehicle: { ...vehicle, _id: result.insertedId.toString() }
    };

    console.log('🎉 Vehicle creation completed successfully!');
    res.status(201).json(response);
  } catch (error) {
    console.error('❌ Error creating vehicle:', error.message);
    console.error('❌ Full error:', error);
    res.status(500).json({
      success: false,
      message: `Failed to create vehicle: ${error.message}`
    });
  }
};

// Update vehicle
export const updateVehicle: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const db = await getDatabase();
    const updateDoc = {
      ...updateData,
      updatedAt: new Date()
    };
    
    const result = await db.collection('vehicles').updateOne(
      { _id: id },
      { $set: updateDoc }
    );
    
    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found or no changes made'
      });
    }
    
    const response: VehicleResponse = {
      success: true,
      message: 'Vehicle updated successfully'
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update vehicle'
    });
  }
};

// Delete vehicle
export const deleteVehicle: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getDatabase();
    
    const result = await db.collection('vehicles').deleteOne({ _id: id });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }
    
    const response: VehicleResponse = {
      success: true,
      message: 'Vehicle deleted successfully'
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete vehicle'
    });
  }
};
