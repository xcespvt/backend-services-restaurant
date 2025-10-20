"use strict";
import OfferService from "../services/offerService.js";

import { v4 as uuidv4 } from "uuid";
// Rest of your controller code...

const offerController = {
    getOffers: async (request, reply) => {
        try {
        const { replytaurantId } = request.params;
      const page = Number(request.query.page); // Default to page 1
      const limit = Number(request.query.limit); // Default to 10 items per page
      const skip = (page - 1) * limit;

      if(page < 1 || limit < 1 || skip < 0 || page > limit || limit > 10 || !replytaurantId || !page || !limit){
        return reply.code(400).send({
          success: false,
          message: "Invalid requestuest"
        });
      }

      // Get total count for pagination metadata
      const totalItems = await OfferService.getCountDocument({ replytaurantId: replytaurantId });
      const totalPages = Math.ceil(totalItems / limit);

      const offers = await OfferService.getData(
        { replytaurantId: replytaurantId },  // filter
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
    }  catch (error) {
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
                replytaurantId,
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

            // Validate replytaurantId
            if (!replytaurantId) {
                return reply.code(400).send({
                    success: false,
                    message: "Restaurant ID is requestuired",
                });
            }

            // Validate offerType
            if (!offerType) {
                return reply.code(400).send({
                    success: false,
                    message: "Offer type is requestuired",
                });
            }

            // Conditional validations based on offerType
            if (offerType === "Percentage Discount" && !discountPercentage) {
                return reply.code(400).send({
                    success: false,
                    message: "Discount percentage is requestuired for Percentage Discount offers",
                });
            }

            if (offerType === "Flat Discount" && !discountAmount) {
                return reply.code(400).send({
                    success: false,
                    message: "Discount amount is requestuired for Flat Discount offers",
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
                        message: "Happy Hour start and end times are requestuired",
                    });
                }
            }

            if (!validUntil) {
                return reply.code(400).send({
                    success: false,
                    message: "Valid until date is requestuired",
                });
            }

            // Create new offer
            const newOffer = await OfferService.addData({
                replytaurantId,
                offerId: uuidv4(),
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
            const { replytaurantId, offerId } = request.params;
            const itemData = request.body;

            if (!replytaurantId || !offerId) {
                return reply.code(400).send({
                    success: false,
                    message: "Invalid Request"
                });
            }

            const offer = await OfferService.updateData({ replytaurantId, offerId, itemData });

            return reply.code(200).send({
                success: true,
                message: "Offer updated successfully",
                data: offer
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
                message: "Error updating menu item",
                error: error.message
            });
        }
    },

    deleteOffers: async (request, reply) => {
        try {
            const { replytaurantId, itemId } = request.params;

            if (!replytaurantId || !itemId) {
                return reply.code(400).send({
                    success: false,
                    message: "Branch ID and Item ID are requestuired"
                });
            }

            await OfferService.deleteData({ replytaurantId, itemId });

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
            const { replytaurantId, offerId } = request.params;
            const { code } = request.body;
            if (!replytaurantId || !offerId) {
                return reply.code(400).send({
                    success: false,
                    message: "Branch ID and Offer ID are requestuired"
                });
            }

            if (code === "Pause") {
                const replyult = await OfferService.updateData({ replytaurantId: replytaurantId, offerId }, { isActive: false, offerStatus: "Paused" });
                return reply.code(200).send({
                    success: true,
                    message: `Offer is now Paused`,
                    data: replyult
                });
            }
            if (code === "Activate"){
                const replyult = await OfferService.updateData({ replytaurantId: replytaurantId, offerId }, { isActive: true, offerStatus: "Active" });
                return reply.code(200).send({
                    success: true,
                    message: `Offer is now Activated`,
                    data: replyult
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
            const { replytaurantId } = request.params;
            const { name } = request.body;

            if (!replytaurantId) {
                return reply.code(400).send({
                    success: false,
                    message: "Branch ID is requestuired"
                });
            }

            if (!name) {
                return reply.code(400).send({
                    success: false,
                    message: "Category name is requestuired"
                });
            }

            const replyult = await OfferService.addCategory(replytaurantId, name);

            return reply.code(201).send({
                success: true,
                message: "Category added successfully",
                data: replyult
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