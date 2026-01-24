'use strict';

import mongoose from 'mongoose';
import { v7 as uuidv7 } from 'uuid';

const Schema = mongoose.Schema;

// Order Item Schema
const OrderItemSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String
  },
  portionName: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: ''
  }
}, { _id: false });

// Customer Details Schema
const CustomerDetailsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: ''
  }
}, { _id: false });

// Payment Schema
const PaymentSchema = new Schema({
  method: {
    type: String,
    enum: ['Cash', 'Online', 'Card', 'UPI'],
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  transactionId: {
    type: String,
    default: ''
  }
}, { _id: false });

// Offer Schema
const OfferSchema = new Schema({
  code: {
    type: String
  },
  type: {
    type: String,
    enum: ['Percentage', 'Fixed']
  },
  value: {
    type: Number
  }
}, { _id: false });

// Delivery Partner Schema
const DeliveryPartnerSchema = new Schema({
  name: {
    type: String
  },
  avatar: {
    type: String,
    default: ''
  },
  avatarFallback: {
    type: String,
    default: ''
  },
  rating: {
    type: Number
  },
  phone: {
    type: String,
    default: ''
  }
}, { _id: false });

const orderSchema = new Schema({
  orderId: {
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
  customer: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['New', 'Accepted', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered', 'Completed', 'Cancelled'],
    default: 'New'
  },
  type: {
    type: String,
    enum: ['Delivery', 'Takeaway', 'Dine-in'],
    required: true
  },
  items: {
    type: [OrderItemSchema],
    required: true
  },
  prepTime: {
    type: String,
    default: '20 mins'
  },
  subtotal: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    default: 0
  },
  deliveryFee: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  source: {
    type: String,
    enum: ['Online', 'Offline'],
    default: 'Online'
  },
  customerDetails: {
    type: CustomerDetailsSchema,
    required: true
  },
  payment: {
    type: PaymentSchema,
    required: true
  },
  offer: {
    type: OfferSchema
  },
  deliveryPartner: {
    type: DeliveryPartnerSchema
  },
  pickupOtp: {
    type: String
  },
  tableNumber: {
    type: String
  },
  commission: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;