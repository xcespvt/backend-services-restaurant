"use strict";

import analyticsService from "../services/analyticsService.js";

const analyticsController = {
  getOrderAnalytics: async (req, res) => {
    try {
      const { branchId } = req.params;
      const { period } = req.query;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      const analytics = await analyticsService.getOrderAnalytics(branchId, period);
      
      return res.status(200).json({
        success: true,
        message: "Order analytics retrieved successfully",
        data: analytics
      });
    } catch (error) {
      console.error(error.message);
      
      return res.status(500).json({
        success: false,
        message: "Error retrieving order analytics",
        error: error.message
      });
    }
  },
  
  getCustomerAnalytics: async (req, res) => {
    try {
      const { branchId } = req.params;
      const { period } = req.query;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      const analytics = await analyticsService.getCustomerAnalytics(branchId, period);
      
      return res.status(200).json({
        success: true,
        message: "Customer analytics retrieved successfully",
        data: analytics
      });
    } catch (error) {
      console.error(error.message);
      
      return res.status(500).json({
        success: false,
        message: "Error retrieving customer analytics",
        error: error.message
      });
    }
  },
  
  getFeedbackAnalytics: async (req, res) => {
    try {
      const { branchId } = req.params;
      const { period } = req.query;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      const analytics = await analyticsService.getFeedbackAnalytics(branchId, period);
      
      return res.status(200).json({
        success: true,
        message: "Feedback analytics retrieved successfully",
        data: analytics
      });
    } catch (error) {
      console.error(error.message);
      
      return res.status(500).json({
        success: false,
        message: "Error retrieving feedback analytics",
        error: error.message
      });
    }
  }
};

export default analyticsController;