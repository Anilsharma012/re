import { RequestHandler } from "express";

export const healthCheck: RequestHandler = (req, res) => {
  try {
    console.log("🏥 Health check requested");

    res.json({
      status: "ok",
      message: "Server is running",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.version,
    });
  } catch (error) {
    console.error("❌ Health check error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error",
      error: error.message,
    });
  }
};
