"use strict";

import bookingController from "../controllers/booking.controller.js";

async function bookingRoutes(fastify) {
  // Branch routes
  fastify.get("/:restaurantId", bookingController.getAllBookings);
fastify.post("/:restaurantId/tables/series", bookingController.addTableSeries);
}

export default bookingRoutes;
