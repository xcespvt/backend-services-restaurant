"use strict";

import { FastifyInstance, FastifyPluginOptions } from "fastify";
import orderController from "../../controllers/delivery/order.controller.ts";
import { authMiddleware } from "../../middleware/delivery/auth.middleware.ts";

async function orderRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.addHook("preHandler", authMiddleware); // Protect all order routes

  fastify.get("/available", orderController.getAvailableOrders);
  fastify.get("/active", orderController.getActiveOrders);
  fastify.post("/:orderId/accept", orderController.acceptOrder);
  fastify.patch("/:orderId/status", orderController.updateStatus);
}

export default orderRoutes;

