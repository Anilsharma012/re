import { RequestHandler } from "express";
import { sendEmail, testEmailConnection } from "../services/emailService";

export const handleTestEmail: RequestHandler = async (req, res) => {
  try {
    console.log("🧪 Testing Email System for Om Tour & Travels");

    // Test email connection
    const connectionTest = await testEmailConnection();

    if (!connectionTest) {
      throw new Error("Email connection test failed");
    }

    // Send test email
    const testEmailContent = `
Test Email from Om Tour & Travels Website

This is a test message to verify the email system is working correctly.

Configuration Details:
- From: manjeetsingh53000@gmail.com  
- SMTP: smtp.gmail.com:587
- Authentication: App Password
- Timestamp: ${new Date().toLocaleString()}

Test Data:
- Customer Name: Test Customer
- Mobile: +91 9876543210
- Pickup: Delhi
- Destination: Agra
- Vehicle: Innova
- Date: ${new Date().toLocaleDateString()}

This test confirms that:
✅ Contact forms will send to manjeetsingh53000@gmail.com
✅ Enquiry forms will send to manjeetsingh53000@gmail.com
✅ Welcome popup enquiries will send to manjeetsingh53000@gmail.com

Om Tour & Travels - Your Trusted Travel Partner
Phone: +91 9215615166, +91 9996415166
    `;

    const emailSent = await sendEmail({
      to: "manjeetsingh53000@gmail.com",
      subject: "🧪 Email Test - Om Tour & Travels System Working",
      text: testEmailContent,
    });

    if (emailSent) {
      res.json({
        success: true,
        message: "Test email sent successfully to manjeetsingh53000@gmail.com",
        timestamp: new Date().toISOString(),
        config: {
          email: "manjeetsingh53000@gmail.com",
          smtp: "smtp.gmail.com:587",
          auth: "App Password Authentication",
        },
      });
    } else {
      throw new Error("Failed to send test email");
    }
  } catch (error) {
    console.error("❌ Email test failed:", error);
    res.status(500).json({
      success: false,
      message: "Email test failed: " + (error as Error).message,
    });
  }
};
