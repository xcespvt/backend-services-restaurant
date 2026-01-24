'use strict';

import mongoose from 'mongoose';
import { v7 as uuidv7 } from 'uuid';

const Schema = mongoose.Schema;

const branchSchema = new Schema({
  branchId: { 
    type: String,
    default: () => uuidv7(),
    unique: true,
    index: true
  },
  userId: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  pincode: {
    type: String,
    required: true,
    trim: true
  },
  manager: {
    type: String,
    trim: true
  },
  managerPhone: {
    type: String,
    trim: true
  },
  hours: {
    type: String,
    trim: true
  },
  gst: {
    type: String,
    trim: true
  },
  fssai: {
    type: String,
    trim: true
  },
  ordersToday: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Pending'],
    default: 'Active'
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  isBusy: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true 
});

const Branch = mongoose.model('Branch', branchSchema);

export default Branch;