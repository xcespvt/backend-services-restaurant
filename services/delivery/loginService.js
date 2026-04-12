'use strict';

import Login from '../../models/restaurant/loginModel.js';
import bcrypt from 'bcrypt';

const loginService = {
  createLogin: async (loginData) => {
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
    } catch (error) {
      console.error("Error creating delivery login:", error.message);
      throw error;
    }
  },

  findByEmail: async (emailId) => {
    try {
      return await Login.findOne({ emailId });
    } catch (error) {
      console.error("Error finding delivery login by email:", error.message);
      throw error;
    }
  },

  verifyPassword: async (password, passwordHash) => {
    try {
      return await bcrypt.compare(password, passwordHash);
    } catch (error) {
      console.error("Error verifying delivery password:", error.message);
      throw error;
    }
  },

  updatePassword: async (emailId, newPassword) => {
    try {
      const passwordHash = await bcrypt.hash(newPassword, 10);
      return await Login.findOneAndUpdate(
        { emailId },
        { passwordHash },
        { new: true }
      );
    } catch (error) {
      console.error("Error updating delivery password:", error.message);
      throw error;
    }
  }
};

export default loginService;
