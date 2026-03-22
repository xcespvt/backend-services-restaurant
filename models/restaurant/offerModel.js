import mongoose from "mongoose";

const Offer = new mongoose.Schema(
  {
    restaurantId:{
      type : "string",
      required : true
    },
    couponCode:{
      type : "string",
      required : true
    },
    offerId:{
      type : "string",
      required : true
    },
    offerTitle: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    offerType: {
      type: String,
      enum: [
        "Percentage Discount",
        "Flat Discount",
        "Buy-One-Get-One (BOGO)",
        "Free Item",
        "Happy Hour",
      ],
      required: true,
    },
    discountPercentage: {
      type: Number,
      min: 0,
      max: 100,
      required: function () {
        return this.offerType === "Percentage Discount";
      },
    },
    discountAmount: {
      type: Number
    },
    freeItem: {
      type: String, // could be ObjectId reference to menu item in real app
    },
    bogoItems: {
      type: String, // e.g., "Buy 1 Pizza Get 1 Free" (could also link to items)
    },
    happyHourTiming: {
      startTime: { type: String }, // e.g., "16:00"
      endTime: { type: String },   // e.g., "18:00"
    },
    minimumOrder: {
      type: Number,
      default: 0,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    offerStatus : {
      type : String,
      enum : ["Active","Scheduled","Paused","Inactive"],
      default : "Active"
    }
  },
  { timestamps: { currentTime: () => new Date(Date.now() + (5.5 * 60 * 60 * 1000)) }
  }
);

export default mongoose.model('offersSchema',Offer, "offerSchema");
