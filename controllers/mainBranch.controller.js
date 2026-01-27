"use strict";
import mainBranchService from "../services/mainBranchService.js";

const mainBranchController = {
  getMainBranches: async (request, reply) => {
    try {
      const filter = { "contact.email": request.user.email };
      const data = await mainBranchService.getData(filter);
      return reply.code(200).send({
        success: true,
        message: "Main Branches retrieved successfully",
        data,
      });
    } catch (error) {
      request.log.error(error.message);
      return reply.code(500).send({
        success: false,
        message: "Error retrieving main branches",
        error: error.message,
      });
    }
  },

  toggleBranchOnlineStatus: async (request, reply) => {
    try {
      const { branchId } = request.params;
      const user = request.user;


      if (!branchId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID is required"
        });
      }

      const result = await mainBranchService.toggleBranchOnlineStatus(branchId, user.email);

      return reply.code(200).send({
        success: true,
        message: `Branch is now ${result.isOnline ? 'online' : 'offline'}`,
        data: result
      });
    } catch (error) {
      console.error(error.message);

      if (error.message === "Branch not found") {
        return reply.code(404).send({
          success: false,
          message: "Branch not found"
        });
      }

      return reply.code(500).send({
        success: false,
        message: "Error toggling branch online status",
        error: error.message
      });
    }
  },

  toggleBranchRushHourStatus: async (request, reply) => {
    try {
      const { branchId } = request.params;
      const user = request.user;


      if (!branchId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID is required"
        });
      }

      const result = await mainBranchService.toggleBranchRushHourStatus(branchId, user.email);

      return reply.code(200).send({
        success: true,
        message: `Branch is now ${result.isRushHour ? 'in rush hour' : 'not in rush hour'}`,
        data: result
      });
    } catch (error) {
      console.error(error.message);

      if (error.message === "Branch not found") {
        return reply.code(404).send({
          success: false,
          message: "Branch not found"
        });
      }

      return reply.code(500).send({
        success: false,
        message: "Error toggling branch rush hour status",
        error: error.message
      });
    }
  }

};

export default mainBranchController;
