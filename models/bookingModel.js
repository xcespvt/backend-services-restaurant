'use strict';

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const Schema = mongoose.Schema;

// Table Schema for Bookings
const BookingTableSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Available', 'Reserved', 'Occupied', 'Unavailable'],
    default: 'Available'
  }
}, { _id: false });

const bookingSchema = new Schema({
  bookingId: { 
    type: String,
    default: () => uuidv4(),
    unique: true,
    index: true
  },
  branchId: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  partySize: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed', 'No-Show'],
    default: 'Confirmed'
  },
  tables: {
    type: [BookingTableSchema],
    required: true
  },
  fee: {
    type: Number,
    default: 0
  },
  notes: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  }
}, { 
  timestamps: true 
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;