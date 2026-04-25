"use strict";

import { FastifyInstance, FastifyPluginOptions } from "fastify";
import refundController from "../../controllers/restaurant/refund.controller.ts";

async function refundRoutes(fastify: FastifyInstance, opts: FastifyPluginOptions) {
  // Get all refunds for a branch
  fastify.get("/:branchId", refundController.getAllRefunds);

  // Get refund details
  fastify.get("/:branchId/:refundId", refundController.getRefundDetails);

  // Create a refund request
  fastify.post("/:branchId", refundController.createRefundRequest);

  // Update refund status
  fastify.patch("/:branchId/:refundId/status", refundController.updateRefundStatus);

  // Update cost split
  fastify.patch("/:branchId/:refundId/cost-split", refundController.updateCostSplit);
}

export default refundRoutes;
