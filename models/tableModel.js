'use strict';

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const Schema = mongoose.Schema;

const tableSchema = new Schema({
  tableId: { 
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
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    enum: ['Available', 'Reserved', 'Occupied', 'Unavailable'],
    default: 'Available'
  },
  section: {
    type: String,
    default: 'Main'
  },
  floor: {
    type: String,
    default: 'Ground'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true 
});

const Table = mongoose.model('Table', tableSchema);

export default Table;