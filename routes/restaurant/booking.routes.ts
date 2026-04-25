"use strict";

import { FastifyInstance, FastifyPluginOptions } from "fastify";
import bookingController from "../../controllers/restaurant/booking.controller.ts";
import { authMiddleware } from "../../middleware/restaurant/auth.middleware.ts";
async function bookingRoutes(fastify: FastifyInstance, opts: FastifyPluginOptions) {
  // Branch routes
  fastify.get("/:restaurantId", { preHandler: authMiddleware }, bookingController.getAllBookings);
  fastify.post("/:restaurantId/tables", { preHandler: authMiddleware }, bookingController.addTable);
  fastify.put("/:restaurantId/tables/:tableId", { preHandler: authMiddleware }, bookingController.updateTable);
  fastify.delete("/:restaurantId/tables/:tableId", { preHandler: authMiddleware }, bookingController.deleteTable);
  fastify.post("/:restaurantId/tables/series", { preHandler: authMiddleware }, bookingController.addTableSeries);
  fastify.patch("/:restaurantId/tables/:tableId/status", { preHandler: authMiddleware }, bookingController.updateTableStatus);
}

export default bookingRoutes;

