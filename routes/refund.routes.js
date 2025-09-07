"use strict";

import express from "express";
import refundController from "../controllers/refund.controller.js";

const router = express.Router();

// Get all refunds for a branch
router.get("/:branchId", refundController.getAllRefunds);

// Get refund details
router.get("/:branchId/:refundId", refundController.getRefundDetails);

// Create a refund request
router.post("/:branchId", refundController.createRefundRequest);

// Update refund status
router.patch("/:branchId/:refundId/status", refundController.updateRefundStatus);

// Update cost split
router.patch("/:branchId/:refundId/cost-split", refundController.updateCostSplit);

export default router;