"use strict";

import offerController from "../controllers/offer.controller.js";
import { authMiddleware } from "../middleware/auth.js";


async function offersRoutes(fastify, options) {
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
