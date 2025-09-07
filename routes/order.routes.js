"use strict";

import express from "express";
import orderController from "../controllers/order.controller.js";

const router = express.Router();

// Get all orders for a branch
router.get("/:branchId", orderController.getAllOrders);

// Get order details
router.get("/:branchId/:orderId", orderController.getOrderDetails);

// Update order status
router.patch("/:branchId/:orderId/status", orderController.updateOrderStatus);

// Update order preparation time
router.patch("/:branchId/:orderId/prep-time", orderController.updateOrderPrepTime);

// Accept new order
router.post("/:branchId/accept", orderController.acceptNewOrder);

// Create offline order
router.post("/:branchId/offline", orderController.createOfflineOrder);

// Get order history
router.get("/:branchId/history/:customerId", orderController.getOrderHistory);

export default router;