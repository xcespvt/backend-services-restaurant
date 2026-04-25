"use strict";

import { FastifyInstance, FastifyPluginOptions } from "fastify";
import orderController from "../../controllers/restaurant/order.controller.ts";

async function orderRoutes(fastify: FastifyInstance, opts: FastifyPluginOptions) {
  // Get all orders for a branch
  fastify.get("/:branchId", orderController.getAllOrders);

  // Get order details
  fastify.get("/:branchId/:orderId", orderController.getOrderDetails);

  // Update order status
  fastify.patch("/:branchId/:orderId/status", orderController.updateOrderStatus);

  // Update order preparation time
  fastify.patch("/:branchId/:orderId/prep-time", orderController.updateOrderPrepTime);

  // Accept new order
  fastify.post("/:branchId/accept", orderController.acceptNewOrder);

  // Create offline order
  fastify.post("/:branchId/offline", orderController.createOfflineOrder);

  // Get order history
  fastify.get("/:branchId/history/:customerId", orderController.getOrderHistory);
}

export default orderRoutes;
