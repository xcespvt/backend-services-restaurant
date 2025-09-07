"use strict";

import express from "express";
import branchController from "../controllers/branch.controller.js";

const router = express.Router();

// Get all branches for a user
router.get("/", branchController.getAllBranches);

// Add a new branch
router.post("/", branchController.addBranch);

// Update a branch
router.put("/:branchId", branchController.updateBranch);

// Delete a branch
router.delete("/:branchId", branchController.deleteBranch);

// Toggle branch online status
router.patch("/:branchId/toggle-online", branchController.toggleBranchOnlineStatus);

export default router;