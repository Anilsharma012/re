import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleEnquiry } from "./routes/enquiry";
import { handleContact } from "./routes/contact";
import { handleTestEmail } from "./routes/testEmail";
import { adminLogin, verifyAdmin, getAdminStats } from "./routes/admin";
import { getAllVehicles, getVehicle, createVehicle, updateVehicle, deleteVehicle } from "./routes/vehicles";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/enquiry", handleEnquiry);
  app.post("/api/contact", handleContact);
  app.get("/api/test-email", handleTestEmail);

  // Admin routes
  app.post("/api/admin/login", adminLogin);
  app.get("/api/admin/stats", verifyAdmin, getAdminStats);

  // Vehicle routes
  app.get("/api/vehicles", getAllVehicles);
  app.get("/api/vehicles/:id", getVehicle);
  app.post("/api/admin/vehicles", verifyAdmin, createVehicle);
  app.put("/api/admin/vehicles/:id", verifyAdmin, updateVehicle);
  app.delete("/api/admin/vehicles/:id", verifyAdmin, deleteVehicle);

  return app;
}
