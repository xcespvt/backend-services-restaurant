"use strict";

import express from "express";
import analyticsController from "../../controllers/restaurant/analytics.controller.js";

const router = express.Router();

// Get order analytics for a branch
router.get("/:branchId/orders", authMiddleware, checkRole(['MANAGER', 'STAFF', 'CASHIER', 'CHEF', 'WAITER']), analyticsController.getOrderAnalytics);

// Get customer analytics for a branch
router.get("/:branchId/customers", authMiddleware, checkRole(['MANAGER', 'STAFF', 'CASHIER', 'CHEF', 'WAITER']), analyticsController.getCustomerAnalytics);

// Get feedback analytics for a branch
router.get("/:branchId/feedback", analyticsController.getFeedbackAnalytics);

export default router;