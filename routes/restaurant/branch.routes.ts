"use strict";

import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { authMiddleware } from "../../middleware/restaurant/auth.middleware.ts";
import mainBranchController from "../../controllers/restaurant/mainBranch.controller.ts";

async function branchRoutes(fastify: FastifyInstance, opts: FastifyPluginOptions) {
  // Branch routes



  // Main branch routes
  fastify.get("/mainbranch", { preHandler: authMiddleware }, mainBranchController.getMainBranches);
  fastify.get("/:branchId/profile", { preHandler: authMiddleware }, mainBranchController.getProfile);
  fastify.patch("/:branchId/toggle-online", { preHandler: authMiddleware }, mainBranchController.toggleBranchOnlineStatus);
  fastify.patch("/:branchId/rush-hour", { preHandler: authMiddleware }, mainBranchController.toggleBranchRushHourStatus);
  fastify.put("/:branchId/profile", { preHandler: authMiddleware }, mainBranchController.upsertProfile);
  fastify.post("/:branchId/floors", { preHandler: authMiddleware }, mainBranchController.upsertFloor);
  fastify.delete("/:branchId/floors/:floorId", { preHandler: authMiddleware }, mainBranchController.deleteFloor);

}

export default branchRoutes;

