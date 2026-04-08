'use strict';

import mongoose from 'mongoose';
import { v7 as uuidv7 } from 'uuid';

const Schema = mongoose.Schema;

const loginSchema = new Schema({
  loginId: {
    type: String,
    default: () => uuidv7(),
    unique: true,
    index: true
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['SUPER_ADMIN', 'ADMIN', 'RESTAURANT', 'MANAGER', 'STAFF', 'CASHIER', 'CHEF', 'WAITER', 'USER'],
    required: true
  },
  referenceId: {
    type: String, // ID of the related entity (branchId, employeeId, userId etc.)
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Login = mongoose.model('Login', loginSchema, 'login');

export default Login;
