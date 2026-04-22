'use strict';

import mongoose from 'mongoose';
import { v7 as uuidv7 } from 'uuid';

mongoose.set("strictQuery", true);
const Schema = mongoose.Schema;

const TableBookingSchema = new Schema({
    restaurantId: { type: String, index: true, unique: false },
    tableId: { 
        type: String, 
        index: true, 
        unique: true,
        default: () => uuidv7()
    },
    tableTypeId: { type: String, index: true, unique: false },
    name: {
        type: String,
        trim: true,
    },
    capacity: {
        type: Number,
        default: 0,
    },
    type: String,

    status: {
        type: String,
        enum: ['Available', 'Reserved', 'Dine-In', 'Unavailable'],
        default: 'Available'
    },
    isAdvanceBooking: {
        type: Boolean,
        default: false,
    },
    bookingFee: {
        type: Number,
        default: 0,
    },
    section: {
        type: String,
        default: 'Main'
    },
    floor: {
        type: String,
        default: 'Ground Floor'
    }
}, {
    timestamps: true,
});

export default mongoose.model('TableBooking', TableBookingSchema, 'TableBooking');

