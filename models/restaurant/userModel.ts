'use strict';

import mongoose, { Schema, Document } from 'mongoose';
import { v7 as uuidv7 } from 'uuid';

export interface IUser extends Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  password?: string;
  subscriptionPlan: 'Free' | 'Basic' | 'Premium' | 'Enterprise';
  subscriptionExpiry?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  userId: {
    type: String,
    default: () => uuidv7(),
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  whatsapp: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  subscriptionPlan: {
    type: String,
    enum: ['Free', 'Basic', 'Premium', 'Enterprise'],
    default: 'Free'
  },
  subscriptionExpiry: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
