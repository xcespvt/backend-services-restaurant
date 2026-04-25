"use strict";

import { FastifyInstance, FastifyPluginOptions } from "fastify";
import partnerController from "../../controllers/delivery/partner.controller.ts";
import { authMiddleware } from "../../middleware/delivery/auth.middleware.ts";

async function partnerRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.addHook("preHandler", authMiddleware);
  fastify.get("/profile", partnerController.getProfile);
  fastify.patch("/profile", partnerController.updateProfile);
  fastify.post("/toggle-online", partnerController.toggleOnline);
}

export default partnerRoutes;

