"use strict";
import OfferService from "../services/offerService.js";

import { v7 as uuidv7 } from "uuid";
// Rest of your controller code...

const offerController = {
    getOffers: async (request, reply) => {
        try {
            const { restaurantId } = request.params;
            const page = Number(request.query.page); // Default to page 1
            const limit = Number(request.query.limit); // Default to 10 items per page
            const skip = (page - 1) * limit;

            if (page < 1 || limit < 1 || skip < 0 || page > limit || limit > 10 || !restaurantId || !page || !limit) {
                return reply.code(400).send({
                    success: false,
                    message: "Invalid requestuest"
                });
            }

            // Get total count for pagination metadata
            const totalItems = await OfferService.getCountDocument({ restaurantId: restaurantId });
            const totalPages = Math.ceil(totalItems / limit);

            const offers = await OfferService.getData(
                { restaurantId: restaurantId },  // filter
                { _id: 0 },                   // select
                {},                           // sort
                skip,                            // skip
                limit                             // limit
            );


            return reply.code(200).send({
                success: true,
                message: "Offers retrieved successfully",
                data: offers,
                pagination: {
                    currentPage: page,
                    itemsPerPage: limit,
                    totalItems,
                    totalPages,
                    hasNextPage: page < totalPages,
                    hasPreviousPage: page > 1
                }
            });
        } catch (error) {
            console.error(error.message);

            return reply.code(500).send({
                success: false,
                message: "Error retrieving menu items",
                error: error.message
            });
        }
    },

    addOffers: async (request, reply) => {
        try {
            const {
                restaurantId,
                couponCode,
                offerTitle,
                description,
                offerType,
                discountPercentage,
                discountAmount,
                freeItem,
                bogoItems,
                happyHourTiming,
                minimumOrder,
                validUntil,
                isActive
            } = request.body;

            // Validate restaurantId
            if (!restaurantId) {
                return reply.code(400).send({
                    success: false,
                    message: "Restaurant ID is required",
                });
            }

            // Validate offerType
            if (!offerType) {
                return reply.code(400).send({
                    success: false,
                    message: "Offer type is required",
                });
            }

            // Conditional validations based on offerType
            if (offerType === "Percentage Discount" && !discountPercentage) {
                return reply.code(400).send({
                    success: false,
                    message: "Discount percentage is required for Percentage Discount offers",
                });
            }

            if (offerType === "Flat Discount" && !discountAmount) {
                return reply.code(400).send({
                    success: false,
                    message: "Discount amount is required for Flat Discount offers",
                });
            }

            if (offerType === "Free Item" && !freeItem) {
                return reply.code(400).send({
                    success: false,
                    message: "Free item must be provided for Free Item offers",
                });
            }

            if (offerType === "Buy-One-Get-One (BOGO)" && !bogoItems) {
                return reply.code(400).send({
                    success: false,
                    message: "BOGO items must be provided for Buy-One-Get-One offers",
                });
            }

            if (offerType === "Happy Hour") {
                if (
                    !happyHourTiming ||
                    !happyHourTiming.startTime ||
                    !happyHourTiming.endTime
                ) {
                    return reply.code(400).send({
                        success: false,
                        message: "Happy Hour start and end times are required",
                    });
                }
            }

            if (!validUntil) {
                return reply.code(400).send({
                    success: false,
                    message: "Valid until date is required",
                });
            }

            // Create new offer
            const newOffer = await OfferService.addData({
                restaurantId,
                couponCode,
                offerId: uuidv7(),
                offerTitle,
                description,
                offerType,
                discountPercentage,
                discountAmount,
                freeItem,
                bogoItems,
                happyHourTiming,
                minimumOrder,
                validUntil: new Date(validUntil), // epoch converted to Date
                isActive: isActive !== undefined ? isActive : true,
            });

            return reply.code(201).send({
                success: true,
                message: "Offer created successfully",
                data: newOffer,
            });
        } catch (error) {
            console.error("Error adding offer:", error.message);
            return reply.code(500).send({
                success: false,
                message: "Error adding offer",
                error: error.message,
            });
        }
    },

 
updateOffers: async (request, reply) => {
  try {
    const { restaurantId, offerId } = request.params;
    const itemData = request.body;
    delete itemData.restaurantId;

    // Basic validation
    if (!restaurantId || !offerId) {
      return reply.code(400).send({
        success: false,
        message: "Restaurant ID and Offer ID are required",
      });
    }

    // Check existing offer
    const existingOffer = await OfferService.getData({ restaurantId, offerId });
    if (!existingOffer) {
      return reply.code(404).send({
        success: false,
        message: "Offer not found",
      });
    }

    // Extract core fields
    const {
      offerType = existingOffer.offerType,
      discountPercentage,
      discountAmount,
      freeItem,
      bogoItems,
      happyHourTiming,
      validUntil,
    } = itemData;

    // --- Validation rules ---
    if (offerType === "Percentage Discount") {
      if (discountPercentage == null)
        return reply.code(400).send({
          success: false,
          message: "Discount percentage is required for Percentage Discount offers",
        });
      if (discountPercentage <= 0 || discountPercentage > 100)
        return reply.code(400).send({
          success: false,
          message: "Discount percentage must be between 1 and 100",
        });
    }

    if (offerType === "Flat Discount") {
      if (discountAmount == null)
        return reply.code(400).send({
          success: false,
          message: "Discount amount is required for Flat Discount offers",
        });
      if (discountAmount <= 0)
        return reply.code(400).send({
          success: false,
          message: "Discount amount must be greater than 0",
        });
    }

    if (offerType === "Free Item" && !freeItem)
      return reply.code(400).send({
        success: false,
        message: "Free item must be provided for Free Item offers",
      });

    if (offerType === "Buy-One-Get-One (BOGO)" && !bogoItems)
      return reply.code(400).send({
        success: false,
        message: "BOGO items must be provided for Buy-One-Get-One offers",
      });

    if (offerType === "Happy Hour") {
      if (!happyHourTiming?.startTime || !happyHourTiming?.endTime)
        return reply.code(400).send({
          success: false,
          message: "Happy Hour start and end times are required",
        });
    }

    if (validUntil && isNaN(new Date(validUntil)))
      return reply.code(400).send({
        success: false,
        message: "Invalid validUntil date format",
      });

    // --- Clean up irrelevant fields based on offerType ---
    const validFieldsByType = {
      "Percentage Discount": ["offerType", "discountPercentage", "validUntil"],
      "Flat Discount": ["offerType", "discountAmount", "validUntil"],
      "Free Item": ["offerType", "freeItem", "validUntil"],
      "Buy-One-Get-One (BOGO)": ["offerType", "bogoItems", "validUntil"],
      "Happy Hour": ["offerType", "happyHourTiming", "validUntil"],
    };

    const allOfferFields = [
      "discountPercentage",
      "discountAmount",
      "freeItem",
      "bogoItems",
      "happyHourTiming",
    ];

    const validFields = validFieldsByType[offerType] || [];
    const fieldsToUnset = allOfferFields.filter(
      (field) => !validFields.includes(field)
    );

    const unsetObj = {};
    fieldsToUnset.forEach((field) => (unsetObj[field] = 1));

    // Prepare final update data
    const updatedOfferData = {
      ...itemData,
      validUntil: validUntil ? new Date(validUntil) : existingOffer.validUntil,
      offerType, // ensure offerType is always set
    };

    // --- Perform atomic DB update ---
    const updatedOffer = await OfferService.updateData(
      { restaurantId, offerId },
      {
        $unset: unsetObj, // remove old irrelevant fields
        $set: updatedOfferData, // apply new data
      },
      { new: true }
    );

    return reply.code(200).send({
      success: true,
      message: "Offer updated successfully",
      data: updatedOffer,
    });
  } catch (error) {
    console.error("Error updating offer:", error.message);
    return reply.code(500).send({
      success: false,
      message: "Error updating offer",
      error: error.message,
    });
  }
},


    deleteOffers: async (request, reply) => {
        try {
            const { restaurantId, itemId } = request.params;

            if (!restaurantId || !itemId) {
                return reply.code(400).send({
                    success: false,
                    message: "Branch ID and Item ID are required"
                });
            }

            await OfferService.deleteData({ restaurantId, itemId });

            return reply.code(200).send({
                success: true,
                message: "Menu item deleted successfully"
            });
        } catch (error) {
            console.error(error.message);

            if (error.message === "Menu item not found") {
                return reply.code(404).send({
                    success: false,
                    message: "Menu item not found"
                });
            }

            return reply.code(500).send({
                success: false,
                message: "Error deleting menu item",
                error: error.message
            });
        }
    },

    toggleOfferAvailability: async (request, reply) => {

        try {
            const { restaurantId, offerId } = request.params;
            const { status } = request.body;
            if (!restaurantId || !offerId) {
                return reply.code(400).send({
                    success: false,
                    message: "Branch ID and Offer ID are required"
                });
            }

            if (status === "Pause") {
                const result = await OfferService.updateData({ restaurantId: restaurantId, offerId }, { isActive: false, offerStatus: "Paused" });
                return reply.code(200).send({
                    success: true,
                    message: `Offer is now Paused`,
                    data: result
                });
            }
            if (status === "Activate") {
                const result = await OfferService.updateData({ restaurantId: restaurantId, offerId }, { isActive: true, offerStatus: "Active" });
                return reply.code(200).send({
                    success: true,
                    message: `Offer is now Activated`,
                    data: result
                });
            }

        } catch (error) {
            console.error(error.message);

            if (error.message === "Menu item not found") {
                return reply.code(404).send({
                    success: false,
                    message: "Menu item not found"
                });
            }

            return reply.code(500).send({
                success: false,
                message: "Error toggling menu item availability",
                error: error.message
            });
        }
    },

    addOfferCategory: async (request, reply) => {
        try {
            const { restaurantId } = request.params;
            const { name } = request.body;

            if (!restaurantId) {
                return reply.code(400).send({
                    success: false,
                    message: "Branch ID is required"
                });
            }

            if (!name) {
                return reply.code(400).send({
                    success: false,
                    message: "Category name is required"
                });
            }

            const result = await OfferService.addCategory(restaurantId, name);

            return reply.code(201).send({
                success: true,
                message: "Category added successfully",
                data: result
            });
        } catch (error) {
            console.error(error.message);

            if (error.message === "Category already exists") {
                return reply.code(409).send({
                    success: false,
                    message: "Category already exists"
                });
            }

            return reply.code(500).send({
                success: false,
                message: "Error adding category",
                error: error.message
            });
        }
    }
};

export default offerController;