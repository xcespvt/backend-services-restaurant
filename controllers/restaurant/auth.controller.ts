import { FastifyRequest, FastifyReply } from "fastify";
import Otp from "../../models/restaurant/otpModel.ts";
import loginService from "../../services/restaurant/loginService.ts";
import mainBranchModel from "../../models/restaurant/mainBranch.ts";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendOtpEmail } from "../../services/restaurant/emailService.ts";
import bcrypt from "bcrypt";

dotenv.config();

const otpController = {
  // ✅ Step 1: Request OTP
  requestOtp: async (request: FastifyRequest<{ Body: { email: string } }>, reply: FastifyReply) => {
    try {
      const { email } = request.body;
      if (!email)
        return reply.code(400).send({ success: false, message: "Email is required" });

      const login = await loginService.findByEmail(email);
      if (!login) {
        return reply.code(400).send({
          success: false,
          message: "Email is not registered",
        });
      }

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
    } catch (error: any) {
      console.error("Error generating OTP:", error.message);
      return reply.code(500).send({ success: false, message: "Internal Server Error", error: error.message });
    }
  },

  verifyOtp: async (request: FastifyRequest<{ Body: { email: string; otp: string; password?: string } }>, reply: FastifyReply) => {
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
          role: login ? login.role : 'USER', 
          referenceId: login ? login.referenceId : null 
        }, 
        (process.env.JWT_SECRET as string), 
        { expiresIn: "365d" }
      );

      // 🍪 Set JWT as HTTP-only cookie
      reply.setCookie("token", token, {
        path: "/",
        httpOnly: true,
        secure: true, // Always secure since backend is HTTPS
        sameSite: "none", // Changed to 'none' to allow cross-origin requests
        maxAge: 365 * 24 * 60 * 60, // in seconds for Fastify
      });

      return reply.code(200).send({
        success: true,
        message: "OTP verified successfully",
      });
    } catch (error: any) {
      console.error("Error verifying OTP:", error.message);
      return reply.code(500).send({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  verifyToken: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const token = request.cookies?.token;

      if (!token) {
        return reply.code(401).send({
          success: false,
          message: "Token is missing",
        });
      }

      const decoded = jwt.verify(token, (process.env.JWT_SECRET as string));
      return reply.code(200).send({
        success: true,
        message: "Token is valid",
        decoded,
      });
    } catch (error: any) {

      return reply.code(401).send({
        success: false,
        message: "Invalid token",
      });
    }
  },

  logout: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Clear the token cookie
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
      console.error("Error logging out:", error.message);
      return reply.code(500).send({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};

export default otpController;

