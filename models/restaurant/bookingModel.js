'use strict';

import mongoose from 'mongoose';

mongoose.set("strictQuery", true);
const Schema = mongoose.Schema;

const TableBookingSchema = new Schema({
    restaurantId: { type: String, index: true, unique: false },
    tableId: { type: String, index: true, unique: true },
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
}, {
    timestamps: true,
});

export default mongoose.model('TableBooking', TableBookingSchema, 'TableBooking');

