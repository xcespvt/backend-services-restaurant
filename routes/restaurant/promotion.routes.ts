"use strict";

import { FastifyInstance, FastifyPluginOptions } from "fastify";
import promotionController from "../../controllers/restaurant/promotion.controller.ts";

async function promotionRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
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

