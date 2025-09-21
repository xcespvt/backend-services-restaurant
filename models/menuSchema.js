'use strict';

import { connectDB } from '../config/db.js';
import mongoose from 'mongoose';

// Database connection setup
try {
    const mongoConnect = await connectDB();
    if (!mongoConnect) {
        console.log("Mongo connection error");
        process.exit(0);
    }
} catch (e) {
    console.error("Database connection error:", e);
    process.exit(0);
}

mongoose.set("strictQuery", false);
const Schema = mongoose.Schema;



// Pricing Option Schema
const PricingOptionSchema = new Schema({
    label: {
        type: String,
    },
    price: {
        type: Number,
    },
    default: { 
        type: Boolean, 
        default: false 
    }
}, { _id: false });

const MenuItemSchema = new Schema({
    restaurantId: { type: String , index: true,unique: false},
    name: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        enum: ['item', 'beverage', 'combo', 'sauce'],
      
    },
    category: {
        type: String,
    },
    images: {
        type: [String],
      
    },
    available: {
        type: Boolean,
        default: true,
    },
    pricing_unit: {
        type: String,
        enum: ['quantity', 'size', 'weight', 'volume'],
    },
    pricing_options: {
        type: [PricingOptionSchema],
    },
    portions: {
        type: [String], // store multiple portion labels
        default: []
    }
}, { 
    timestamps: true,
});

export default mongoose.model('menuSchema', MenuItemSchema,'menuSchema');

