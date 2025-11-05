"use strict";

import Otp from "../models/otpModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendOtpEmail } from "../services/emailService.js";

dotenv.config();

const otpController = {
  // ✅ Step 1: Request OTP
  requestOtp: async (request, reply) => {
    try {
      const { email } = request.body;

      if (!email) {
        return reply.code(400).send({
          success: false,
          message: "Email is required",
        });
      }

      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Delete old OTP entries for same email
      await Otp.deleteMany({ email });

      // Save new OTP
      await Otp.create({ email, otp });

      // Send OTP via email
      await sendOtpEmail(email, otp);

      return reply.code(200).send({
        success: true,
        message: "OTP sent successfully to your email",
      });
    } catch (error) {
      console.error("Error generating OTP:", error.message);
      return reply.code(500).send({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  // ✅ Step 2: Verify OTP and issue JWT
  verifyOtp: async (request, reply) => {
    try {
      const { email, otp } = request.body;

      if (!email || !otp) {
        return reply.code(400).send({
          success: false,
          message: "Email and OTP are required",
        });
      }

      const record = await Otp.findOne({ email, otp });

      if (!record) {
        return reply.code(400).send({
          success: false,
          message: "Invalid or expired OTP",
        });
      }

      // Delete OTP after successful verification
      await Otp.deleteMany({ email });

      // Generate JWT token (optionally add { expiresIn: "1h" })
      const token = jwt.sign({ email }, process.env.JWT_SECRET);

      return reply.code(200).send({
        success: true,
        message: "OTP verified successfully",
        token,
      });
    } catch (error) {
      console.error("Error verifying OTP:", error.message);
      return reply.code(500).send({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};

export default otpController;
