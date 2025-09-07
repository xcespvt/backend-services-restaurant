"use strict";

import refundService from "../services/refundService.js";

const refundController = {
  getAllRefunds: async (req, res) => {
    try {
      const { branchId } = req.params;
      const { status } = req.query;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      const refunds = await refundService.getAllRefunds(branchId, status);
      
      return res.status(200).json({
        success: true,
        message: "Refunds retrieved successfully",
        data: refunds
      });
    } catch (error) {
      console.error(error.message);
      
      return res.status(500).json({
        success: false,
        message: "Error retrieving refunds",
        error: error.message
      });
    }
  },
  
  getRefundDetails: async (req, res) => {
    try {
      const { branchId, refundId } = req.params;
      
      if (!branchId || !refundId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID and Refund ID are required"
        });
      }
      
      const refund = await refundService.getRefundDetails(branchId, refundId);
      
      return res.status(200).json({
        success: true,
        message: "Refund details retrieved successfully",
        data: refund
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Refund not found") {
        return res.status(404).json({
          success: false,
          message: "Refund not found"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error retrieving refund details",
        error: error.message
      });
    }
  },
  
  createRefundRequest: async (req, res) => {
    try {
      const { branchId } = req.params;
      const { orderId, reason, items, photos } = req.body;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      // Validate required fields
      if (!orderId || !reason) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields"
        });
      }
      
      const refund = await refundService.createRefundRequest(branchId, orderId, reason, items, photos);
      
      return res.status(201).json({
        success: true,
        message: "Refund request created successfully",
        data: refund
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Order not found") {
        return res.status(404).json({
          success: false,
          message: "Order not found"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error creating refund request",
        error: error.message
      });
    }
  },
  
  updateRefundStatus: async (req, res) => {
    try {
      const { branchId, refundId } = req.params;
      const { status, notes, processedBy } = req.body;
      
      if (!branchId || !refundId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID and Refund ID are required"
        });
      }
      
      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Status is required"
        });
      }
      
      const refund = await refundService.updateRefundStatus(branchId, refundId, status, notes, processedBy);
      
      return res.status(200).json({
        success: true,
        message: "Refund status updated successfully",
        data: refund
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Refund not found") {
        return res.status(404).json({
          success: false,
          message: "Refund not found"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error updating refund status",
        error: error.message
      });
    }
  },
  
  updateCostSplit: async (req, res) => {
    try {
      const { branchId, refundId } = req.params;
      const { costSplit } = req.body;
      
      if (!branchId || !refundId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID and Refund ID are required"
        });
      }
      
      if (!costSplit) {
        return res.status(400).json({
          success: false,
          message: "Cost split is required"
        });
      }
      
      const refund = await refundService.updateCostSplit(branchId, refundId, costSplit);
      
      return res.status(200).json({
        success: true,
        message: "Cost split updated successfully",
        data: refund
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Refund not found") {
        return res.status(404).json({
          success: false,
          message: "Refund not found"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error updating cost split",
        error: error.message
      });
    }
  }
};

export default refundController;