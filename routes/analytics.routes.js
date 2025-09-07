"use strict";

import express from "express";
import analyticsController from "../controllers/analytics.controller.js";

const router = express.Router();

// Get order analytics for a branch
router.get("/:branchId/orders", analyticsController.getOrderAnalytics);

// Get customer analytics for a branch
router.get("/:branchId/customers", analyticsController.getCustomerAnalytics);

// Get feedback analytics for a branch
router.get("/:branchId/feedback", analyticsController.getFeedbackAnalytics);

export default router;