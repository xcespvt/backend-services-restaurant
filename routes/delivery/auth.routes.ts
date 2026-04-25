"use strict";

import { FastifyInstance, FastifyPluginOptions } from "fastify";
import authController from "../../controllers/delivery/auth.controller.ts";

async function authRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post("/request-otp", authController.requestOtp);
  fastify.post("/verify-otp", authController.verifyOtp);
  fastify.post("/logout", authController.logout);
}

export default authRoutes;

