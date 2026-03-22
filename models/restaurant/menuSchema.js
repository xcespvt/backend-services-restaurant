'use strict';

import mongoose from 'mongoose';

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
    itemId: { type: String , index: true,unique: true},
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

