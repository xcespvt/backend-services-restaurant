"use strict";
import OfferService from "../services/offerService.js";

import { v4 as uuidv4 } from "uuid";
// Rest of your controller code...

const offerController = {
    getOffers: async (req, res) => {
        try {
            const { branchId } = req.params;
            const page = parseInt(req.query.page) || 1; // Default to page 1
            const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
            const skip = (page - 1) * limit;

            if (!branchId) {
                return res.status(400).json({
                    success: false,
                    message: "Branch ID is required"
                });
            }

            // Get total count for pagination metadata
            const totalItems = await menuService.getCount({ restaurantId: branchId });
            const totalPages = Math.ceil(totalItems / limit);

            const menu = await menuService.getData(
                { restaurantId: branchId },
                { _id: 0 },
                {}, // sort
                skip,
                limit
            );

            return res.status(200).json({
                success: true,
                message: "Menu items retrieved successfully",
                data: menu,
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

            return res.status(500).json({
                success: false,
                message: "Error retrieving menu items",
                error: error.message
            });
        }
    },

    addOffers: async (req, res) => {
        try {
            const {
                restaurantId,
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
            } = req.body;

            // Validate restaurantId
            if (!restaurantId) {
                return res.status(400).json({
                    success: false,
                    message: "Restaurant ID is required",
                });
            }

            // Validate offerType
            if (!offerType) {
                return res.status(400).json({
                    success: false,
                    message: "Offer type is required",
                });
            }

            // Conditional validations based on offerType
            if (offerType === "Percentage Discount" && !discountPercentage) {
                return res.status(400).json({
                    success: false,
                    message: "Discount percentage is required for Percentage Discount offers",
                });
            }

            if (offerType === "Flat Discount" && !discountAmount) {
                return res.status(400).json({
                    success: false,
                    message: "Discount amount is required for Flat Discount offers",
                });
            }

            if (offerType === "Free Item" && !freeItem) {
                return res.status(400).json({
                    success: false,
                    message: "Free item must be provided for Free Item offers",
                });
            }

            if (offerType === "Buy-One-Get-One (BOGO)" && !bogoItems) {
                return res.status(400).json({
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
                    return res.status(400).json({
                        success: false,
                        message: "Happy Hour start and end times are required",
                    });
                }
            }

            if (!validUntil) {
                return res.status(400).json({
                    success: false,
                    message: "Valid until date is required",
                });
            }

            // Create new offer
            const newOffer = await OfferService.addData({
                restaurantId,
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

            return res.status(201).json({
                success: true,
                message: "Offer created successfully",
                data: newOffer,
            });
        } catch (error) {
            console.error("Error adding offer:", error.message);
            return res.status(500).json({
                success: false,
                message: "Error adding offer",
                error: error.message,
            });
        }
    },

    updateOffers: async (req, res) => {
        try {
            const { branchId, itemId } = req.params;
            const itemData = req.body;

            if (!branchId || !itemId) {
                return res.status(400).json({
                    success: false,
                    message: "Branch ID and Item ID are required"
                });
            }

            const menuItem = await menuService.updateData({ branchId, itemId, itemData });

            return res.status(200).json({
                success: true,
                message: "Menu item updated successfully",
                data: menuItem
            });
        } catch (error) {
            console.error(error.message);

            if (error.message === "Menu item not found") {
                return res.status(404).json({
                    success: false,
                    message: "Menu item not found"
                });
            }

            return res.status(500).json({
                success: false,
                message: "Error updating menu item",
                error: error.message
            });
        }
    },

    deleteOffers: async (req, res) => {
        try {
            const { branchId, itemId } = req.params;

            if (!branchId || !itemId) {
                return res.status(400).json({
                    success: false,
                    message: "Branch ID and Item ID are required"
                });
            }

            await menuService.deleteData({ branchId, itemId });

            return res.status(200).json({
                success: true,
                message: "Menu item deleted successfully"
            });
        } catch (error) {
            console.error(error.message);

            if (error.message === "Menu item not found") {
                return res.status(404).json({
                    success: false,
                    message: "Menu item not found"
                });
            }

            return res.status(500).json({
                success: false,
                message: "Error deleting menu item",
                error: error.message
            });
        }
    },

    toggleOfferAvailability: async (req, res) => {

        try {
            const { branchId, offerId } = req.params;
            const { status } = req.body;
            if (!branchId || !offerId) {
                return res.status(400).json({
                    success: false,
                    message: "Branch ID and Offer ID are required"
                });
            }

            if (status === "Pause") {
                const result = await OfferService.updateData({ restaurantId: branchId, offerId }, { isActive: false, offerStatus: "Paused" });
                return res.status(200).json({
                    success: true,
                    message: `Offer is now Paused`,
                    data: result
                });
            }
            if (status === "Activate"){
                const result = await OfferService.updateData({ restaurantId: branchId, offerId }, { isActive: true, offerStatus: "Active" });
                return res.status(200).json({
                    success: true,
                    message: `Offer is now Activated`,
                    data: result
                });
            }
          
        } catch (error) {
            console.error(error.message);

            if (error.message === "Menu item not found") {
                return res.status(404).json({
                    success: false,
                    message: "Menu item not found"
                });
            }

            return res.status(500).json({
                success: false,
                message: "Error toggling menu item availability",
                error: error.message
            });
        }
    },

    addOfferCategory: async (req, res) => {
        try {
            const { branchId } = req.params;
            const { name } = req.body;

            if (!branchId) {
                return res.status(400).json({
                    success: false,
                    message: "Branch ID is required"
                });
            }

            if (!name) {
                return res.status(400).json({
                    success: false,
                    message: "Category name is required"
                });
            }

            const result = await menuService.addCategory(branchId, name);

            return res.status(201).json({
                success: true,
                message: "Category added successfully",
                data: result
            });
        } catch (error) {
            console.error(error.message);

            if (error.message === "Category already exists") {
                return res.status(409).json({
                    success: false,
                    message: "Category already exists"
                });
            }

            return res.status(500).json({
                success: false,
                message: "Error adding category",
                error: error.message
            });
        }
    }
};

export default offerController;