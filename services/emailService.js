import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_USER,
    pass: process.env.ZOHO_PASS,
  },
});

export async function sendOtpEmail(to, otp) {
  const mailOptions = {
    from: `"Crevings Legal" <${process.env.ZOHO_USER}>`,
    to,
    subject: "Your OTP for Crevings Login",
    html: `
      <div style="font-family:Arial,sans-serif;padding:10px;">
        <h2>🔐 OTP Verification</h2>
        <p>Your one-time password (OTP) is:</p>
        <h3 style="color:#2563eb;">${otp}</h3>
        <p>This OTP will expire in 5 minutes.</p>
        <br/>
        <p>Best,<br/>Team Crevings</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
