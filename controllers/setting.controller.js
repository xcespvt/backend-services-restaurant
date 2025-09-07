"use strict";

import settingService from "../services/settingService.js";

const settingController = {
  getSettings: async (req, res) => {
    try {
      const { branchId } = req.params;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      const settings = await settingService.getSettings(branchId);
      
      return res.status(200).json({
        success: true,
        message: "Settings retrieved successfully",
        data: settings
      });
    } catch (error) {
      console.error(error.message);
      
      return res.status(500).json({
        success: false,
        message: "Error retrieving settings",
        error: error.message
      });
    }
  },
  
  updateSettings: async (req, res) => {
    try {
      const { branchId } = req.params;
      const settingsData = req.body;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      const settings = await settingService.updateSettings(branchId, settingsData);
      
      return res.status(200).json({
        success: true,
        message: "Settings updated successfully",
        data: settings
      });
    } catch (error) {
      console.error(error.message);
      
      return res.status(500).json({
        success: false,
        message: "Error updating settings",
        error: error.message
      });
    }
  },
  
  toggleOnlineStatus: async (req, res) => {
    try {
      const { branchId } = req.params;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      const result = await settingService.toggleOnlineStatus(branchId);
      
      return res.status(200).json({
        success: true,
        message: `Restaurant is now ${result.isOnline ? 'online' : 'offline'}`,
        data: result
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Settings not found") {
        return res.status(404).json({
          success: false,
          message: "Settings not found"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error toggling online status",
        error: error.message
      });
    }
  },
  
  toggleBusyStatus: async (req, res) => {
    try {
      const { branchId } = req.params;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      const result = await settingService.toggleBusyStatus(branchId);
      
      return res.status(200).json({
        success: true,
        message: `Restaurant is now ${result.isBusy ? 'busy' : 'not busy'}`,
        data: result
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Settings not found") {
        return res.status(404).json({
          success: false,
          message: "Settings not found"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error toggling busy status",
        error: error.message
      });
    }
  },
  
  updateServiceSettings: async (req, res) => {
    try {
      const { branchId, serviceType } = req.params;
      const serviceSettings = req.body;
      
      if (!branchId || !serviceType) {
        return res.status(400).json({
          success: false,
          message: "Branch ID and service type are required"
        });
      }
      
      const services = await settingService.updateServiceSettings(branchId, serviceType, serviceSettings);
      
      return res.status(200).json({
        success: true,
        message: "Service settings updated successfully",
        data: services
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Settings not found") {
        return res.status(404).json({
          success: false,
          message: "Settings not found"
        });
      }
      
      if (error.message === "Invalid service type") {
        return res.status(400).json({
          success: false,
          message: "Invalid service type"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error updating service settings",
        error: error.message
      });
    }
  },
  
  updateFacilities: async (req, res) => {
    try {
      const { branchId } = req.params;
      const facilities = req.body;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      const result = await settingService.updateFacilities(branchId, facilities);
      
      return res.status(200).json({
        success: true,
        message: "Facilities updated successfully",
        data: result
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Settings not found") {
        return res.status(404).json({
          success: false,
          message: "Settings not found"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error updating facilities",
        error: error.message
      });
    }
  },
  
  updateOwnerInfo: async (req, res) => {
    try {
      const { branchId } = req.params;
      const ownerInfo = req.body;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      const result = await settingService.updateOwnerInfo(branchId, ownerInfo);
      
      return res.status(200).json({
        success: true,
        message: "Owner information updated successfully",
        data: result
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Settings not found") {
        return res.status(404).json({
          success: false,
          message: "Settings not found"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error updating owner information",
        error: error.message
      });
    }
  },
  
  updateNotificationSettings: async (req, res) => {
    try {
      const { branchId } = req.params;
      const notifications = req.body;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      const result = await settingService.updateNotificationSettings(branchId, notifications);
      
      return res.status(200).json({
        success: true,
        message: "Notification settings updated successfully",
        data: result
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Settings not found") {
        return res.status(404).json({
          success: false,
          message: "Settings not found"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error updating notification settings",
        error: error.message
      });
    }
  }
};

export default settingController;