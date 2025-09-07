"use strict";

import express from "express";
import feedbackController from "../controllers/feedback.controller.js";

const router = express.Router();

// Get all feedback for a branch
router.get("/:branchId", feedbackController.getAllFeedback);

// Get feedback details
router.get("/:branchId/:feedbackId", feedbackController.getFeedbackDetails);

// Add a new feedback
router.post("/:branchId", feedbackController.addFeedback);

// Reply to feedback
router.patch("/:branchId/:feedbackId/reply", feedbackController.replyToFeedback);

// Get feedback analytics
router.get("/:branchId/analytics", feedbackController.getFeedbackAnalytics);

export default router;