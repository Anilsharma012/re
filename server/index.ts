import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleEnquiry } from "./routes/enquiry";
import { handleContact } from "./routes/contact";
import { handleTestEmail } from "./routes/testEmail";
import {
  adminLogin,
  verifyAdmin,
  getAdminStats,
  getContacts,
  getEnquiries,
  updateContactStatus,
  updateEnquiryStatus,
  deleteContact,
  deleteEnquiry,
} from "./routes/admin";
import { seedTestData } from "./routes/testData";
import { seedVehicles } from "./routes/seedVehicles";
import { getStorageStatus, seedTestVehicles } from "./routes/debug";
import { quickTestVehicle, getAllVehiclesTest } from "./routes/quickTest";
import { testMongoConnection } from "./routes/mongoTest";
import { testDirectMongo } from "./routes/testDirectMongo";
import { testCompleteVehicleFlow } from "./routes/testVehicleFlow";
import { instantMongoTest } from "./routes/instantMongoTest";
import { forceMongoTest } from "./routes/forceMongo";
import { directAtlasTest } from "./routes/directAtlasTest";
import { verifyToken } from "./routes/tokenVerify";
import { adminHealthCheck } from "./routes/adminHealth";
import { simplePing } from "./routes/ping";
import { debugAuth, generateFreshToken } from "./routes/authDebug";
import { testAllAPIs } from "./routes/apiTest";
import { healthCheck } from "./routes/health";
import { uploadVehicleImage, getUploadedImages } from "./routes/upload";
import {
  getAllVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "./routes/vehicles";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Health check endpoint
  app.get("/api/health", healthCheck);

  // Example API routes
  app.get("/api/ping", simplePing);
  app.get("/api/simple-ping", simplePing);

  app.get("/api/demo", handleDemo);
  app.post("/api/enquiry", handleEnquiry);
  app.post("/api/contact", handleContact);
  app.get("/api/test-email", handleTestEmail);

  // Admin routes
  app.get("/api/admin/health", adminHealthCheck);
  app.post("/api/admin/login", adminLogin);
  app.get("/api/admin/verify-token", verifyToken);
  app.get("/api/admin/stats", verifyAdmin, getAdminStats);
  app.get("/api/admin/contacts", verifyAdmin, getContacts);
  app.get("/api/admin/enquiries", verifyAdmin, getEnquiries);
  app.put("/api/admin/contacts/:id/status", verifyAdmin, updateContactStatus);
  app.put("/api/admin/enquiries/:id/status", verifyAdmin, updateEnquiryStatus);
  app.delete("/api/admin/contacts/:id", verifyAdmin, deleteContact);
  app.delete("/api/admin/enquiries/:id", verifyAdmin, deleteEnquiry);

  // Vehicle routes
  app.get("/api/vehicles", getAllVehicles);
  app.get("/api/vehicles/:id", getVehicle);
  app.post("/api/admin/vehicles", verifyAdmin, createVehicle);
  app.put("/api/admin/vehicles/:id", verifyAdmin, updateVehicle);
  app.delete("/api/admin/vehicles/:id", verifyAdmin, deleteVehicle);

  // Image upload routes
  app.post("/api/admin/upload-image", verifyAdmin, uploadVehicleImage);
  app.get("/api/admin/images", verifyAdmin, getUploadedImages);

  // Debug endpoints
  app.get("/api/debug/storage", getStorageStatus);
  app.get("/api/debug/mongo-test", testMongoConnection);
  app.get("/api/debug/mongo-direct", testDirectMongo);
  app.get("/api/debug/mongo-instant", instantMongoTest);
  app.get("/api/debug/mongo-force", forceMongoTest);
  app.get("/api/debug/direct-atlas", directAtlasTest);
  app.post("/api/debug/test-vehicle-flow", testCompleteVehicleFlow);
  app.get("/api/debug/test-all", testAllAPIs);
  app.post("/api/debug/seed-test", seedTestVehicles);
  app.post("/api/debug/quick-test", quickTestVehicle);
  app.get("/api/debug/vehicles", getAllVehiclesTest);

  // Test data seeding (for demo purposes)
  app.post("/api/admin/seed-data", verifyAdmin, seedTestData);
  app.post("/api/admin/seed-vehicles", verifyAdmin, seedVehicles);

  return app;
}
