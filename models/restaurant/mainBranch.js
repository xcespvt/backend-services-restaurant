'use strict';

import mongoose from 'mongoose';
import { v7 as uuidv7 } from 'uuid';

const Schema = mongoose.Schema;

const mainBranchSchema = new Schema({
  branchId: {
    type: String,
    default: () => uuidv7(),
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
  isOnline: {
    type: Boolean,
    default: true
  },
  isRushHour: {
    type: Boolean,
    default: false
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
  profile: {
    restaurantInfo: {
      name: String,
      address: String,
      city: String,
      pincode: String,
      phone: String,
      email: String,
      ownershipType: String,
      type: { type: String }, // Mongoose interprets `type: String` as the type of an object. Changing to `{ type: String }`
      fssai: String,
      gst: String,
      registrationType: String,
      legalName: String,
      cin: String,
      cuisines: String
    },
    ownerInfo: {
      name: String,
      email: String,
      phone: String,
      whatsapp: String
    },
    operatingHours: [{
      day: String,
      opening: String,
      closing: String,
      open: Boolean
    }],
    documents: [{
      name: String,
      status: String,
      details: String,
      lastUpdated: String,
      fileUrl: String
    }],
    bankAccount: {
      accountHolder: String,
      accountNumber: String,
      ifsc: String,
      bankName: String
    },
    facilities: [{ type: String }],
    services: {
      delivery: { type: Boolean, default: false },
      takeaway: { type: Boolean, default: false },
      dineIn: { type: Boolean, default: false },
      booking: { type: Boolean, default: false }
    }
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

export default mongoose.model('mainBranch', mainBranchSchema, 'mainBranch');