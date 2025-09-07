"use strict";

import MenuItem from "../models/menuItemModel.js";
import Category from "../models/categoryModel.js";

const menuService = {
  getMenuItems: async (branchId) => {
    try {
      const items = await MenuItem.find({ branchId, isActive: true }).lean();
      const categories = await Category.find({ branchId, isActive: true }).lean();
      
      return {
        items,
        categories: categories.map(category => category.name)
      };
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  addMenuItem: async (branchId, itemData) => {
    try {
      const menuItem = new MenuItem({
        branchId,
        ...itemData
      });
      
      const savedItem = await menuItem.save();
      return savedItem;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  updateMenuItem: async (branchId, itemId, itemData) => {
    try {
      const menuItem = await MenuItem.findOneAndUpdate(
        { itemId, branchId },
        itemData,
        { new: true }
      ).lean();
      
      if (!menuItem) {
        throw new Error("Menu item not found");
      }
      
      return menuItem;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  deleteMenuItem: async (branchId, itemId) => {
    try {
      // Soft delete by setting isActive to false
      const menuItem = await MenuItem.findOneAndUpdate(
        { itemId, branchId },
        { isActive: false },
        { new: true }
      );
      
      if (!menuItem) {
        throw new Error("Menu item not found");
      }
      
      return true;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  toggleMenuItemAvailability: async (branchId, itemId) => {
    try {
      const menuItem = await MenuItem.findOne({ itemId, branchId });
      
      if (!menuItem) {
        throw new Error("Menu item not found");
      }
      
      menuItem.available = !menuItem.available;
      await menuItem.save();
      
      return {
        id: menuItem.itemId,
        available: menuItem.available
      };
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  addCategory: async (branchId, name) => {
    try {
      // Check if category already exists
      const existingCategory = await Category.findOne({ branchId, name });
      
      if (existingCategory) {
        throw new Error("Category already exists");
      }
      
      const category = new Category({
        branchId,
        name
      });
      
      await category.save();
      
      // Return all categories for this branch
      const categories = await Category.find({ branchId, isActive: true }).lean();
      
      return {
        categories: categories.map(category => category.name)
      };
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
};

export default menuService;