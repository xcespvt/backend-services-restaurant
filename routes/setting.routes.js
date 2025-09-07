"use strict";

import express from "express";
import settingController from "../controllers/setting.controller.js";

const router = express.Router();

// Get settings for a branch
router.get("/:branchId", settingController.getSettings);

// Update settings
router.put("/:branchId", settingController.updateSettings);

// Toggle online status
router.patch("/:branchId/toggle-online", settingController.toggleOnlineStatus);

// Toggle busy status
router.patch("/:branchId/toggle-busy", settingController.toggleBusyStatus);

// Update service settings
router.patch("/:branchId/service", settingController.updateServiceSettings);

// Update facilities
router.patch("/:branchId/facilities", settingController.updateFacilities);

// Update owner info
router.patch("/:branchId/owner-info", settingController.updateOwnerInfo);

// Update notification settings
router.patch("/:branchId/notifications", settingController.updateNotificationSettings);

export default router;