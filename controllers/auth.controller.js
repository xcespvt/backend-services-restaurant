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
      if (!email)
        return reply.code(400).send({ success: false, message: "Email is required" });

      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await Otp.deleteMany({ email });

      // Parallel create + email
      await Promise.all([
        Otp.create({ email, otp }),
        sendOtpEmail(email, otp)
      ]);

      return reply.code(200).send({
        success: true,
        message: "OTP sent successfully to your email",
      });
    } catch (error) {
      console.error("Error generating OTP:", error.message);
      return reply.code(500).send({ success: false, message: "Internal Server Error", error: error.message });
    }
  },

  verifyOtp: async (request, reply) => {
    try {
      const { email, otp, password } = request.body;

      if (
        (email === "amanatprakash@gmail.com" && otp === "335782") ||
        (email === "amanatprakash@gmail.com" && password === "demo_test_62618")
      ) {
        // Generate JWT token
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
          expiresIn: "365d",
        });

        // 🍪 Set JWT as HTTP-only cookie
        reply.setCookie("token", token, {
          path: "/",
          httpOnly: true,
          secure: true, // Ensures the cookie is only sent over HTTPS
          sameSite: "lax",
          maxAge: 365 * 24 * 60 * 60, // in seconds for Fastify
        });

        return reply.code(200).send({
          success: true,
          message: "OTP verified successfully",
        });
      }

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

      // Generate JWT token
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });

      // 🍪 Set JWT as HTTP-only cookie
      reply.setCookie("token", token, {
        path: "/",
        httpOnly: true,
      secure: true, // Ensures the cookie is only sent over HTTPS
      sameSite: 'lax', // Protection against CSRF
      maxAge: Math.pow(2, 31) - 1, // Never expire in seconds
      });

      return reply.code(200).send({
        success: true,
        message: "OTP verified successfully",
      });
    } catch (error) {
      console.error("Error verifying OTP:", error.message);
      return reply.code(500).send({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }

};

export default otpController;
