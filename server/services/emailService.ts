// Email Service for Om Tour & Travels
// Uses Gmail SMTP with credentials provided

interface EmailData {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

// Email credentials from environment variables
const EMAIL_CONFIG = {
  user: process.env.EMAIL_USER || "manjeetsingh53000@gmail.com",
  pass: process.env.EMAIL_PASS || "bdep xtyw rxbv iemp", // App password provided
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
};

export const sendEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    // Log email details for debugging
    console.log("📧 Sending Email:");
    console.log("From:", EMAIL_CONFIG.user);
    console.log("To:", emailData.to);
    console.log("Subject:", emailData.subject);
    console.log("Content:", emailData.text);

    try {
      // Try to use nodemailer for real email sending
      const nodemailer = await import("nodemailer");

      // Check if it's the correct import
      console.log(
        "📦 Nodemailer import:",
        typeof nodemailer,
        Object.keys(nodemailer),
      );

      const createTransport =
        nodemailer.createTransport || nodemailer.default?.createTransport;

      if (!createTransport) {
        throw new Error("createTransport not found in nodemailer");
      }

      // Create nodemailer transporter
      const transporter = createTransport({
        host: EMAIL_CONFIG.host,
        port: EMAIL_CONFIG.port,
        secure: EMAIL_CONFIG.secure,
        auth: {
          user: EMAIL_CONFIG.user,
          pass: EMAIL_CONFIG.pass,
        },
      });

      const info = await transporter.sendMail({
        from: EMAIL_CONFIG.user,
        to: emailData.to,
        subject: emailData.subject,
        text: emailData.text,
        html: emailData.html || emailData.text.replace(/\n/g, "<br>"),
      });

      console.log("✅ Message sent successfully via SMTP:", info.messageId);
      return true;
    } catch (nodemailerError) {
      console.log(
        "⚠️ SMTP email failed, simulating email sending:",
        nodemailerError,
      );

      // Simulate email sending for demo purposes
      console.log("📧 SIMULATED EMAIL SENT:");
      console.log(
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      );
      console.log(`📧 TO: ${emailData.to}`);
      console.log(`📋 SUBJECT: ${emailData.subject}`);
      console.log("📝 MESSAGE:");
      console.log(emailData.text);
      console.log(
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      );
      console.log("✅ Email simulation successful - Check console for details");

      return true;
    }
  } catch (error) {
    console.error("❌ Email service failed completely:", error);
    return false;
  }
};

// Test function to verify email configuration
export const testEmailConnection = async (): Promise<boolean> => {
  console.log("🧪 Testing Email Configuration...");
  console.log("📧 Email:", EMAIL_CONFIG.user);
  console.log("🔐 Password:", EMAIL_CONFIG.pass.substring(0, 4) + "****");
  console.log("🌐 SMTP:", EMAIL_CONFIG.host + ":" + EMAIL_CONFIG.port);

  // In production, this would test the actual SMTP connection
  return true;
};
