"use strict";

import Setting from "../models/settingModel.js";
import Branch from "../models/branchModel.js";

const settingService = {
  getSettings: async (branchId) => {
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
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  updateSettings: async (branchId, settingsData) => {
    try {
      const settings = await Setting.findOneAndUpdate(
        { branchId },
        settingsData,
        { new: true, upsert: true }
      ).lean();
      
      return settings;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  toggleOnlineStatus: async (branchId) => {
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
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  toggleBusyStatus: async (branchId) => {
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
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  updateServiceSettings: async (branchId, serviceType, serviceSettings) => {
    try {
      const validServiceTypes = ['delivery', 'takeaway', 'dineIn', 'booking'];
      
      if (!validServiceTypes.includes(serviceType)) {
        throw new Error("Invalid service type");
      }
      
      const updateQuery = {};
      updateQuery[`services.${serviceType}`] = serviceSettings;
      
      const settings = await Setting.findOneAndUpdate(
        { branchId },
        { $set: updateQuery },
        { new: true }
      ).lean();
      
      if (!settings) {
        throw new Error("Settings not found");
      }
      
      return settings.services;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  updateFacilities: async (branchId, facilities) => {
    try {
      const settings = await Setting.findOneAndUpdate(
        { branchId },
        { facilities },
        { new: true }
      ).lean();
      
      if (!settings) {
        throw new Error("Settings not found");
      }
      
      return settings.facilities;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  updateOwnerInfo: async (branchId, ownerInfo) => {
    try {
      const settings = await Setting.findOneAndUpdate(
        { branchId },
        { ownerInfo },
        { new: true }
      ).lean();
      
      if (!settings) {
        throw new Error("Settings not found");
      }
      
      return settings.ownerInfo;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  updateNotificationSettings: async (branchId, notifications) => {
    try {
      const settings = await Setting.findOneAndUpdate(
        { branchId },
        { notifications },
        { new: true }
      ).lean();
      
      if (!settings) {
        throw new Error("Settings not found");
      }
      
      return settings.notifications;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
};

export default settingService;