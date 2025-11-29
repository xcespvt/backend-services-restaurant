"use strict";

import authController from "../controllers/auth.controller.js";

async function authRoutes(fastify, opts) {


    fastify.post("/request-otp", authController.requestOtp);
    fastify.post("/verify-otp", authController.verifyOtp);
    fastify.post("/verify-token", authController.verifyToken);
}

export default authRoutes;