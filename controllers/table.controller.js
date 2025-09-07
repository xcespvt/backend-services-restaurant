"use strict";

import tableService from "../services/tableService.js";

const tableController = {
  getAllTables: async (req, res) => {
    try {
      const { branchId } = req.params;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      const tables = await tableService.getAllTables(branchId);
      
      return res.status(200).json({
        success: true,
        message: "Tables retrieved successfully",
        data: tables
      });
    } catch (error) {
      console.error(error.message);
      
      return res.status(500).json({
        success: false,
        message: "Error retrieving tables",
        error: error.message
      });
    }
  },
  
  addTable: async (req, res) => {
    try {
      const { branchId } = req.params;
      const tableData = req.body;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      // Validate required fields
      if (!tableData.name || !tableData.capacity) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields"
        });
      }
      
      const table = await tableService.addTable(branchId, tableData);
      
      return res.status(201).json({
        success: true,
        message: "Table added successfully",
        data: table
      });
    } catch (error) {
      console.error(error.message);
      
      return res.status(500).json({
        success: false,
        message: "Error adding table",
        error: error.message
      });
    }
  },
  
  updateTable: async (req, res) => {
    try {
      const { branchId, tableId } = req.params;
      const tableData = req.body;
      
      if (!branchId || !tableId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID and Table ID are required"
        });
      }
      
      const table = await tableService.updateTable(branchId, tableId, tableData);
      
      return res.status(200).json({
        success: true,
        message: "Table updated successfully",
        data: table
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Table not found") {
        return res.status(404).json({
          success: false,
          message: "Table not found"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error updating table",
        error: error.message
      });
    }
  },
  
  deleteTable: async (req, res) => {
    try {
      const { branchId, tableId } = req.params;
      
      if (!branchId || !tableId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID and Table ID are required"
        });
      }
      
      await tableService.deleteTable(branchId, tableId);
      
      return res.status(200).json({
        success: true,
        message: "Table deleted successfully"
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Table not found") {
        return res.status(404).json({
          success: false,
          message: "Table not found"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error deleting table",
        error: error.message
      });
    }
  },
  
  updateTableStatus: async (req, res) => {
    try {
      const { branchId, tableId } = req.params;
      const { status } = req.body;
      
      if (!branchId || !tableId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID and Table ID are required"
        });
      }
      
      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Status is required"
        });
      }
      
      const result = await tableService.updateTableStatus(branchId, tableId, status);
      
      return res.status(200).json({
        success: true,
        message: "Table status updated successfully",
        data: result
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Table not found") {
        return res.status(404).json({
          success: false,
          message: "Table not found"
        });
      }
      
      if (error.message === "Invalid table status") {
        return res.status(400).json({
          success: false,
          message: "Invalid table status"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error updating table status",
        error: error.message
      });
    }
  }
};

export default tableController;