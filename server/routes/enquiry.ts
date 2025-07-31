import { RequestHandler } from "express";
import { EnquiryFormData, EnquiryResponse } from "@shared/api";
import { sendEmail } from "../services/emailService";
import { getDatabase } from "../services/database";

export const handleEnquiry: RequestHandler = async (req, res) => {
  try {
    // Ensure we have a valid request body
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid request body",
      });
    }

    const formData: EnquiryFormData = req.body;

    console.log("📝 Enquiry request received:", {
      headers: req.headers["content-type"],
      bodyKeys: Object.keys(req.body),
      formData: formData,
    });

    // Validate required fields
    const requiredFields = [
      "name",
      "mobile",
      "pickupLocation",
      "destination",
      "travelDate",
      "passengers",
      "vehicleType",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      const response: EnquiryResponse = {
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      };
      return res.status(400).json(response);
    }

    // Format the email content
    const emailContent = `
New Travel Enquiry - Om Tour & Travels

Customer Details:
- Name: ${formData.name}
- Mobile: ${formData.mobile}
- Email: ${formData.email || "Not provided"}

Travel Details:
- Pickup Location: ${formData.pickupLocation}
- Destination: ${formData.destination}
- Travel Date: ${formData.travelDate}
- Number of Passengers: ${formData.passengers}
- Vehicle Type: ${formData.vehicleType}

Additional Message:
${formData.message || "No additional message"}

---
This enquiry was submitted through the Om Tour & Travels website.
Please contact the customer at ${formData.mobile} to provide a quote.
    `;

    // In a real application, you would send this email using a service like:
    // - Nodemailer with SMTP
    // - SendGrid
    // - Amazon SES
    // - etc.

    // Save to MongoDB
    try {
      const db = await getDatabase();
      const enquiryWithTimestamp = {
        ...formData,
        createdAt: new Date(),
        status: "new",
      };
      await db.collection("enquiries").insertOne(enquiryWithTimestamp);
      console.log("✅ Enquiry saved to database");
    } catch (dbError) {
      console.error("⚠️ Failed to save to database:", dbError);
      // Continue with email sending even if DB save fails
    }

    // Send email using email service
    console.log("📧 New Enquiry Received:");

    const emailSent = await sendEmail({
      to: "manjeetsingh53000@gmail.com",
      subject: "New Travel Enquiry - Om Tour & Travels",
      text: emailContent,
      html: emailContent.replace(/\n/g, "<br>"),
    });

    if (!emailSent) {
      throw new Error("Failed to send email");
    }

    const response: EnquiryResponse = {
      success: true,
      message:
        "Thank you! We have received your enquiry and will contact you shortly.",
    };

    res.json(response);
  } catch (error) {
    console.error("Error processing enquiry:", error);

    const response: EnquiryResponse = {
      success: false,
      message:
        "Sorry, there was an error processing your enquiry. Please try again or call us directly.",
    };

    res.status(500).json(response);
  }
};
