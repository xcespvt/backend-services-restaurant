"use strict";

import offerController from "../controllers/offer.controller.js";

async function offersRoutes(fastify, options) {
  // 🧾 Get all offers
  fastify.get("/offers/:restaurantId", offerController.getOffers);

  // ➕ Add a new offer
  fastify.post("/offers/add", offerController.addOffers);

  // ✏️ Update an offer
  fastify.put("/offers/update/:restaurantId/:offerId", offerController.updateOffers);

  // 🗑️ Delete an offer
  fastify.delete("/offers/delete/:restaurantId/:offerId", offerController.deleteOffers);

  // 🔄 Toggle offer availability
  fastify.put("/offers/toggle/:restaurantId/:offerId", offerController.toggleOfferAvailability);
}

export default offersRoutes;
