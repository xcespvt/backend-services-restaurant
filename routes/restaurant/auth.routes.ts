"use strict";

import { FastifyInstance, FastifyPluginOptions } from "fastify";
import authController from "../../controllers/restaurant/auth.controller.ts";

async function authRoutes(fastify: FastifyInstance, opts: FastifyPluginOptions) {


    fastify.post("/request-otp", authController.requestOtp);
    fastify.post("/verify-otp", authController.verifyOtp);
    fastify.post("/verify-token", authController.verifyToken);
    fastify.post("/logout", authController.logout);

}

export default authRoutes;
