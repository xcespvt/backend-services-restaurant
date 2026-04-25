'use strict';

import mongoose from 'mongoose';

mongoose.set("strictQuery", true);
const Schema = mongoose.Schema;

const TableTypeSchema = new Schema({
    restaurantId: { type: String, index: true, unique: false },
    tableTypeId: { type: String, index: true, unique: true },
    name: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model('TableType', TableTypeSchema, 'TableTypes');


