"use strict";


import bookingService from "../services/bookingService.js";
import { v4 as uuidv4 } from 'uuid';

const bookingController = {
  getAllBookings: async (request, reply) => {
    try {
      const { restaurantId } = request.params;
      console.log(restaurantId);

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

  // addTableSeries: async (request, reply) => {
  //   try {
  //     const { restaurantId } = request.params;
  //     const { prefix , startNumber, endNumber, capacity, type } = request.body;

  //     // Validate required fields
  //     if (!restaurantId) {
  //       return reply.code(400).send({
  //         success: false,
  //         message: "Restaurant ID is required"
  //       });
  //     }

  //     if (startNumber === undefined || endNumber === undefined || !capacity || !type) {
  //       return reply.code(400).send({
  //         success: false,
  //         message: "startNumber, endNumber, capacity, and type are required fields"
  //       });
  //     }

  //     // Convert to numbers and validate
  //     const start = parseInt(startNumber, 10);
  //     const end = parseInt(endNumber, 10);

  //     if (isNaN(start) || isNaN(end) || start <= 0 || end <= 0) {
  //       return reply.code(400).send({
  //         success: false,
  //         message: "startNumber and endNumber must be positive numbers"
  //       });
  //     }

  //     if (start > end) {
  //       return reply.code(400).send({
  //         success: false,
  //         message: "startNumber must be less than or equal to endNumber"
  //       });
  //     }

  //     // Generate table data
  //     const tablesData = [];
  //     for (let i = start; i <= end; i++) {
  //       const name = prefix ? `${prefix}-${i}` : i.toString();

  //       tablesData.push({
  //         restaurantId,
  //         tableId : uuidv4(),
  //         name: name, // Using tableId as name by default
  //         capacity: parseInt(capacity, 10),
  //         type,
  //         status: 'Available'
  //       });
  //     }

  //     // Insert all tables in bulk
  //     const createdTables = await bookingService.addBulkTables(tablesData);

  //     return reply.code(201).send({
  //       success: true,
  //       message: `Successfully created ${createdTables.length} tables`,
  //       data: createdTables
  //     });

  //   } catch (error) {
  //     console.error('Error in addTableSeries:', error);

  //     // Handle duplicate key error
  //     if (error.code === 11000) {
  //       return reply.code(409).send({
  //         success: false,
  //         message: "One or more tables already exist with the same tableId",
  //         error: error.message
  //       });
  //     }

  //     return reply.code(500).send({
  //       success: false,
  //       message: "Error creating table series",
  //       error: error.message
  //     });
  //   }
  // }

addTableSeries: async (request, reply) => {
    try {
      const { restaurantId } = request.params;
      const { prefix, startNumber, endNumber, capacity, type } = request.body;

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
        tableId: uuidv4(),
        name,
        capacity: Number(capacity),
        type,
        status: "Available"
      }));

      console.log(bulkDocs);
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
  }
};

export default bookingController;