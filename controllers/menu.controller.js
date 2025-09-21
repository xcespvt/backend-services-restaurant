"use strict";
import MenuService from "../services/menuService.js";
const menuService = new MenuService("MenuItem");

// Rest of your controller code...

const menuController = {
  getMenuItems: async (req, res) => {
    try {
      const { branchId } = req.params;
      const page = parseInt(req.query.page) || 1; // Default to page 1
      const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
      const skip = (page - 1) * limit;

      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      // Get total count for pagination metadata
      const totalItems = await menuService.getCount({ restaurantId: branchId });
      const totalPages = Math.ceil(totalItems / limit);
      
      const menu = await menuService.getData(
        { restaurantId: branchId },
        { _id: 0 },
        {}, // sort
        skip,
        limit
      );
      
      return res.status(200).json({
        success: true,
        message: "Menu items retrieved successfully",
        data: menu,
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1
        }
      });
    } catch (error) {
      console.error(error.message);
      
      return res.status(500).json({
        success: false,
        message: "Error retrieving menu items",
        error: error.message
      });
    }
  },
  
  addMenuItem: async (req, res) => {
    try {
      const { branchId } = req.params;
      const itemData = req.body;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      // Validate required fields
      if (!itemData.name || !itemData.price || !itemData.category) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields"
        });
      }
      
      const menuItem = await menuService.addData({branchId, itemData});
      
      return res.status(201).json({
        success: true,
        message: "Menu item added successfully",
        data: menuItem
      });
    } catch (error) {
      console.error(error.message);
      
      return res.status(500).json({
        success: false,
        message: "Error adding menu item",
        error: error.message
      });
    }
  },
  
  updateMenuItem: async (req, res) => {
    try {
      const { branchId, itemId } = req.params;
      const itemData = req.body;
      
      if (!branchId || !itemId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID and Item ID are required"
        });
      }
      
      const menuItem = await menuService.updateData({branchId, itemId, itemData});
      
      return res.status(200).json({
        success: true,
        message: "Menu item updated successfully",
        data: menuItem
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Menu item not found") {
        return res.status(404).json({
          success: false,
          message: "Menu item not found"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error updating menu item",
        error: error.message
      });
    }
  },
  
  deleteMenuItem: async (req, res) => {
    try {
      const { branchId, itemId } = req.params;
      
      if (!branchId || !itemId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID and Item ID are required"
        });
      }
      
      await menuService.deleteData({branchId, itemId});
      
      return res.status(200).json({
        success: true,
        message: "Menu item deleted successfully"
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Menu item not found") {
        return res.status(404).json({
          success: false,
          message: "Menu item not found"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error deleting menu item",
        error: error.message
      });
    }
  },
  
  toggleMenuItemAvailability: async (req, res) => {
    try {
      const { branchId, itemId } = req.params;
      
      if (!branchId || !itemId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID and Item ID are required"
        });
      }
      
      const result = await menuService.toggleMenuItemAvailability(branchId, itemId);
      
      return res.status(200).json({
        success: true,
        message: `Menu item is now ${result.available ? 'available' : 'unavailable'}`,
        data: result
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Menu item not found") {
        return res.status(404).json({
          success: false,
          message: "Menu item not found"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error toggling menu item availability",
        error: error.message
      });
    }
  },
  
  addCategory: async (req, res) => {
    try {
      const { branchId } = req.params;
      const { name } = req.body;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Category name is required"
        });
      }
      
      const result = await menuService.addCategory(branchId, name);
      
      return res.status(201).json({
        success: true,
        message: "Category added successfully",
        data: result
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Category already exists") {
        return res.status(409).json({
          success: false,
          message: "Category already exists"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error adding category",
        error: error.message
      });
    }
  }
};

export default menuController;