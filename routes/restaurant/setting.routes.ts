"use strict";

import { FastifyInstance, FastifyPluginOptions } from "fastify";
import settingController from "../../controllers/restaurant/setting.controller.ts";

async function settingRoutes(fastify: FastifyInstance, opts: FastifyPluginOptions) {
  // Get settings for a branch
  fastify.get("/:branchId", settingController.getSettings);

  // Update settings
  fastify.put("/:branchId", settingController.updateSettings);

  // Toggle online status
  fastify.patch("/:branchId/toggle-online", settingController.toggleOnlineStatus);

  // Toggle busy status
  fastify.patch("/:branchId/toggle-busy", settingController.toggleBusyStatus);

  // Update service settings
  fastify.patch("/:branchId/service", settingController.updateServiceSettings);

  // Update facilities
  fastify.patch("/:branchId/facilities", settingController.updateFacilities);

  // Update owner info
  fastify.patch("/:branchId/owner-info", settingController.updateOwnerInfo);

  // Update notification settings
  fastify.patch("/:branchId/notifications", settingController.updateNotificationSettings);
}

export default settingRoutes;
