"use strict";
import mainBranchService from "../../services/restaurant/mainBranchService.js";

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
  },

  upsertProfile: async (request, reply) => {
    try {
      const { branchId } = request.params;
      const user = request.user;

      if (!branchId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID is required"
        });
      }

      const updateFields = {};
      if (request.body.restaurantInfo) updateFields["profile.restaurantInfo"] = request.body.restaurantInfo;
      if (request.body.ownerInfo) updateFields["profile.ownerInfo"] = request.body.ownerInfo;
      if (request.body.operatingHours) updateFields["profile.operatingHours"] = request.body.operatingHours;
      if (request.body.documents) updateFields["profile.documents"] = request.body.documents;
      if (request.body.bankAccount) updateFields["profile.bankAccount"] = request.body.bankAccount;
      if (request.body.facilities) updateFields["profile.facilities"] = request.body.facilities;
      if (request.body.services) updateFields["profile.services"] = request.body.services;

      const filter = { branchId, "contact.email": user.email };
      const updatedData = await mainBranchService.updateData(filter, { $set: updateFields });

      if (!updatedData) {
        return reply.code(404).send({
          success: false,
          message: "Branch not found or unauthorized to update"
        });
      }

      return reply.code(200).send({
        success: true,
        message: "Profile updated successfully",
        data: updatedData.profile
      });
    } catch (error) {
      console.error(error.message);
      return reply.code(500).send({
        success: false,
        message: "Error updating profile",
        error: error.message
      });
    }
  },

  getProfile: async (request, reply) => {
    try {
      const { branchId } = request.params;
      const user = request.user;

      if (!branchId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID is required"
        });
      }

      const filter = { branchId, "contact.email": user.email };
      const branch = await mainBranchService.getSingleDocument(filter);

      if (!branch) {
        return reply.code(404).send({
          success: false,
          message: "Branch not found or unauthorized"
        });
      }

      return reply.code(200).send({
        success: true,
        message: "Profile retrieved successfully",
        data: branch.profile || {}
      });
    } catch (error) {
      console.error(error.message);
      return reply.code(500).send({
        success: false,
        message: "Error retrieving profile",
        error: error.message
      });
    }
  }

};

export default mainBranchController;
