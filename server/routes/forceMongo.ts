import { RequestHandler } from "express";
import { forceMongoDBTest } from "../services/alternativeDB";

export const forceMongoTest: RequestHandler = async (req, res) => {
  try {
    console.log("🔥🔥🔥 FORCE MONGODB TEST INITIATED 🔥🔥🔥");

    const result = await forceMongoDBTest();

    console.log("🎉 Force MongoDB test completed successfully!");
    res.json(result);
  } catch (error) {
    console.error("❌ Force MongoDB test failed:", error.message);
    console.error("❌ Error stack:", error.stack);

    res.status(500).json({
      success: false,
      message: "Force MongoDB test failed",
      error: error.message,
      errorStack: error.stack,
    });
  }
};
