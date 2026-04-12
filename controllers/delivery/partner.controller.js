"use strict";

import partnerService from "../../services/delivery/partnerService.js";

const partnerController = {
  getProfile: async (request, reply) => {
    try {
      const { referenceId: partnerId } = request.user;
      const profile = await partnerService.getProfile(partnerId);
      return reply.code(200).send({ success: true, profile });
    } catch (error) {
      return reply.code(500).send({ success: false, message: error.message });
    }
  },

  updateProfile: async (request, reply) => {
    try {
      const { referenceId: partnerId } = request.user;
      const profile = await partnerService.updateProfile(partnerId, request.body);
      return reply.code(200).send({ success: true, profile });
    } catch (error) {
      return reply.code(500).send({ success: false, message: error.message });
    }
  },

  toggleOnline: async (request, reply) => {
    try {
      const { referenceId: partnerId } = request.user;
      const { isOnline } = request.body;
      const profile = await partnerService.updateStatus(partnerId, isOnline);
      return reply.code(200).send({ success: true, isOnline: profile.isOnline });
    } catch (error) {
      return reply.code(500).send({ success: false, message: error.message });
    }
  }
};

export default partnerController;
