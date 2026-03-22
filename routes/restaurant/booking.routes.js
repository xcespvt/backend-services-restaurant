"use strict";

import bookingController from "../controllers/booking.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
async function bookingRoutes(fastify) {
  // Branch routes
  fastify.get("/:restaurantId", { preHandler: authMiddleware }, bookingController.getAllBookings);
  fastify.post("/:restaurantId/tables/series", { preHandler: authMiddleware }, bookingController.addTableSeries);
}

export default bookingRoutes;
