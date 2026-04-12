"use strict";

import express from "express";
import analyticsController from "../../controllers/restaurant/analytics.controller.js";
import { authMiddleware } from "../../middleware/restaurant/auth.middleware.js";
const router = express.Router();

// Get order analytics for a branch
router.get("/:branchId/orders", authMiddleware, analyticsController.getOrderAnalytics);

// Get customer analytics for a branch
router.get("/:branchId/customers", authMiddleware, analyticsController.getCustomerAnalytics);

// Get feedback analytics for a branch
router.get("/:branchId/feedback", analyticsController.getFeedbackAnalytics);

export default router;