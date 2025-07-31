import { RequestHandler } from "express";

export const adminHealthCheck: RequestHandler = async (req, res) => {
  try {
    // Simple health check for admin endpoints
    res.json({
      success: true,
      message: "Admin API is healthy",
      timestamp: new Date(),
      endpoints: {
        login: "/api/admin/login",
        verifyToken: "/api/admin/verify-token",
        stats: "/api/admin/stats",
        vehicles: "/api/admin/vehicles",
      },
    });
  } catch (error) {
    console.error("❌ Admin health check failed:", error.message);
    res.status(500).json({
      success: false,
      message: "Admin API health check failed",
      error: error.message,
    });
  }
};
