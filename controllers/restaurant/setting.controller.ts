import { FastifyRequest, FastifyReply } from "fastify";
import settingService from "../../services/restaurant/settingService.ts";

const settingController = {
  getSettings: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { branchId } = request.params;

      if (!branchId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID is required"
        });
      }

      const settings = await settingService.getSettings(branchId);

      return reply.code(200).send({
        success: true,
        message: "Settings retrieved successfully",
        data: settings
      });
    } catch (error: any) {
      console.error(error.message);

      return reply.code(500).send({
        success: false,
        message: "Error retrieving settings",
        error: error.message
      });
    }
  },

  updateSettings: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { branchId } = request.params;
      const settingsData = request.body;

      if (!branchId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID is required"
        });
      }

      const settings = await settingService.updateSettings(branchId, settingsData);

      return reply.code(200).send({
        success: true,
        message: "Settings updated successfully",
        data: settings
      });
    } catch (error: any) {
      console.error(error.message);

      return reply.code(500).send({
        success: false,
        message: "Error updating settings",
        error: error.message
      });
    }
  },

  toggleOnlineStatus: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { branchId } = request.params;

      if (!branchId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID is required"
        });
      }

      const result = await settingService.toggleOnlineStatus(branchId);

      return reply.code(200).send({
        success: true,
        message: `Restaurant is now ${result.isOnline ? 'online' : 'offline'}`,
        data: result
      });
    } catch (error: any) {
      console.error(error.message);

      if (error.message === "Settings not found") {
        return reply.code(404).send({
          success: false,
          message: "Settings not found"
        });
      }

      return reply.code(500).send({
        success: false,
        message: "Error toggling online status",
        error: error.message
      });
    }
  },

  toggleBusyStatus: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { branchId } = request.params;

      if (!branchId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID is required"
        });
      }

      const result = await settingService.toggleBusyStatus(branchId);

      return reply.code(200).send({
        success: true,
        message: `Restaurant is now ${result.isBusy ? 'busy' : 'not busy'}`,
        data: result
      });
    } catch (error: any) {
      console.error(error.message);

      if (error.message === "Settings not found") {
        return reply.code(404).send({
          success: false,
          message: "Settings not found"
        });
      }

      return reply.code(500).send({
        success: false,
        message: "Error toggling busy status",
        error: error.message
      });
    }
  },

  updateServiceSettings: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { branchId, serviceType } = request.params;
      const serviceSettings = request.body;

      if (!branchId || !serviceType) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID and service type are required"
        });
      }

      const services = await settingService.updateServiceSettings(branchId, serviceType, serviceSettings);

      return reply.code(200).send({
        success: true,
        message: "Service settings updated successfully",
        data: services
      });
    } catch (error: any) {
      console.error(error.message);

      if (error.message === "Settings not found") {
        return reply.code(404).send({
          success: false,
          message: "Settings not found"
        });
      }

      if (error.message === "Invalid service type") {
        return reply.code(400).send({
          success: false,
          message: "Invalid service type"
        });
      }

      return reply.code(500).send({
        success: false,
        message: "Error updating service settings",
        error: error.message
      });
    }
  },

  updateFacilities: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { branchId } = request.params;
      const facilities = request.body;

      if (!branchId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID is required"
        });
      }

      const result = await settingService.updateFacilities(branchId, facilities);

      return reply.code(200).send({
        success: true,
        message: "Facilities updated successfully",
        data: result
      });
    } catch (error: any) {
      console.error(error.message);

      if (error.message === "Settings not found") {
        return reply.code(404).send({
          success: false,
          message: "Settings not found"
        });
      }

      return reply.code(500).send({
        success: false,
        message: "Error updating facilities",
        error: error.message
      });
    }
  },

  updateOwnerInfo: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { branchId } = request.params;
      const ownerInfo = request.body;

      if (!branchId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID is required"
        });
      }

      const result = await settingService.updateOwnerInfo(branchId, ownerInfo);

      return reply.code(200).send({
        success: true,
        message: "Owner information updated successfully",
        data: result
      });
    } catch (error: any) {
      console.error(error.message);

      if (error.message === "Settings not found") {
        return reply.code(404).send({
          success: false,
          message: "Settings not found"
        });
      }

      return reply.code(500).send({
        success: false,
        message: "Error updating owner information",
        error: error.message
      });
    }
  },

  updateNotificationSettings: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { branchId } = request.params;
      const notifications = request.body;

      if (!branchId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID is required"
        });
      }

      const result = await settingService.updateNotificationSettings(branchId, notifications);

      return reply.code(200).send({
        success: true,
        message: "Notification settings updated successfully",
        data: result
      });
    } catch (error: any) {
      console.error(error.message);

      if (error.message === "Settings not found") {
        return reply.code(404).send({
          success: false,
          message: "Settings not found"
        });
      }

      return reply.code(500).send({
        success: false,
        message: "Error updating notification settings",
        error: error.message
      });
    }
  }
};

export default settingController;
