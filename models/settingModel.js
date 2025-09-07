'use strict';

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const Schema = mongoose.Schema;

// Service Settings Schema
const ServiceSettingsSchema = new Schema({
  delivery: {
    type: Boolean,
    default: true
  },
  takeaway: {
    type: Boolean,
    default: true
  },
  dineIn: {
    type: Boolean,
    default: true
  },
  booking: {
    type: Boolean,
    default: true
  }
}, { _id: false });

// Owner Info Schema
const OwnerInfoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  whatsapp: {
    type: String
  }
}, { _id: false });

// Notification Settings Schema
const NotificationSettingsSchema = new Schema({
  newOrders: {
    type: Boolean,
    default: true
  },
  payouts: {
    type: Boolean,
    default: true
  },
  promotions: {
    type: Boolean,
    default: true
  },
  orderUpdates: {
    type: Boolean,
    default: true
  },
  customerReviews: {
    type: Boolean,
    default: true
  },
  systemUpdates: {
    type: Boolean,
    default: true
  }
}, { _id: false });

const settingSchema = new Schema({
  settingId: { 
    type: String,
    default: () => uuidv4(),
    unique: true,
    index: true
  },
  branchId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  serviceSettings: {
    type: ServiceSettingsSchema,
    default: () => ({})
  },
  ownerInfo: {
    type: OwnerInfoSchema,
    required: true
  },
  notificationSettings: {
    type: NotificationSettingsSchema,
    default: () => ({})
  },
  facilities: {
    type: [String],
    default: []
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

const Setting = mongoose.model('Setting', settingSchema);

export default Setting;