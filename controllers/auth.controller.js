"use strict";

import authService from "../services/authService.js";

const authController = {
  registerUser: async (req, res) => {
    try {
      const userData = req.body;
      
      // Validate required fields
      if (!userData.name || !userData.email || !userData.phone || !userData.password) {
        return res.status(400).json({ 
          success: false, 
          message: "Missing required fields" 
        });
      }
      
      const result = await authService.registerUser(userData);
      
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          userId: result.userId,
          token: result.token,
          name: result.name,
          email: result.email,
          phone: result.phone,
          whatsapp: result.whatsapp,
          subscriptionPlan: result.subscriptionPlan
        }
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message.includes("duplicate")) {
        return res.status(409).json({
          success: false,
          message: "User already exists with this email or phone"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error registering user",
        error: error.message
      });
    }
  },
  
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({ 
          success: false, 
          message: "Email and password are required" 
        });
      }
      
      const result = await authService.loginUser(email, password);
      
      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          userId: result.userId,
          token: result.token,
          name: result.name,
          email: result.email,
          phone: result.phone,
          whatsapp: result.whatsapp,
          subscriptionPlan: result.subscriptionPlan
        }
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Invalid credentials") {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error logging in",
        error: error.message
      });
    }
  },
  
  loginEmployee: async (req, res) => {
    try {
      const { employeeId, password, branchId } = req.body;
      
      // Validate required fields
      if (!employeeId || !password || !branchId) {
        return res.status(400).json({ 
          success: false, 
          message: "Employee ID, password, and branch ID are required" 
        });
      }
      
      const result = await authService.loginEmployee(employeeId, password, branchId);
      
      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          employeeId: result.employeeId,
          token: result.token,
          name: result.name,
          role: result.role,
          branchId: result.branchId,
          branchName: result.branchName
        }
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Invalid credentials") {
        return res.status(401).json({
          success: false,
          message: "Invalid employee ID or password"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error logging in",
        error: error.message
      });
    }
  }
};

export default authController;