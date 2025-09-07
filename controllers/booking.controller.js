"use strict";

import bookingService from "../services/bookingService.js";

const bookingController = {
  getAllBookings: async (req, res) => {
    try {
      const { branchId } = req.params;
      const { date, status } = req.query;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      const bookings = await bookingService.getAllBookings(branchId, date, status);
      
      return res.status(200).json({
        success: true,
        message: "Bookings retrieved successfully",
        data: bookings
      });
    } catch (error) {
      console.error(error.message);
      
      return res.status(500).json({
        success: false,
        message: "Error retrieving bookings",
        error: error.message
      });
    }
  },
  
  addBooking: async (req, res) => {
    try {
      const { branchId } = req.params;
      const bookingData = req.body;
      const { fee } = req.query;
      
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID is required"
        });
      }
      
      // Validate required fields
      if (!bookingData.name || !bookingData.phone || !bookingData.date || !bookingData.time || !bookingData.partySize || !bookingData.tables) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields"
        });
      }
      
      const booking = await bookingService.addBooking(branchId, bookingData, fee);
      
      return res.status(201).json({
        success: true,
        message: "Booking added successfully",
        data: booking
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "One or more tables are not available") {
        return res.status(409).json({
          success: false,
          message: "One or more tables are not available"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error adding booking",
        error: error.message
      });
    }
  },
  
  updateBookingStatus: async (req, res) => {
    try {
      const { branchId, bookingId } = req.params;
      const { status } = req.body;
      
      if (!branchId || !bookingId) {
        return res.status(400).json({
          success: false,
          message: "Branch ID and Booking ID are required"
        });
      }
      
      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Status is required"
        });
      }
      
      const result = await bookingService.updateBookingStatus(branchId, bookingId, status);
      
      return res.status(200).json({
        success: true,
        message: "Booking status updated successfully",
        data: result
      });
    } catch (error) {
      console.error(error.message);
      
      if (error.message === "Booking not found") {
        return res.status(404).json({
          success: false,
          message: "Booking not found"
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Error updating booking status",
        error: error.message
      });
    }
  }
};

export default bookingController;