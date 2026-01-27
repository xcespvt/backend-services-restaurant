"use strict";

import { authMiddleware } from "../middleware/auth.middleware.js";
import branchController from "../controllers/branch.controller.js";
import mainBranchController from "../controllers/mainBranch.controller.js";

async function branchRoutes(fastify) {
  // Branch routes
  fastify.get("/", branchController.getAllBranches);
  fastify.post("/", branchController.addBranch);
  fastify.put("/:branchId", branchController.updateBranch);
  fastify.delete("/:branchId", branchController.deleteBranch);
  

  // Main branch routes
  fastify.get("/mainbranch",{preHandler: authMiddleware}, mainBranchController.getMainBranches);
  fastify.patch("/:branchId/toggle-online", {preHandler: authMiddleware}, mainBranchController.toggleBranchOnlineStatus);
  fastify.patch("/:branchId/rush-hour", {preHandler: authMiddleware}, mainBranchController.toggleBranchRushHourStatus);

} 

export default branchRoutes;
