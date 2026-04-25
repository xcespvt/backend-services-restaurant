"use strict";

import { FastifyInstance, FastifyPluginOptions } from "fastify";
import walletController from "../../controllers/delivery/wallet.controller.ts";
import { authMiddleware } from "../../middleware/delivery/auth.middleware.ts";

async function walletRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.addHook("preHandler", authMiddleware);
  fastify.get("/balance", walletController.getBalance);
}

export default walletRoutes;

