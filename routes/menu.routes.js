"use strict";

import express from "express";
import menuController from "../controllers/menu.controller.js";

const router = express.Router();



// Get all menu items for a branch
router.get("/getitems/:restaurantId", menuController.getMenuItems);

// Search menu items
router.get("/search", menuController.searchMenuItems);

// Update a menu item
router.put("/updateitems/:restaurantId/:itemId", menuController.updateMenuItem);

router.post("/add", menuController.addMenuItem);



// Delete a menu item
router.delete("/deleteitems/:restaurantId/:itemId", menuController.deleteMenuItem);

// Toggle menu item availability
router.patch("/:restaurantId/:itemId/toggle-availability", menuController.toggleMenuItemAvailability);

// Add a new category
router.post("/:restaurantId/category", menuController.addCategory);

export default router;