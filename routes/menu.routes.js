"use strict";

import express from "express";
import menuController from "../controllers/menu.controller.js";

const router = express.Router();


//ads menu items 
router.post('/add/menuitem',menuController.addMenuItem);


// Get all menu items for a branch
router.get("/getitems/:restaurantId", menuController.getMenuItems);

// Update a menu item
router.put("/:restaurantId/:itemId", menuController.updateMenuItem);

// Delete a menu item
router.delete("/:restaurantId/:itemId", menuController.deleteMenuItem);

// Toggle menu item availability
router.patch("/:restaurantId/:itemId/toggle-availability", menuController.toggleMenuItemAvailability);

// Add a new category
router.post("/:restaurantId/category", menuController.addCategory);

export default router;