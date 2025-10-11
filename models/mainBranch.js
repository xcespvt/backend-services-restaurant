'use strict';

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const Schema = mongoose.Schema;

const mainBranchSchema = new Schema({
  branchId: {
    type: String,
    default: () => uuidv4(),
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  cuisineType: {
    type: String,
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere'
    }
  },
  contact: {
    phone: String,
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    website: String
  },
  operatingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // This will automatically handle createdAt and updatedAt
});

export default mongoose.model('mainBranch', mainBranchSchema,'mainBranch');