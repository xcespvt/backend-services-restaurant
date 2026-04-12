"use strict";

import orderController from "../../controllers/delivery/order.controller.js";
import { authMiddleware } from "../../middleware/delivery/auth.middleware.js";

async function orderRoutes(fastify, options) {
  fastify.addHook("preHandler", authMiddleware); // Protect all order routes

  fastify.get("/available", orderController.getAvailableOrders);
  fastify.get("/active", orderController.getActiveOrders);
  fastify.post("/:orderId/accept", orderController.acceptOrder);
  fastify.patch("/:orderId/status", orderController.updateStatus);
}

export default orderRoutes;
