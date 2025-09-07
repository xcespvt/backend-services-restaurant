"use strict";

import User from "../models/userModel.js";
import Employee from "../models/employeeModel.js";

const authService = {
  registerUser: async (userData) => {
    try {
      // In a real implementation, you would hash the password here
      const user = new User(userData);
      const savedUser = await user.save();
      
      // Return user data without sensitive information
      const result = {
        userId: savedUser.userId,
        // In a real implementation, you would generate a JWT token here
        token: "jwt-token"
      };
      
      return result;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  loginUser: async (email, password) => {
    try {
      // In a real implementation, you would verify the password here
      const user = await User.findOne({ email }).lean();
      
      if (!user) {
        throw new Error("Invalid credentials");
      }
      
      // Return user data without sensitive information
      const result = {
        userId: user.userId,
        // In a real implementation, you would generate a JWT token here
        token: "jwt-token",
        name: user.name,
        email: user.email,
        phone: user.phone,
        whatsapp: user.whatsapp,
        subscriptionPlan: user.subscriptionPlan
      };
      
      return result;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  loginEmployee: async (employeeId, password, branchId) => {
    try {
      // In a real implementation, you would verify the password here
      const employee = await Employee.findOne({ employeeId, branchId }).lean();
      
      if (!employee) {
        throw new Error("Invalid credentials");
      }
      
      // Return employee data without sensitive information
      const result = {
        employeeId: employee.employeeId,
        // In a real implementation, you would generate a JWT token here
        token: "jwt-token",
        name: employee.name,
        role: employee.role,
        branchId: employee.branchId
      };
      
      return result;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
};

export default authService;