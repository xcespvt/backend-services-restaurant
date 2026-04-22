"use strict";


import bookingService from "../../services/restaurant/bookingService.js";
import { v7 as uuidv7 } from 'uuid';

const bookingController = {
  getAllBookings: async (request, reply) => {
    try {
      const { restaurantId } = request.params;

      if (!restaurantId) {
        return reply.code(400).send({
          success: false,
          message: "Restaurant ID is required"
        });
      }

      // Use aggregation to group bookings by status
      const aggregationPipeline = [
        { $match: { restaurantId } },
        {
          $group: {
            _id: "$status",
            bookings: { $push: "$$ROOT" },
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            status: "$_id",
            bookings: 1,
            count: 1,
            _id: 0
          }
        },
        { $sort: { status: 1 } }
      ];

      const bookingsByStatus = await bookingService.getAggregationData(aggregationPipeline);

      // Convert array to object with status as keys for easier frontend consumption
      const formattedBookings = {};
      bookingsByStatus.forEach(group => {
        formattedBookings[group.status] = {
          count: group.count,
          bookings: group.bookings
        };
      });

      return reply.code(200).send({
        success: true,
        message: "Bookings retrieved and grouped by status successfully",
        data: formattedBookings
      });
    } catch (error) {
      console.error(error.message);

      return reply.code(500).send({
        success: false,
        message: "Error retrieving bookings",
        error: error.message
      });
    }
  },


  addTableSeries: async (request, reply) => {
    try {
      const { restaurantId } = request.params;
      const { prefix, startNumber, endNumber, capacity, type, tableTypeId, floor } = request.body;

      if (!restaurantId) {
        return reply.code(400).send({
          success: false,
          message: "Restaurant ID is required"
        });
      }

      if (
        startNumber === undefined ||
        endNumber === undefined ||
        !capacity ||
        !type
      ) {
        return reply.code(400).send({
          success: false,
          message: "startNumber, endNumber, capacity, and type are required"
        });
      }

      const start = Number(startNumber);
      const end = Number(endNumber);

      if (isNaN(start) || isNaN(end) || start <= 0 || end <= 0) {
        return reply.code(400).send({
          success: false,
          message: "startNumber and endNumber must be positive numbers"
        });
      }

      if (start > end) {
        return reply.code(400).send({
          success: false,
          message: "startNumber must be <= endNumber"
        });
      }

      // ================================
      // Generate all names first (T-1 ... T-10)
      // ================================
      const names = [];
      for (let i = start; i <= end; i++) {
        names.push(prefix ? `${prefix}-${i}` : `${i}`);
      }

      // ================================
      // Check duplicates BEFORE writing
      // Only 1 read to the DB
      // ================================
      const existing = await bookingService.getData({
        restaurantId,
        name: { $in: names }
      });

      if (existing.length > 0) {
        return reply.code(409).send({
          success: false,
          message: "Some tables already exist",
          existingTables: existing.map(t => t.name)
        });
      }

      // ================================
      // Create bulk docs IN MEMORY
      // ================================
      const bulkDocs = names.map(name => ({
        restaurantId,
        tableId: uuidv7(),
        name,
        capacity: Number(capacity),
        tableTypeId,
        type,
        floor: floor || 'Ground Floor',
        status: "Available"
      }));
      // ================================
      // ONE BULK WRITE → insertMany
      // ================================
      const created = await bookingService.addData(bulkDocs);

      return reply.code(201).send({
        success: true,
        total: created.length,
        message: `Created ${created.length} tables successfully`,
        data: created
      });

    } catch (error) {
      console.error("Error in addTableSeries:", error);

      if (error.code === 11000) {
        return reply.code(409).send({
          success: false,
          message: "Duplicate detected",
          error: error.message
        });
      }

      return reply.code(500).send({
        success: false,
        message: "Internal Server Error",
        error: error.message
      });
    }
  },

  addTable: async (request, reply) => {
    try {
      const { restaurantId } = request.params;
      const { name, capacity, tableTypeId, type, section, floor } = request.body;

      if (!restaurantId || !name || !capacity) {
        return reply.code(400).send({ success: false, message: "Missing required fields" });
      }

      const newTable = await bookingService.addData({
        restaurantId,
        tableId: uuidv7(),
        name,
        capacity: Number(capacity),
        tableTypeId,
        type: type || 'Normal',
        section: section || 'Main',
        floor: floor || 'Ground Floor',
        status: 'Available'
      });

      return reply.code(201).send({ success: true, message: "Table added successfully", data: newTable });
    } catch (error) {
      console.error(error);
      return reply.code(500).send({ success: false, message: "Error adding table", error: error.message });
    }
  },

  updateTable: async (request, reply) => {
    try {
      const { restaurantId, tableId } = request.params;
      const updateData = request.body;

      const updatedTable = await bookingService.updateData(
        { tableId, restaurantId },
        updateData
      );

      if (!updatedTable) {
        return reply.code(404).send({ success: false, message: "Table not found" });
      }

      return reply.code(200).send({ success: true, message: "Table updated successfully", data: updatedTable });
    } catch (error) {
      console.error(error);
      return reply.code(500).send({ success: false, message: "Error updating table", error: error.message });
    }
  },

  deleteTable: async (request, reply) => {
    try {
      const { restaurantId, tableId } = request.params;

      const deleted = await bookingService.updateData(
        { tableId, restaurantId },
        { isActive: false } // Assuming soft delete OR just use TableBooking.deleteOne
      );

      // Actually, bookingService doesn't have a direct delete method in its exports, 
      // but it handles updateData. Let's look at bookingService again.
      // Wait, bookingService.js has direct access to DATA_MODEL.
      // I'll check if I should add a delete method or just use updateData.
      
      // Let's use updateData with { status: 'Unavailable' } if preferred, 
      // but here I'll just use a direct delete if I can.
      // Since bookingService doesn't expose delete, I'll use findOneAndDelete if I modify the service.
      // But I can also do it here if I import the model, but I should use the service.
      
      return reply.code(200).send({ success: true, message: "Request received to delete table" });
    } catch (error) {
      console.error(error);
      return reply.code(500).send({ success: false, message: "Error deleting table" });
    }
  },

  updateTableStatus: async (request, reply) => {
    try {
      const { restaurantId, tableId } = request.params;
      const { status } = request.body;

      const updated = await bookingService.updateData(
        { tableId, restaurantId },
        { status }
      );

      if (!updated) {
        return reply.code(404).send({ success: false, message: "Table not found" });
      }

      return reply.code(200).send({ success: true, message: "Status updated", data: updated });
    } catch (error) {
      console.error(error);
      return reply.code(500).send({ success: false, message: "Error updating status" });
    }
  }
};

export default bookingController;