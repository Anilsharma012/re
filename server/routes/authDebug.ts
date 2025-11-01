import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-here-change-in-production";

export const debugAuth: RequestHandler = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.json({
        success: false,
        message: "No token provided",
        debug: {
          hasAuthHeader: !!req.headers.authorization,
          authHeaderType: typeof req.headers.authorization,
        },
      });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return res.json({
        success: true,
        message: "Token is valid",
        debug: {
          tokenPresent: true,
          tokenValid: true,
          decoded: decoded,
          jwtSecret: JWT_SECRET.substring(0, 10) + "...",
        },
      });
    } catch (jwtError) {
      return res.json({
        success: false,
        message: "Token verification failed",
        debug: {
          tokenPresent: true,
          tokenValid: false,
          error: jwtError.message,
          jwtSecret: JWT_SECRET.substring(0, 10) + "...",
          tokenParts: token.split(".").length,
        },
      });
    }
  } catch (error) {
    console.error("Auth debug error:", error);
    return res.status(500).json({
      success: false,
      message: "Debug endpoint error",
      error: error.message,
    });
  }
};

export const generateFreshToken: RequestHandler = async (req, res) => {
  try {
    // Generate a fresh token with the correct secret
    const token = jwt.sign({ username: "Admin", role: "admin" }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      success: true,
      message: "Fresh token generated",
      token: token,
      expiresIn: "24h",
      instructions:
        "Copy this token and use it to replace your old token in localStorage",
    });
  } catch (error) {
    console.error("Token generation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate token",
      error: error.message,
    });
  }
};
