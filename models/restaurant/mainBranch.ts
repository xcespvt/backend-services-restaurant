'use strict';

import mongoose, { Schema, Document } from 'mongoose';
import { v7 as uuidv7 } from 'uuid';

export interface IMainBranch extends Document {
  branchId: string;
  name: string;
  cuisineType?: string;
  address: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    coordinates?: number[];
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  isOnline: boolean;
  isRushHour: boolean;
  operatingHours: {
    monday: { open: string; close: string };
    tuesday: { open: string; close: string };
    wednesday: { open: string; close: string };
    thursday: { open: string; close: string };
    friday: { open: string; close: string };
    saturday: { open: string; close: string };
    sunday: { open: string; close: string };
  };
  profile: {
    restaurantInfo: {
      name?: string;
      address?: string;
      city?: string;
      pincode?: string;
      phone?: string;
      email?: string;
      ownershipType?: string;
      type?: string;
      fssai?: string;
      gst?: string;
      registrationType?: string;
      legalName?: string;
      cin?: string;
      cuisines?: string;
    };
    ownerInfo: {
      name?: string;
      email?: string;
      phone?: string;
      whatsapp?: string;
    };
    operatingHours: Array<{
      day: string;
      opening: string;
      closing: string;
      open: boolean;
    }>;
    documents: Array<{
      name: string;
      status: string;
      details: string;
      lastUpdated: string;
      fileUrl: string;
    }>;
    bankAccount: {
      accountHolder?: string;
      accountNumber?: string;
      ifsc?: string;
      bankName?: string;
    };
    facilities: string[];
    services: {
      delivery: boolean;
      takeaway: boolean;
      dineIn: boolean;
      booking: boolean;
    };
  };
  floors: Array<{
    floorId: string;
    name: string;
  }>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const mainBranchSchema = new Schema<IMainBranch>({
  branchId: {
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
  cuisineType: {
    type: String,
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere'
    }
  },
  contact: {
    phone: String,
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    website: String
  },
  isOnline: {
    type: Boolean,
    default: true
  },
  isRushHour: {
    type: Boolean,
    default: false
  },
  operatingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  profile: {
    restaurantInfo: {
      name: String,
      address: String,
      city: String,
      pincode: String,
      phone: String,
      email: String,
      ownershipType: String,
      type: { type: String },
      fssai: String,
      gst: String,
      registrationType: String,
      legalName: String,
      cin: String,
      cuisines: String
    },
    ownerInfo: {
      name: String,
      email: String,
      phone: String,
      whatsapp: String
    },
    operatingHours: [{
      day: String,
      opening: String,
      closing: String,
      open: Boolean
    }],
    documents: [{
      name: String,
      status: String,
      details: String,
      lastUpdated: String,
      fileUrl: String
    }],
    bankAccount: {
      accountHolder: String,
      accountNumber: String,
      ifsc: String,
      bankName: String
    },
    facilities: [{ type: String }],
    services: {
      delivery: { type: Boolean, default: false },
      takeaway: { type: Boolean, default: false },
      dineIn: { type: Boolean, default: false },
      booking: { type: Boolean, default: false }
    }
  },
  floors: [{
    floorId: {
      type: String,
      default: () => uuidv7()
    },
    name: {
      type: String,
      required: true
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
mainBranchSchema.index({ "contact.email": 1 });

export default mongoose.model<IMainBranch>('mainBranch', mainBranchSchema, 'mainBranch');
