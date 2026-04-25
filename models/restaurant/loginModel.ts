'use strict';

import mongoose, { Schema, Document } from 'mongoose';
import { v7 as uuidv7 } from 'uuid';

export interface ILogin extends Document {
  loginId: string;
  emailId: string;
  passwordHash: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'RESTAURANT' | 'MANAGER' | 'STAFF' | 'CASHIER' | 'CHEF' | 'WAITER' | 'USER' | 'DELIVERY_PARTNER' | 'DELIVERY_ADMIN';
  referenceId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const loginSchema = new Schema<ILogin>({
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
    enum: ['SUPER_ADMIN', 'ADMIN', 'RESTAURANT', 'MANAGER', 'STAFF', 'CASHIER', 'CHEF', 'WAITER', 'USER', 'DELIVERY_PARTNER', 'DELIVERY_ADMIN'],
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

const Login = mongoose.model<ILogin>('Login', loginSchema, 'login');

export default Login;

