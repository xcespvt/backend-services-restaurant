"use strict";

import Booking from "../models/bookingModel.js";
import Table from "../models/tableModel.js";

const bookingService = {
  getAllBookings: async (branchId, date, status) => {
    try {
      const filter = { branchId };
      
      if (date) {
        filter.date = date;
      }
      
      if (status) {
        filter.status = status;
      }
      
      const bookings = await Booking.find(filter).lean();
      return bookings;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  addBooking: async (branchId, bookingData, fee = 0) => {
    try {
      // Check if tables are available
      const tableIds = bookingData.tables.map(table => table.id);
      const tables = await Table.find({ 
        tableId: { $in: tableIds },
        branchId,
        status: 'Available'
      });
      
      if (tables.length !== tableIds.length) {
        throw new Error("One or more tables are not available");
      }
      
      // Create booking
      const booking = new Booking({
        branchId,
        ...bookingData,
        fee
      });
      
      const savedBooking = await booking.save();
      
      // Update table status to Reserved
      await Table.updateMany(
        { tableId: { $in: tableIds }, branchId },
        { status: 'Reserved' }
      );
      
      return savedBooking;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  updateBookingStatus: async (branchId, bookingId, status) => {
    try {
      const booking = await Booking.findOne({ bookingId, branchId });
      
      if (!booking) {
        throw new Error("Booking not found");
      }
      
      booking.status = status;
      await booking.save();
      
      // If booking is cancelled or completed, update table status back to Available
      if (status === 'Cancelled' || status === 'Completed' || status === 'No-Show') {
        const tableIds = booking.tables.map(table => table.id);
        await Table.updateMany(
          { tableId: { $in: tableIds }, branchId },
          { status: 'Available' }
        );
      }
      
      return {
        id: booking.bookingId,
        status: booking.status
      };
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
};

export default bookingService;