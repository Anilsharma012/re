import { RequestHandler } from "express";
import { testAndInsertVehicle } from "../services/directAtlas";

export const directAtlasTest: RequestHandler = async (req, res) => {
  try {
    console.log('🔥🔥🔥 DIRECT ATLAS TEST STARTING 🔥🔥🔥');
    
    const result = await testAndInsertVehicle();
    
    console.log('🎉 Direct Atlas test completed successfully!');
    res.json(result);
    
  } catch (error) {
    console.error('❌ Direct Atlas test failed:', error.message);
    
    res.status(500).json({
      success: false,
      message: 'Direct Atlas test failed',
      error: error.message,
      details: error.stack
    });
  }
};
