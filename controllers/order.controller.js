"use strict";

import orderService from "../services/orderService.js";

const orderController = {
  getAllOrders: async (req, res) => {
    try {
      const { branchId } = req.params;
      const { status, type, date } = req.query;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      const orders = await orderService.getAllOrders(branchId, status, type, date);
      
      return res.status(200).json({
        success: true,
        message: "Orders retrieved successfully",
        data: orders
      });
    } catch (error) {
      console.error(error.message);
      
      return res.status(500).json({
        success: false,
        message: "Error retrieving orders",
        error: error.message
      });
    }
  },
  
  getOrderDetails: async (req, res) => {
    try {
      const { branchId, orderId } = req.params;
      
      if (!branchId || !orderId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID and Order ID are required"
        });
      }
      
      const order = await orderService.getOrderDetails(branchId, orderId);
      
      return res.status(200).json({
        success: true,
        message: "Order details retrieved successfully",
        data: order
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
        message: "Error retrieving order details",
        error: error.message
      });
    }
  },
  
  updateOrderStatus: async (req, res) => {
    try {
      const { branchId, orderId } = req.params;
      const { status } = req.body;
      
      if (!branchId || !orderId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID and Order ID are required"
        });
      }
      
      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Status is required"
        });
      }
      
      const result = await orderService.updateOrderStatus(branchId, orderId, status);
      
      return res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        data: result
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
        message: "Error updating order status",
        error: error.message
      });
    }
  },
  
  updateOrderPrepTime: async (req, res) => {
    try {
      const { branchId, orderId } = req.params;
      const { extraMinutes } = req.body;
      
      if (!branchId || !orderId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID and Order ID are required"
        });
      }
      
      if (extraMinutes === undefined) {
        return res.status(400).json({
          success: false,
          message: "Extra minutes is required"
        });
      }
      
      const result = await orderService.updateOrderPrepTime(branchId, orderId, extraMinutes);
      
      return res.status(200).json({
        success: true,
        message: "Order preparation time updated successfully",
        data: result
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
        message: "Error updating order preparation time",
        error: error.message
      });
    }
  },
  
  acceptNewOrder: async (req, res) => {
    try {
      const { branchId, orderId } = req.params;
      const { prepTime } = req.body;
      
      if (!branchId || !orderId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID and Order ID are required"
        });
      }
      
      if (!prepTime) {
        return res.status(400).json({
          success: false,
          message: "Preparation time is required"
        });
      }
      
      const result = await orderService.acceptNewOrder(branchId, orderId, prepTime);
      
      return res.status(200).json({
        success: true,
        message: "Order accepted successfully",
        data: result
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Order not found or already accepted") {
        return res.status(404).json({
          success: false,
          message: "Order not found or already accepted"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error accepting order",
        error: error.message
      });
    }
  },
  
  createOfflineOrder: async (req, res) => {
    try {
      const { branchId } = req.params;
      const { items, customerName, customerPhone, type, paymentMethod } = req.body;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      // Validate required fields
      if (!items || !items.length || !customerName || !type || !paymentMethod) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields"
        });
      }
      
      const order = await orderService.createOfflineOrder(
        branchId,
        items,
        customerName,
        customerPhone,
        type,
        paymentMethod
      );
      
      return res.status(201).json({
        success: true,
        message: "Offline order created successfully",
        data: order
      });
    } catch (error) {
      console.error(error.message);
      
      return res.status(500).json({
        success: false,
        message: "Error creating offline order",
        error: error.message
      });
    }
  },
  
  getOrderHistory: async (req, res) => {
    try {
      const { branchId } = req.params;
      const { startDate, endDate, type } = req.query;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      const orders = await orderService.getOrderHistory(branchId, startDate, endDate, type);
      
      return res.status(200).json({
        success: true,
        message: "Order history retrieved successfully",
        data: orders
      });
    } catch (error) {
      console.error(error.message);
      
      return res.status(500).json({
        success: false,
        message: "Error retrieving order history",
        error: error.message
      });
    }
  }
};

export default orderController;