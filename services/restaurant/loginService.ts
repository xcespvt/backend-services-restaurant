'use strict';

import Login from '../../models/restaurant/loginModel.ts';
import bcrypt from 'bcrypt';

const loginService = {
  createLogin: async (loginData: any) => {
    try {
      const { emailId, password, role, referenceId } = loginData;
      const passwordHash = await bcrypt.hash(password, 10);
      
      const login = new Login({
        emailId,
        passwordHash,
        role,
        referenceId
      });
      
      return await login.save();
    } catch (error: any) {
      console.error("Error creating login:", error.message);
      throw error;
    }
  },

  findByEmail: async (emailId: string) => {
    try {
      return await Login.findOne({ emailId });
    } catch (error: any) {
      console.error("Error finding login by email:", error.message);
      throw error;
    }
  },

  verifyPassword: async (password: string, passwordHash: string) => {
    try {
      return await bcrypt.compare(password, passwordHash);
    } catch (error: any) {
      console.error("Error verifying password:", error.message);
      throw error;
    }
  },

  updatePassword: async (emailId: string, newPassword: any) => {
    try {
      const passwordHash = await bcrypt.hash(newPassword, 10);
      return await Login.findOneAndUpdate(
        { emailId },
        { passwordHash },
        { new: true }
      );
    } catch (error: any) {
      console.error("Error updating password:", error.message);
      throw error;
    }
  }
};

export default loginService;

