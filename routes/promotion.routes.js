"use strict";

import promotionController from "../controllers/promotion.controller.js";

async function promotionRoutes(fastify, options) {
  // 🧾 Get all promotions
  fastify.get("/promotions/:restaurantId", promotionController.getPromotions);

  // ➕ Add a new promotion
  fastify.post("/promotions/add", promotionController.addPromotions);

  // ✏️ Update a promotion
  fastify.put(
    "/promotions/update/:restaurantId/:promotionId",
    promotionController.updatePromotions,
  );

  // 🗑️ Delete a promotion
  fastify.delete(
    "/promotions/delete/:restaurantId/:promotionId",
    promotionController.deletePromotions,
  );

  // 🔄 Toggle promotion availability
  fastify.put(
    "/promotions/toggle/:restaurantId/:promotionId",
    promotionController.togglePromotionAvailability,
  );
}

export default promotionRoutes;
