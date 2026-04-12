"use strict";

import DeliveryPartner from "../../models/delivery/deliveryPartnerModel.js";

const partnerService = {
  getProfile: async (partnerId) => {
    try {
      return await DeliveryPartner.findOne({ partnerId });
    } catch (error) {
      console.error("Error fetching partner profile:", error.message);
      throw error;
    }
  },

  updateProfile: async (partnerId, updateData) => {
    try {
      return await DeliveryPartner.findOneAndUpdate({ partnerId }, updateData, { new: true });
    } catch (error) {
      console.error("Error updating partner profile:", error.message);
      throw error;
    }
  },

  updateStatus: async (partnerId, isOnline) => {
    try {
      return await DeliveryPartner.findOneAndUpdate({ partnerId }, { isOnline }, { new: true });
    } catch (error) {
      console.error("Error updating partner status:", error.message);
      throw error;
    }
  }
};

export default partnerService;
