'use strict';

import mongoose from 'mongoose';
import { v7 as uuidv7 } from 'uuid';

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  employeeId: { 
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
  role: {
    type: String,
    enum: ['Manager', 'Staff', 'Cashier', 'Chef', 'Waiter'],
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true 
});

// Compound Indexes
employeeSchema.index({ branchId: 1, role: 1 });
employeeSchema.index({ branchId: 1, isActive: 1 });
employeeSchema.index({ branchId: 1, employeeId: 1 });

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
