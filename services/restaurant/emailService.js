import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create transporter once (reuse connection for better speed)
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_USER,
    pass: process.env.ZOHO_PASS,
  },
});

/**
 * Fire-and-forget email sender — non-blocking
 * @param {string} to - recipient email
 * @param {string} otp - one-time password
 */
export function sendOtpEmail(to, otp) {
  // Build email body once
  const mailOptions = {
    from: `"Crevings Legal" <${process.env.ZOHO_USER}>`,
    to,
    subject: "Your OTP for Crevings Login",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Crevings OTP Email</title>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; background:#fff; margin:0; padding:0; }
          .otp-box { background: hsl(145, 63%, 90%); color:hsl(142, 66%, 40%); padding:1rem 1.5rem; border-radius:8px;
                     display:inline-block; letter-spacing:0.5rem; font-size:2rem; font-weight:bold;
                     border:1px solid hsl(142, 66%, 40%); font-family:'Space Grotesk', sans-serif; }
        </style>
      </head>
      <body>
        <center>
          <h2 style="color:hsl(142,66%,40%); font-family:'Space Grotesk',sans-serif;">
            Your Verification Code
          </h2>
          <p style="font-size:1rem;">Hi there, use the OTP below to securely log in:</p>
          <div style="margin:2rem 0;">
            <div class="otp-box">${otp}</div>
          </div>
          <p style="font-size:0.9rem; color:#555;">This OTP is valid for 10 minutes. Do not share it.</p>
          <p style="font-size:0.8rem; color:hsl(142,66%,40%);">© 2025 Crevings Markeplace Private Limited. All Rights Reserved.</p>
        </center>
      </body>
      </html>
    `,
  };

  // ✅ Fire and forget — don’t await, run asynchronously in background
  setImmediate(async () => {
    try {
      await transporter.sendMail(mailOptions);
     
    } catch (err) {

    }
  });
}

export default sendOtpEmail;