'use strict';

import mongoose from 'mongoose';
import { v7 as uuidv7 } from 'uuid';

const Schema = mongoose.Schema;

const deliveryPartnerSchema = new Schema({
  partnerId: {
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
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  vehicleType: {
    type: String,
    enum: ['Bike', 'Scooter', 'Cycle', 'Electric Bike'],
    default: 'Bike'
  },
  vehicleNumber: {
    type: String,
    trim: true
  },
  licenseNumber: {
    type: String,
    trim: true
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  currentLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [0, 0]
    }
  },
  walletBalance: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 5
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

deliveryPartnerSchema.index({ currentLocation: '2dsphere' });

const DeliveryPartner = mongoose.model('DeliveryPartner', deliveryPartnerSchema);

export default DeliveryPartner;

