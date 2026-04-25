"use strict";

import DeliveryPartner from "../../models/delivery/deliveryPartnerModel.ts";

const partnerService = {
  getProfile: async (partnerId: string) => {
    try {
      return await DeliveryPartner.findOne({ partnerId });
    } catch (error: any) {
      console.error("Error fetching partner profile:", error.message);
      throw error;
    }
  },

  updateProfile: async (partnerId: string, updateData: any) => {
    try {
      return await DeliveryPartner.findOneAndUpdate({ partnerId }, updateData, { new: true });
    } catch (error: any) {
      console.error("Error updating partner profile:", error.message);
      throw error;
    }
  },

  updateStatus: async (partnerId: string, isOnline: boolean) => {
    try {
      return await DeliveryPartner.findOneAndUpdate({ partnerId }, { isOnline }, { new: true });
    } catch (error: any) {
      console.error("Error updating partner status:", error.message);
      throw error;
    }
  }
};

export default partnerService;

