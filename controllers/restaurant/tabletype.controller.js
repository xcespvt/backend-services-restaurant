"use strict";

import tableTypeService from "../../services/tabletypeService.js";
import { v7 as uuidv7 } from 'uuid';

const tableTypeController = {
  addTableType: async (request, reply) => {
    try {
      const { branchId } = request.params;
      const { name } = request.body;

      if (!branchId || !name) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID and name are required"
        });
      }

      const existing = await tableTypeService.getSingleDocument({ restaurantId: branchId, name });
      if (existing) {
        return reply.code(409).send({
          success: false,
          message: "Table type with this name already exists"
        });
      }

      const newTableType = await tableTypeService.addData({ restaurantId: branchId, tableTypeId: uuidv7(), name });

      return reply.code(201).send({
        success: true,
        message: "Table type added successfully",
        data: newTableType
      });
    } catch (error) {
      console.error(error.message);
      return reply.code(500).send({
        success: false,
        message: "Error adding table type",
        error: error.message
      });
    }
  },

  getTableTypes: async (request, reply) => {
    try {
      const { branchId } = request.params;
      if (!branchId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID is required"
        });
      }

      const tableTypes = await tableTypeService.getData({ restaurantId: branchId });

      return reply.code(200).send({
        success: true,
        message: "Table types retrieved successfully",
        data: tableTypes
      });
    } catch (error) {
      console.error(error.message);
      return reply.code(500).send({
        success: false,
        message: "Error retrieving table types",
        error: error.message
      });
    }
  },

  updateTableType: async (request, reply) => {
    try {
      const { branchId, typeId } = request.params;
      const { name } = request.body;

      if (!branchId || !typeId || !name) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID, Type ID, and name are required"
        });
      }

      const updatedType = await tableTypeService.updateData(
        { tableTypeId: typeId, restaurantId: branchId },
        { name }
      );

      if (!updatedType) {
        return reply.code(404).send({
          success: false,
          message: "Table type not found"
        });
      }

      return reply.code(200).send({
        success: true,
        message: "Table type updated successfully",
        data: updatedType
      });
    } catch (error) {
      console.error(error.message);
      return reply.code(500).send({
        success: false,
        message: "Error updating table type",
        error: error.message
      });
    }
  },

  deleteTableType: async (request, reply) => {
    try {
      const { branchId, typeId } = request.params;

      if (!branchId || !typeId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID and Type ID are required"
        });
      }

      const deletedType = await tableTypeService.deleteData({ tableTypeId: typeId, restaurantId: branchId });

      if (!deletedType) {
        return reply.code(404).send({
          success: false,
          message: "Table type not found"
        });
      }

      return reply.code(200).send({
        success: true,
        message: "Table type deleted successfully",
        data: deletedType
      });
    } catch (error) {
      console.error(error.message);
      return reply.code(500).send({
        success: false,
        message: "Error deleting table type",
        error: error.message
      });
    }
  }
};

export default tableTypeController;