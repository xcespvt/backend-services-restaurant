"use strict";

import DeliveryPartner from "../../models/delivery/deliveryPartnerModel.ts";

const walletService = {
  getBalance: async (partnerId: string) => {
    try {
      const partner = await DeliveryPartner.findOne({ partnerId });
      return partner ? (partner as any).walletBalance : 0;
    } catch (error: any) {
      console.error("Error fetching wallet balance:", error.message);
      throw error;
    }
  },

  addTransaction: async (partnerId: string, amount: number, type: string, description: string) => {
    try {
      // type: 'Credit' or 'Debit'
      const update = type === 'Credit' ? { $inc: { walletBalance: amount } } : { $inc: { walletBalance: -amount } };
      return await DeliveryPartner.findOneAndUpdate({ partnerId }, update, { new: true });
    } catch (error: any) {
      console.error("Error updating wallet:", error.message);
      throw error;
    }
  }
};

export default walletService;

