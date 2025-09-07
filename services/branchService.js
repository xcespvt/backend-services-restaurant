"use strict";

import Branch from "../models/branchModel.js";

const branchService = {
  getAllBranches: async (userId) => {
    try {
      const branches = await Branch.find({ userId }).lean();
      return branches;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  addBranch: async (userId, branchData) => {
    try {
      const branch = new Branch({
        userId,
        ...branchData
      });
      
      const savedBranch = await branch.save();
      return savedBranch;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  updateBranch: async (userId, branchId, branchData) => {
    try {
      const branch = await Branch.findOneAndUpdate(
        { branchId, userId },
        branchData,
        { new: true }
      ).lean();
      
      if (!branch) {
        throw new Error("Branch not found");
      }
      
      return branch;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  deleteBranch: async (userId, branchId) => {
    try {
      const result = await Branch.findOneAndDelete({ branchId, userId });
      
      if (!result) {
        throw new Error("Branch not found");
      }
      
      return true;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  toggleBranchOnlineStatus: async (userId, branchId) => {
    try {
      const branch = await Branch.findOne({ branchId, userId });
      
      if (!branch) {
        throw new Error("Branch not found");
      }
      
      branch.isOnline = !branch.isOnline;
      await branch.save();
      
      return {
        id: branch.branchId,
        isOnline: branch.isOnline
      };
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
};

export default branchService;