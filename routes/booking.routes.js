"use strict";

import express from "express";
import bookingController from "../controllers/booking.controller.js";

const router = express.Router();

// Get all bookings for a branch
router.get("/:branchId", bookingController.getAllBookings);

// Add a new booking
router.post("/:branchId", bookingController.addBooking);

// Update booking status
router.patch("/:branchId/:bookingId/status", bookingController.updateBookingStatus);

export default router;