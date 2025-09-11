"use strict";

import express from "express";
import menuController from "../controllers/menu.controller.js";

const router = express.Router();

// Get all menu items for a branch
router.get("/getitems/:branchId", menuController.getMenuItems);

// Add a new menu item
router.post("/:branchId", menuController.addMenuItem);

// Update a menu item
router.put("/:branchId/:itemId", menuController.updateMenuItem);

// Delete a menu item
router.delete("/:branchId/:itemId", menuController.deleteMenuItem);

// Toggle menu item availability
router.patch("/:branchId/:itemId/toggle-availability", menuController.toggleMenuItemAvailability);

// Add a new category
router.post("/:branchId/category", menuController.addCategory);

export default router;