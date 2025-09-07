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



const restaurantSchema = new Schema({
    restaurantId: { 
        type: String,
        unique: true, // creates a unique index automatically
        index: true   // optional, but makes intent clearer

    },
    name: {
        type: String,
    },
    address: String,
    phone: Number,

    website: String,
    logo: String,
    coverImage: String,
    description: String,

    isOnline: { 
        type: Boolean, 
        default: true 
    },
    isRushHour: { 
        type: Boolean, 
        default: false 
    },
}, { 
    timestamps: true ,
});

export default mongoose.model('restaurantSchema', restaurantSchema,'restaurantSchema');

