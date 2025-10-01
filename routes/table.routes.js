"use strict";

// this is table routes
import express from "express";
import tableController from "../controllers/table.controller.js";

const router = express.Router();

// Get all tables for a branch
router.get("/:branchId", tableController.getAllTables);

// Add a new table
router.post("/:branchId", tableController.addTable);

// Update a table
router.put("/:branchId/:tableId", tableController.updateTable);

// Delete a table
router.delete("/:branchId/:tableId", tableController.deleteTable);

// Update table status
router.patch("/:branchId/:tableId/status", tableController.updateTableStatus);

export default router;