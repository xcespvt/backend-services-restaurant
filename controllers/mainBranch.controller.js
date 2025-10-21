"use strict";
import mainBranchService from "../services/mainBranchService.js";

const mainBranchController = {
  getMainBranches: async (request, reply) => {
    try {
      const data = await mainBranchService.getData({});
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

  addMenuItem: async (request, reply) => {
    // logic intentionally left empty (no changes made)
  },
};

export default mainBranchController;
