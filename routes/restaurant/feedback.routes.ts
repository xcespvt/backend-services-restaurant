"use strict";

import { FastifyInstance, FastifyPluginOptions } from "fastify";
import feedbackController from "../../controllers/restaurant/feedback.controller.ts";
import { authMiddleware } from "../../middleware/restaurant/auth.middleware.ts";

async function feedbackRoutes(fastify: FastifyInstance, opts: FastifyPluginOptions) {
  // Get all feedback for a branch
  fastify.get("/:branchId", feedbackController.getAllFeedback);

  // Get feedback details
  fastify.get("/:branchId/:feedbackId", feedbackController.getFeedbackDetails);

  // Add a new feedback
  fastify.post("/:branchId", feedbackController.addFeedback);

  // Reply to feedback
  fastify.patch("/:branchId/:feedbackId/reply", feedbackController.replyToFeedback);

  // Get feedback analytics
  fastify.get("/:branchId/analytics", feedbackController.getFeedbackAnalytics);
}

export default feedbackRoutes;
