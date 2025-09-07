'use strict';

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const Schema = mongoose.Schema;

// Refund Item Schema
const RefundItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  aiHint: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: true
  }
}, { _id: false });

// Photo Schema for Refund
const RefundPhotoSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  hint: {
    type: String,
    default: ''
  }
}, { _id: false });

// Cost Split Schema
const CostSplitSchema = new Schema({
  restaurant: {
    type: Number,
    required: true
  },
  crevings: {
    type: Number,
    required: true
  }
}, { _id: false });

const refundSchema = new Schema({
  refundId: { 
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
  orderId: {
    type: String,
    required: true,
    index: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerAvatar: {
    type: String,
    default: ''
  },
  customerFallback: {
    type: String,
    default: ''
  },
  amount: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Processed'],
    default: 'Pending'
  },
  date: {
    type: String,
    required: true
  },
  items: {
    type: [RefundItemSchema],
    default: []
  },
  photos: {
    type: [RefundPhotoSchema],
    default: []
  },
  orderType: {
    type: String,
    enum: ['Delivery', 'Takeaway', 'Dine-in'],
    required: true
  },
  orderTime: {
    type: String,
    required: true
  },
  costSplit: {
    type: CostSplitSchema,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  processedBy: {
    type: String
  },
  processedAt: {
    type: Date
  }
}, { 
  timestamps: true 
});

const Refund = mongoose.model('Refund', refundSchema);

export default Refund;