"use strict";

import Otp from "../../models/restaurant/otpModel.ts";
import loginService from "../../services/delivery/loginService.ts";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import { sendOtpEmail } from "../../services/delivery/emailService.ts"; // Optional: need to create this later

dotenv.config();

const authController = {
  // ✅ Request OTP
  requestOtp: async (request: any, reply: any) => {
    try {
      const { email } = request.body;
      if (!email)
        return reply.code(400).send({ success: false, message: "Email is required" });

      const login = await loginService.findByEmail(email);
      if (!login) {
        return reply.code(400).send({
          success: false,
          message: "Delivery partner email is not registered",
        });
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await Otp.deleteMany({ email });

      // For now just create record, email service can be added later
      await Otp.create({ email, otp });
      

      return reply.code(200).send({
        success: true,
        message: "OTP generated successfully (check server logs for now)",
      });
    } catch (error: any) {
      console.error("Error generating delivery OTP:", error.message);
      return reply.code(500).send({ success: false, message: "Internal Server Error", error: error.message });
    }
  },

  verifyOtp: async (request: any, reply: any) => {
    try {
      const { email, otp, password } = request.body;

      if (password) {
        const login = await loginService.findByEmail(email);
        if (!login) {
          return reply.code(400).send({
            success: false,
            message: "Invalid email or password",
          });
        }

        const isMatch = await loginService.verifyPassword(password, login.passwordHash);
        if (!isMatch) {
          return reply.code(400).send({
            success: false,
            message: "Invalid email or password",
          });
        }

        // Generate JWT token with role and referenceId
        const token = jwt.sign(
          { 
            email, 
            role: login.role, 
            referenceId: login.referenceId 
          }, 
          (process.env.JWT_SECRET as string), 
          { expiresIn: "365d" }
        );

        // Set JWT as HTTP-only cookie
        reply.setCookie("token", token, {
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 365 * 24 * 60 * 60,
        });

        return reply.code(200).send({
          success: true,
          message: "Logged in successfully",
          user: {
            email: login.emailId,
            role: login.role
          }
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
      const login = await loginService.findByEmail(email);
      const token = jwt.sign(
        { 
          email, 
          role: login ? login.role : 'DELIVERY_PARTNER', 
          referenceId: login ? login.referenceId : null 
        }, 
        (process.env.JWT_SECRET as string), 
        { expiresIn: "365d" }
      );

      // 🍪 Set JWT as HTTP-only cookie
      reply.setCookie("token", token, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 365 * 24 * 60 * 60,
      });

      return reply.code(200).send({
        success: true,
        message: "OTP verified successfully",
      });
    } catch (error: any) {
      console.error("Error verifying delivery OTP:", error.message);
      return reply.code(500).send({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  logout: async (request: any, reply: any) => {
    try {
      reply.clearCookie("token", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      return reply.code(200).send({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error: any) {
      console.error("Error logging out delivery partner:", error.message);
      return reply.code(500).send({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};

export default authController;

