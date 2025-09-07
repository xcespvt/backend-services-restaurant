"use strict";

import Table from "../models/tableModel.js";

const tableService = {
  getAllTables: async (branchId) => {
    try {
      const tables = await Table.find({ branchId, isActive: true }).lean();
      return tables;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  addTable: async (branchId, tableData) => {
    try {
      const table = new Table({
        branchId,
        ...tableData,
        status: 'Available'
      });
      
      const savedTable = await table.save();
      return savedTable;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  updateTable: async (branchId, tableId, tableData) => {
    try {
      const table = await Table.findOneAndUpdate(
        { tableId, branchId },
        tableData,
        { new: true }
      ).lean();
      
      if (!table) {
        throw new Error("Table not found");
      }
      
      return table;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  deleteTable: async (branchId, tableId) => {
    try {
      // Soft delete by setting isActive to false
      const table = await Table.findOneAndUpdate(
        { tableId, branchId },
        { isActive: false },
        { new: true }
      );
      
      if (!table) {
        throw new Error("Table not found");
      }
      
      return true;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  updateTableStatus: async (branchId, tableId, status) => {
    try {
      const validStatuses = ['Available', 'Reserved', 'Occupied', 'Unavailable'];
      
      if (!validStatuses.includes(status)) {
        throw new Error("Invalid table status");
      }
      
      const table = await Table.findOneAndUpdate(
        { tableId, branchId },
        { status },
        { new: true }
      ).lean();
      
      if (!table) {
        throw new Error("Table not found");
      }
      
      return {
        id: table.tableId,
        status: table.status
      };
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
};

export default tableService;