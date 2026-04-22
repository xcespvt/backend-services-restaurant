"use strict";

import bookingController from "../../controllers/restaurant/booking.controller.js";
import { authMiddleware } from "../../middleware/restaurant/auth.middleware.js";
async function bookingRoutes(fastify) {
  // Branch routes
  fastify.get("/:restaurantId", { preHandler: authMiddleware }, bookingController.getAllBookings);
  fastify.post("/:restaurantId/tables", { preHandler: authMiddleware }, bookingController.addTable);
  fastify.put("/:restaurantId/tables/:tableId", { preHandler: authMiddleware }, bookingController.updateTable);
  fastify.delete("/:restaurantId/tables/:tableId", { preHandler: authMiddleware }, bookingController.deleteTable);
  fastify.post("/:restaurantId/tables/series", { preHandler: authMiddleware }, bookingController.addTableSeries);
  fastify.patch("/:restaurantId/tables/:tableId/status", { preHandler: authMiddleware }, bookingController.updateTableStatus);
}

export default bookingRoutes;
