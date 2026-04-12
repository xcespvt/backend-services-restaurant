"use strict";

import partnerController from "../../controllers/delivery/partner.controller.js";
import { authMiddleware } from "../../middleware/delivery/auth.middleware.js";

async function partnerRoutes(fastify, options) {
  fastify.addHook("preHandler", authMiddleware);
  fastify.get("/profile", partnerController.getProfile);
  fastify.patch("/profile", partnerController.updateProfile);
  fastify.post("/toggle-online", partnerController.toggleOnline);
}

export default partnerRoutes;
