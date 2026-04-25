"use strict";

import { FastifyInstance, FastifyPluginOptions } from "fastify";
import offerController from "../../controllers/restaurant/offer.controller.ts";
import { authMiddleware } from "../../middleware/restaurant/auth.middleware.ts";


async function offersRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // 🧾 Get all offers
  fastify.get("/offers/:restaurantId", { preHandler: authMiddleware }, offerController.getOffers);

  // ➕ Add a new offer
  fastify.post("/offers/add", { preHandler: authMiddleware }, offerController.addOffers);

  // ✏️ Update an offer
  fastify.put("/offers/update/:restaurantId/:offerId", { preHandler: authMiddleware }, offerController.updateOffers);

  // 🗑️ Delete an offer
  fastify.delete("/offers/delete/:restaurantId/:offerId", { preHandler: authMiddleware }, offerController.deleteOffers);

  // 🔄 Toggle offer availability
  fastify.put("/offers/toggle/:restaurantId/:offerId", { preHandler: authMiddleware }, offerController.toggleOfferAvailability);
}

export default offersRoutes;

