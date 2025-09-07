'use strict';

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const Schema = mongoose.Schema;

// Portion Option Schema
const PortionOptionSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  }
}, { _id: false });

const menuItemSchema = new Schema({
  itemId: { 
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
  description: {
    type: String,
    default: '',
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  aiHint: {
    type: String,
    default: ''
  },
  available: {
    type: Boolean,
    default: true
  },
  dietaryType: {
    type: String,
    enum: ['Veg', 'Non-Veg', 'Vegan', 'Contains Egg'],
    default: 'Veg'
  },
  portionOptions: {
    type: [PortionOptionSchema],
    default: []
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true 
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;