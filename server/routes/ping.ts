import { RequestHandler } from "express";

export const simplePing: RequestHandler = (req, res) => {
  // Ultra-simple ping that doesn't require database or complex operations
  res.json({
    success: true,
    message: "Server is responding",
    timestamp: new Date().toISOString(),
    status: "healthy",
  });
};
