import { RequestHandler } from "express";
import { getDatabase } from "../services/database";

export const testAllAPIs: RequestHandler = async (req, res) => {
  const results = {
    timestamp: new Date().toISOString(),
    tests: {}
  };

  try {
    console.log('🧪 Running API tests...');

    // Test 1: Database connection
    try {
      const db = await getDatabase();
      const vehiclesCount = await db.collection('vehicles').countDocuments();
      results.tests['database'] = {
        status: 'success',
        message: `Connected successfully, ${vehiclesCount} vehicles found`,
        data: { vehiclesCount }
      };
    } catch (error) {
      results.tests['database'] = {
        status: 'error',
        message: error.message
      };
    }

    // Test 2: Vehicles API
    try {
      const db = await getDatabase();
      const vehicles = await db.collection('vehicles').find({}).limit(2).toArray();
      results.tests['vehicles_api'] = {
        status: 'success',
        message: `Retrieved ${vehicles.length} vehicles`,
        data: vehicles.map(v => ({ id: v._id, name: v.name, type: v.type }))
      };
    } catch (error) {
      results.tests['vehicles_api'] = {
        status: 'error',
        message: error.message
      };
    }

    // Test 3: Collections
    try {
      const db = await getDatabase();
      const enquiriesCount = await db.collection('enquiries').countDocuments();
      const contactsCount = await db.collection('contacts').countDocuments();
      results.tests['collections'] = {
        status: 'success',
        message: 'All collections accessible',
        data: { enquiriesCount, contactsCount }
      };
    } catch (error) {
      results.tests['collections'] = {
        status: 'error',
        message: error.message
      };
    }

    console.log('✅ API tests completed');
    res.json({
      success: true,
      message: 'API tests completed',
      results
    });

  } catch (error) {
    console.error('❌ API test error:', error);
    res.status(500).json({
      success: false,
      message: 'API test failed',
      error: error.message
    });
  }
};
