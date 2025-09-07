"use strict";

import branchService from "../services/branchService.js";

const branchController = {
  getAllBranches: async (req, res) => {
    try {
      const { userId } = req.query;
      
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID is required"
        });
      }
      
      const branches = await branchService.getAllBranches(userId);
      
      return res.status(200).json({
        success: true,
        message: "Branches retrieved successfully",
        data: branches
      });
    } catch (error) {
      console.error(error.message);
      
      return res.status(500).json({
        success: false,
        message: "Error retrieving branches",
        error: error.message
      });
    }
  },
  
  addBranch: async (req, res) => {
    try {
      const { userId } = req.query;
      const branchData = req.body;
      
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID is required"
        });
      }
      
      // Validate required fields
      if (!branchData.name || !branchData.address || !branchData.city || !branchData.pincode) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields"
        });
      }
      
      const branch = await branchService.addBranch(userId, branchData);
      
      return res.status(201).json({
        success: true,
        message: "Branch added successfully",
        data: branch
      });
    } catch (error) {
      console.error(error.message);
      
      return res.status(500).json({
        success: false,
        message: "Error adding branch",
        error: error.message
      });
    }
  },
  
  updateBranch: async (req, res) => {
    try {
      const { branchId } = req.params;
      const branchData = req.body;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      const branch = await branchService.updateBranch(branchId, branchData);
      
      return res.status(200).json({
        success: true,
        message: "Branch updated successfully",
        data: branch
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Branch not found") {
        return res.status(404).json({
          success: false,
          message: "Branch not found"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error updating branch",
        error: error.message
      });
    }
  },
  
  deleteBranch: async (req, res) => {
    try {
      const { branchId } = req.params;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      await branchService.deleteBranch(branchId);
      
      return res.status(200).json({
        success: true,
        message: "Branch deleted successfully"
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Branch not found") {
        return res.status(404).json({
          success: false,
          message: "Branch not found"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error deleting branch",
        error: error.message
      });
    }
  },
  
  toggleBranchOnlineStatus: async (req, res) => {
    try {
      const { branchId } = req.params;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      const result = await branchService.toggleBranchOnlineStatus(branchId);
      
      return res.status(200).json({
        success: true,
        message: `Branch is now ${result.isOnline ? 'online' : 'offline'}`,
        data: result
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Branch not found") {
        return res.status(404).json({
          success: false,
          message: "Branch not found"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error toggling branch online status",
        error: error.message
      });
    }
  }
};

export default branchController;