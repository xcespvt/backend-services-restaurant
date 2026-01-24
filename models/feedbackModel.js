'use strict';

import mongoose from 'mongoose';
import { v7 as uuidv7 } from 'uuid';

const Schema = mongoose.Schema;

// Customer Schema for Feedback
const FeedbackCustomerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: ''
  },
  fallback: {
    type: String,
    default: ''
  },
  orderCount: {
    type: Number,
    default: 1
  }
}, { _id: false });

// Photo Schema for Feedback
const FeedbackPhotoSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  hint: {
    type: String,
    default: ''
  }
}, { _id: false });

const feedbackSchema = new Schema({
  feedbackId: { 
    type: String,
    default: () => uuidv7(),
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
  customer: {
    type: FeedbackCustomerSchema,
    required: true
  },
  orderType: {
    type: String,
    enum: ['Delivery', 'Takeaway', 'Dine-in'],
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    required: true
  },
  items: {
    type: [String],
    default: []
  },
  photos: {
    type: [FeedbackPhotoSchema],
    default: []
  },
  replied: {
    type: Boolean,
    default: false
  },
  reply: {
    type: String,
    default: ''
  },
  replyDate: {
    type: Date
  }
}, { 
  timestamps: true 
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;