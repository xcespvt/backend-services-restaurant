'use strict';

import mongoose from 'mongoose';
import { v7 as uuidv7 } from 'uuid';

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  categoryId: { 
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
  name: {
    type: String,
    required: true,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true 
});

const Category = mongoose.model('Category', categorySchema);

export default Category;