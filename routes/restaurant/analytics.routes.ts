"use strict";

import { FastifyInstance, FastifyPluginOptions } from "fastify";
import analyticsController from "../../controllers/restaurant/analytics.controller.ts";
import { authMiddleware } from "../../middleware/restaurant/auth.middleware.ts";

async function analyticsRoutes(fastify: FastifyInstance, opts: FastifyPluginOptions) {
  // Get order analytics for a branch
  fastify.get("/:branchId/orders", { preHandler: authMiddleware }, analyticsController.getOrderAnalytics);

  // Get customer analytics for a branch
  fastify.get("/:branchId/customers", { preHandler: authMiddleware }, analyticsController.getCustomerAnalytics);

  // Get feedback analytics for a branch
  fastify.get("/:branchId/feedback", analyticsController.getFeedbackAnalytics);
}

export default analyticsRoutes;
