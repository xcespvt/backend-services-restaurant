"use strict";

import authController from "../../controllers/delivery/auth.controller.js";

async function authRoutes(fastify, options) {
  fastify.post("/request-otp", authController.requestOtp);
  fastify.post("/verify-otp", authController.verifyOtp);
  fastify.post("/logout", authController.logout);
}

export default authRoutes;
