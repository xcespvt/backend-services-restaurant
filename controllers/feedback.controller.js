"use strict";

import feedbackService from "../services/feedbackService.js";

const feedbackController = {
  getAllFeedback: async (req, res) => {
    try {
      const { branchId } = req.params;
      const { startDate, endDate } = req.query;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      const feedback = await feedbackService.getAllFeedback(branchId, startDate, endDate);
      
      return res.status(200).json({
        success: true,
        message: "Feedback retrieved successfully",
        data: feedback
      });
    } catch (error) {
      console.error(error.message);
      
      return res.status(500).json({
        success: false,
        message: "Error retrieving feedback",
        error: error.message
      });
    }
  },
  
  getFeedbackDetails: async (req, res) => {
    try {
      const { branchId, feedbackId } = req.params;
      
      if (!branchId || !feedbackId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID and Feedback ID are required"
        });
      }
      
      const feedback = await feedbackService.getFeedbackDetails(branchId, feedbackId);
      
      return res.status(200).json({
        success: true,
        message: "Feedback details retrieved successfully",
        data: feedback
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Feedback not found") {
        return res.status(404).json({
          success: false,
          message: "Feedback not found"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error retrieving feedback details",
        error: error.message
      });
    }
  },
  
  addFeedback: async (req, res) => {
    try {
      const { branchId } = req.params;
      const feedbackData = req.body;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      // Validate required fields
      if (!feedbackData.rating || !feedbackData.orderId) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields"
        });
      }
      
      const feedback = await feedbackService.addFeedback(branchId, feedbackData);
      
      return res.status(201).json({
        success: true,
        message: "Feedback added successfully",
        data: feedback
      });
    } catch (error) {
      console.error(error.message);
      
      return res.status(500).json({
        success: false,
        message: "Error adding feedback",
        error: error.message
      });
    }
  },
  
  replyToFeedback: async (req, res) => {
    try {
      const { branchId, feedbackId } = req.params;
      const { reply } = req.body;
      
      if (!branchId || !feedbackId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID and Feedback ID are required"
        });
      }
      
      if (!reply) {
        return res.status(400).json({
          success: false,
          message: "Reply is required"
        });
      }
      
      const feedback = await feedbackService.replyToFeedback(branchId, feedbackId, reply);
      
      return res.status(200).json({
        success: true,
        message: "Reply added successfully",
        data: feedback
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Feedback not found") {
        return res.status(404).json({
          success: false,
          message: "Feedback not found"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error adding reply",
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
      
      const analytics = await feedbackService.getFeedbackAnalytics(branchId, period);
      
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

export default feedbackController;