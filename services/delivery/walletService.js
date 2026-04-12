"use strict";

import DeliveryPartner from "../../models/delivery/deliveryPartnerModel.js";

const walletService = {
  getBalance: async (partnerId) => {
    try {
      const partner = await DeliveryPartner.findOne({ partnerId });
      return partner ? partner.walletBalance : 0;
    } catch (error) {
      console.error("Error fetching wallet balance:", error.message);
      throw error;
    }
  },

  addTransaction: async (partnerId, amount, type, description) => {
    try {
      // type: 'Credit' or 'Debit'
      const update = type === 'Credit' ? { $inc: { walletBalance: amount } } : { $inc: { walletBalance: -amount } };
      return await DeliveryPartner.findOneAndUpdate({ partnerId }, update, { new: true });
    } catch (error) {
      console.error("Error updating wallet:", error.message);
      throw error;
    }
  }
};

export default walletService;
