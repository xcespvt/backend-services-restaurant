"use strict";

import walletController from "../../controllers/delivery/wallet.controller.js";
import { authMiddleware } from "../../middleware/delivery/auth.middleware.js";

async function walletRoutes(fastify, options) {
  fastify.addHook("preHandler", authMiddleware);
  fastify.get("/balance", walletController.getBalance);
}

export default walletRoutes;
