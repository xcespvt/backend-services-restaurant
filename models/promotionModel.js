import mongoose from "mongoose";

const Promotions = new mongoose.Schema(
  {
    restaurantId: {
      type: String,
      required: true,
      trim: true,
    },

    promotionId: {
      type: String,
      required: true,
      trim: true,
    },

    campaignTitle: {
      type: String,
      required: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      trim: true,
    },

    couponCode: {
      type: String,
      trim: true,
    },

    adBudget: {
      type: Number,
      min: 0,
      required: true,
    },

    estimatedImpressions: {
      type: Number,
      default: 0,
    },

    objective: {
      type: String,
      enum: [
        "Boost orders",
        "Promote new dish/menu",
        "Drive traffic to outlet",
        "Highlight discounts/offers",
        "Brand awareness",
      ],
      required: true,
    },

    offers: [
      {
        offerId: { type: String, required: true },
        offerTitle: { type: String, required: true },
      },
    ],

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    placementOptions: {
      homepageBanner: {
        isEnabled: { type: Boolean, default: false },
        price: { type: Number },
        tags: { type: [String], default: [] },
      },
      searchResultBoost: {
        isEnabled: { type: Boolean, default: false },
        price: { type: Number },
        tags: { type: [String], default: [] },
      },
      categoryHighlight: {
        isEnabled: { type: Boolean, default: false },
        price: { type: Number },
        tags: { type: [String], default: [] },
      },
      offerSection: {
        isEnabled: { type: Boolean, default: false },
        price: { type: Number },
        tags: { type: [String], default: [] },
      },
      pushNotification: {
        isEnabled: { type: Boolean, default: false },
        price: { type: Number },
        tags: { type: [String], default: [] },
      },
      alertNotification: {
        isEnabled: { type: Boolean, default: false },
        price: { type: Number },
        tags: { type: [String], default: [] },
      },
      // You can add future placements here:
      // featuredListing: { isSelected: Boolean, price: Number }
    },

    totalCost: {
      type: Number,
      default: 0, // sum of adBudget + placement add-ons
    },

    service: {
      type: String,
      enum: [
        "DELIVERY",
        "PICKUP",
        "TAKEAWAY",
        "OFFLINE-TAKEAWAY",
        "DINE-IN",
        "BOOKING",
      ],
      default: "ALL",
    },

    customerSegment: {
      type: String,
      enum: ["ALL", "NEW", "RETURNING", "VIP"],
      default: "ALL",
    },
    promotionStatus: {
      type: String,
      enum: ["Active", "Scheduled", "Paused", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: {
      currentTime: () => new Date(Date.now() + 5.5 * 60 * 60 * 1000), // IST timezone
    },
  },
);

export default mongoose.model(
  "promotionSchema",
  Promotions,
  "promotionSchema",
);
