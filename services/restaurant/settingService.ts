"use strict";

import Setting from "../../models/restaurant/settingModel.ts";
import Branch from "../../models/restaurant/mainBranch.ts";


const settingService = {
  getSettings: async (branchId: any) => {
    try {
      let settings = await Setting.findOne({ branchId }).lean();

      if (!settings) {
        // Create default settings if none exist
        const defaultSettings = new Setting({
          branchId,
          facilities: {
            wifi: false,
            parking: false,
            ac: false,
            outdoor: false
          },
          services: {
            delivery: {
              enabled: true,
              radius: 5,
              fee: 40,
              minimumOrder: 100,
              freeDeliveryOver: 500
            },
            takeaway: {
              enabled: true,
              discount: 0
            },
            dineIn: {
              enabled: true,
              tableReservation: true
            },
            booking: {
              enabled: true,
              advancePayment: false,
              advancePaymentPercentage: 0
            }
          },
          ownerInfo: {
            name: "",
            email: "",
            phone: "",
            whatsapp: ""
          },
          notifications: {
            newOrders: true,
            payouts: true,
            promotions: true,
            orderUpdates: true,
            customerReviews: true,
            systemUpdates: true
          },
          isOnline: true,
          isBusy: false
        });

        settings = await defaultSettings.save();
        return settings;
      }

      return settings;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  updateSettings: async (branchId: any, settingsData: any) => {
    try {
      const settings = await Setting.findOneAndUpdate(
        { branchId },
        settingsData,
        { new: true, upsert: true }
      ).lean();

      return settings;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  toggleOnlineStatus: async (branchId: any) => {
    try {
      // Get current settings
      const settings = await Setting.findOne({ branchId });

      if (!settings) {
        throw new Error("Settings not found");
      }

      // Toggle online status
      settings.isOnline = !settings.isOnline;
      await settings.save();

      // Update branch online status as well
      await Branch.findOneAndUpdate(
        { branchId },
        { isOnline: settings.isOnline }
      );

      return {
        isOnline: settings.isOnline
      };
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  toggleBusyStatus: async (branchId: any) => {
    try {
      // Get current settings
      const settings = await Setting.findOne({ branchId });

      if (!settings) {
        throw new Error("Settings not found");
      }

      // Toggle busy status
      settings.isBusy = !settings.isBusy;
      await settings.save();

      // Update branch busy status as well
      await Branch.findOneAndUpdate(
        { branchId },
        { isBusy: settings.isBusy }
      );

      return {
        isBusy: settings.isBusy
      };
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  updateServiceSettings: async (branchId: any, serviceType: any, serviceSettings: any) => {
    try {
      const validServiceTypes = ['delivery', 'takeaway', 'dineIn', 'booking'];

      if (!validServiceTypes.includes(serviceType)) {
        throw new Error("Invalid service type");
      }

      const updateQuery: Record<string, any> = {};
      updateQuery[`services.${serviceType}`] = serviceSettings;

      const settings = await Setting.findOneAndUpdate(
        { branchId },
        { $set: updateQuery },
        { new: true }
      ).lean();

      if (!settings) {
        throw new Error("Settings not found");
      }

      return (settings as any).services;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  updateFacilities: async (branchId: any, facilities: any) => {
    try {
      const settings = await Setting.findOneAndUpdate(
        { branchId },
        { facilities },
        { new: true }
      ).lean();

      if (!settings) {
        throw new Error("Settings not found");
      }

      return (settings as any).facilities;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  updateOwnerInfo: async (branchId: any, ownerInfo: any) => {
    try {
      const settings = await Setting.findOneAndUpdate(
        { branchId },
        { ownerInfo },
        { new: true }
      ).lean();

      if (!settings) {
        throw new Error("Settings not found");
      }

      return (settings as any).ownerInfo;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  updateNotificationSettings: async (branchId: any, notifications: any) => {
    try {
      const settings = await Setting.findOneAndUpdate(
        { branchId },
        { notifications },
        { new: true }
      ).lean();

      if (!settings) {
        throw new Error("Settings not found");
      }

      return (settings as any).notifications;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }
};

export default settingService;
