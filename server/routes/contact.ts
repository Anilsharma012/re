import { RequestHandler } from "express";
import { ContactFormData, ContactResponse } from "@shared/api";
import { sendEmail } from "../services/emailService";
import { getDatabase } from "../services/database";

export const handleContact: RequestHandler = async (req, res) => {
  try {
    const formData: ContactFormData = req.body;

    // Validate required fields
    const requiredFields = ["name", "email", "phone", "message"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      const response: ContactResponse = {
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      };
      return res.status(400).json(response);
    }

    // Format the email content
    const emailContent = `
New Contact Form Message - Om Tour & Travels

Contact Details:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Subject: ${formData.subject || "General Inquiry"}

Message:
${formData.message}

---
This message was submitted through the Om Tour & Travels contact form.
Please respond to the customer at ${formData.email} or ${formData.phone}.
    `;

    // Save to MongoDB
    try {
      const db = await getDatabase();
      const contactWithTimestamp = {
        ...formData,
        createdAt: new Date(),
        status: 'new'
      };
      await db.collection('contacts').insertOne(contactWithTimestamp);
      console.log('✅ Contact message saved to database');
    } catch (dbError) {
      console.error('⚠️ Failed to save to database:', dbError);
      // Continue with email sending even if DB save fails
    }

    // Send email using email service
    console.log("📧 New Contact Form Submission:");

    const emailSent = await sendEmail({
      to: "manjeetsingh53000@gmail.com",
      subject: `New Contact: ${formData.subject || "General Inquiry"} - Om Tour & Travels`,
      text: emailContent,
      html: emailContent.replace(/\n/g, "<br>"),
    });

    if (!emailSent) {
      throw new Error("Failed to send email");
    }

    const response: ContactResponse = {
      success: true,
      message:
        "Thank you for your message! We will get back to you within 24 hours.",
    };

    res.json(response);
  } catch (error) {
    console.error("Error processing contact form:", error);

    const response: ContactResponse = {
      success: false,
      message:
        "Sorry, there was an error sending your message. Please try calling us directly.",
    };

    res.status(500).json(response);
  }
};
