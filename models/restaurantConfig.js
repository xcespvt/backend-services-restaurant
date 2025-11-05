'use strict';

import mongoose from 'mongoose';

mongoose.set("strictQuery", false);
const Schema = mongoose.Schema;



const restaurantSchema = new Schema({
    branchId: { 
        type: String,
        index: true   // optional, but makes intent clearer
    },
    restaurantId: { 
        type: String,
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

