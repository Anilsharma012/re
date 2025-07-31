import { RequestHandler } from "express";
import { getDatabase } from "../services/database";

export interface ImageUploadResponse {
  success: boolean;
  message: string;
  imageUrl?: string;
}

// Simple image upload handler that converts base64 to a URL
export const uploadVehicleImage: RequestHandler = async (req, res) => {
  try {
    const { imageData, fileName } = req.body;
    
    if (!imageData) {
      return res.status(400).json({
        success: false,
        message: 'No image data provided'
      });
    }

    // For now, we'll return the base64 data URL for immediate use
    // In production, you'd upload to cloud storage like AWS S3, Cloudinary, etc.
    const imageUrl = imageData.startsWith('data:') ? imageData : `data:image/jpeg;base64,${imageData}`;
    
    const response: ImageUploadResponse = {
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: imageUrl
    };

    res.json(response);
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload image'
    });
  }
};

// Get all uploaded images
export const getUploadedImages: RequestHandler = async (req, res) => {
  try {
    const db = await getDatabase();
    const vehicles = await db.collection('vehicles').find({}).toArray();
    
    const images = vehicles
      .filter(vehicle => vehicle.image)
      .map(vehicle => ({
        id: vehicle._id,
        url: vehicle.image,
        name: vehicle.name
      }));

    res.json({
      success: true,
      images: images
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch images'
    });
  }
};
