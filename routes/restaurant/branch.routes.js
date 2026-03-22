"use strict";

import { authMiddleware } from "../middleware/auth.middleware.js";
import mainBranchController from "../controllers/mainBranch.controller.js";

async function branchRoutes(fastify) {
  // Branch routes



  // Main branch routes
  fastify.get("/mainbranch", { preHandler: authMiddleware }, mainBranchController.getMainBranches);
  fastify.get("/:branchId/profile", { preHandler: authMiddleware }, mainBranchController.getProfile);
  fastify.patch("/:branchId/toggle-online", { preHandler: authMiddleware }, mainBranchController.toggleBranchOnlineStatus);
  fastify.patch("/:branchId/rush-hour", { preHandler: authMiddleware }, mainBranchController.toggleBranchRushHourStatus);
  fastify.put("/:branchId/profile", { preHandler: authMiddleware }, mainBranchController.upsertProfile);

}

export default branchRoutes;
