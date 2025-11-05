"use strict";
import PromotionService from "../services/promotionService.js";

import { v4 as uuidv4 } from "uuid";


const promotionController = {
  getPromotions: async (request, reply) => {
    try {
      const { restaurantId } = request.params;
      const page = Number(request.query.page) || 1;
      const limit = Number(request.query.limit) || 10;
      const skip = (page - 1) * limit;

      if (!restaurantId || page < 1 || limit < 1) {
        return reply.code(400).send({
          success: false,
          message: "Invalid request parameters",
        });
      }

      const totalItems = await PromotionService.getCountDocument({
        restaurantId: restaurantId,
      });
      const totalPages = Math.ceil(totalItems / limit);

      const promotions = await PromotionService.getData(
        { restaurantId: restaurantId },
        { _id: 0 },
        { createdAt: -1 },
        skip,
        limit
      );

      return reply.code(200).send({
        success: true,
        message: "Promotions retrieved successfully",
        data: promotions,
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      });
    } catch (error) {
      console.error("Error fetching promotions:", error.message);
      return reply.code(500).send({
        success: false,
        message: "Error retrieving promotions",
        error: error.message,
      });
    }
  },

  addPromotions: async (request, reply) => {
    try {
      const {
        restaurantId,
        campaignTitle,
        shortDescription,
        couponCode,
        adBudget,
        estimatedImpressions,
        objective,
        offers,
        startDate,
        endDate,
        placementOptions,
        service,
        customerSegment,
      } = request.body;

      // ====== BASIC VALIDATIONS ======
      if (!restaurantId)
        return reply.code(400).send({ success: false, message: "Restaurant ID is required" });

      if (!campaignTitle)
        return reply.code(400).send({ success: false, message: "Campaign title is required" });

      if (!objective)
        return reply.code(400).send({ success: false, message: "Objective is required" });

      const validObjectives = [
        "Boost orders",
        "Promote new dish/menu",
        "Drive traffic to outlet",
        "Highlight discounts/offers",
        "Brand awareness",
      ];
      if (!validObjectives.includes(objective)) {
        return reply.code(400).send({
          success: false,
          message: `Invalid objective. Must be one of: ${validObjectives.join(", ")}`,
        });
      }

      if (!Array.isArray(offers) || offers.length === 0) {
        return reply.code(400).send({
          success: false,
          message: "At least one offer must be selected",
        });
      }

      for (const offer of offers) {
        if (!offer.offerId || !offer.offerTitle) {
          return reply.code(400).send({
            success: false,
            message: "Each offer must include both offerId and offerTitle",
          });
        }
      }

      if (!adBudget || adBudget <= 0) {
        return reply.code(400).send({
          success: false,
          message: "Ad budget must be greater than 0",
        });
      }

      if (!startDate || !endDate)
        return reply.code(400).send({ success: false, message: "Start and End date are required" });

      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isNaN(start) || isNaN(end))
        return reply.code(400).send({ success: false, message: "Invalid date format" });

      if (start >= end)
        return reply.code(400).send({ success: false, message: "End date must be after start date" });

      // ====== PLACEMENT VALIDATION ======
      const validPlacements = [
        "homepageBanner",
        "searchResultBoost",
        "categoryHighlight",
        "offerSection",
        "pushNotification",
        "alertNotification",
      ];

      if (placementOptions && typeof placementOptions !== "object") {
        return reply.code(400).send({
          success: false,
          message: "Invalid placementOptions format",
        });
      }

      // ====== CALCULATE TOTAL COST ======
      let totalCost = adBudget;
      if (placementOptions) {
        for (const key of validPlacements) {
          const placement = placementOptions[key];
          if (placement?.isEnabled && placement?.price) {
            totalCost += placement.price;
          }
        }
      }

      // ====== CREATE PROMOTION DOCUMENT ======
      const newPromotion = await PromotionService.addData({
        restaurantId,
        promotionId: uuidv4(),
        campaignTitle,
        shortDescription,
        couponCode,
        adBudget,
        estimatedImpressions: estimatedImpressions || 0,
        objective,
        offers,
        startDate: start,
        endDate: end,
        placementOptions,
        totalCost,
        service: service || "ALL",
        customerSegment: customerSegment || "ALL",
        promotionStatus: "Active",
      });

      return reply.code(201).send({
        success: true,
        message: "Promotion created successfully",
        data: newPromotion,
      });
    } catch (error) {
      console.error("Error adding promotion:", error.message);
      return reply.code(500).send({
        success: false,
        message: "Error adding promotion",
        error: error.message,
      });
    }
  },

  updatePromotions: async (request, reply) => {
    try {
      const { restaurantId, promotionId } = request.params;
      const updateData = request.body;

      if (!restaurantId || !promotionId) {
        return reply.code(400).send({
          success: false,
          message: "Restaurant ID and Promotion ID are required",
        });
      }

      const existingPromotion = await PromotionService.getSingleDocument({
        restaurantId,
        promotionId,
      });
      if (!existingPromotion) {
        return reply.code(404).send({
          success: false,
          message: "Promotion not found",
        });
      }

      // Validate dates if provided
      if (updateData.startDate && updateData.endDate) {
        const start = new Date(updateData.startDate);
        const end = new Date(updateData.endDate);
        if (isNaN(start) || isNaN(end)) {
          return reply.code(400).send({
            success: false,
            message: "Invalid date format for start or end date",
          });
        }
        if (start >= end) {
          return reply.code(400).send({
            success: false,
            message: "End date must be after start date",
          });
        }
      }

      // Validate offers if provided
      if (updateData.offers) {
        if (!Array.isArray(updateData.offers) || updateData.offers.length === 0) {
          return reply.code(400).send({
            success: false,
            message: "At least one offer must be selected",
          });
        }
        for (const offer of updateData.offers) {
          if (!offer.offerId || !offer.offerTitle) {
            return reply.code(400).send({
              success: false,
              message: "Each offer must include both offerId and offerTitle",
            });
          }
        }
      }

      // Recalculate total cost if placementOptions or adBudget changes
      let totalCost = updateData.adBudget || existingPromotion.adBudget;
      if (updateData.placementOptions) {
        const validPlacements = [
          "homepageBanner",
          "searchResultBoost",
          "categoryHighlight",
          "offerSection",
          "pushNotification",
          "alertNotification",
        ];
        for (const key of validPlacements) {
          const placement = updateData.placementOptions[key];
          if (placement?.isEnabled && placement?.price) {
            totalCost += placement.price;
          }
        }
      }

      updateData.totalCost = totalCost;

      const updatedPromotion = await PromotionService.updateData(
        { restaurantId, promotionId },
        { $set: updateData }
      );

      return reply.code(200).send({
        success: true,
        message: "Promotion updated successfully",
        data: updatedPromotion,
      });
    } catch (error) {
      console.error("Error updating promotion:", error.message);
      return reply.code(500).send({
        success: false,
        message: "Error updating promotion",
        error: error.message,
      });
    }
  },

  deletePromotions: async (request, reply) => {
    try {
      const { restaurantId, promotionId } = request.params;

      if (!restaurantId || !promotionId) {
        return reply.code(400).send({
          success: false,
          message: "Restaurant ID and Promotion ID are required",
        });
      }

      const result = await PromotionService.deleteData({ restaurantId, promotionId });

      if (result && result.deletedCount === 0) {
        return reply.code(404).send({
          success: false,
          message: "Promotion not found",
        });
      }

      return reply.code(200).send({
        success: true,
        message: "Promotion deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting promotion:', error.message);

      return reply.code(500).send({
        success: false,
        message: "Error deleting promotion",
        error: error.message,
      });
    }
  },

  togglePromotionAvailability: async (request, reply) => {
    try {
      const { restaurantId, promotionId } = request.params;
      const { status } = request.body;
      if (!restaurantId || !promotionId) {
        return reply.code(400).send({
          success: false,
          message: "Restaurant ID and Promotion ID are required",
        });
      }

      let update = {};
      let message = "";

      if (status === "Pause") {
        update = { isActive: false, promotionStatus: "Paused" };
        message = "Promotion is now Paused";
      } else if (status === "Activate") {
        update = { isActive: true, promotionStatus: "Active" };
        message = "Promotion is now Activated";
      } else {
        return reply.code(400).send({
          success: false,
          message: "Invalid status provided. Must be 'Pause' or 'Activate'",
        });
      }

      const result = await PromotionService.updateData(
        { restaurantId: restaurantId, promotionId },
        update
      );

      if (!result) {
        return reply.code(404).send({
          success: false,
          message: "Promotion not found",
        });
      }

      return reply.code(200).send({
        success: true,
        message: message,
        data: result,
      });
    } catch (error) {
      console.error('Error toggling promotion availability:', error.message);
      return reply.code(500).send({
        success: false,
        message: "Error toggling promotion availability",
        error: error.message,
      });
    }
  },

  addPromotionCategory: async (request, reply) => {
    try {
      const { restaurantId } = request.params;
      const { name } = request.body;

      if (!restaurantId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID is required",
        });
      }

      if (!name) {
        return reply.code(400).send({
          success: false,
          message: "Category name is required",
        });
      }

      const result = await PromotionService.addCategory(restaurantId, name);

      return reply.code(201).send({
        success: true,
        message: "Category added successfully",
        data: result,
      });
    } catch (error) {
      console.error(error.message);

      if (error.message === "Category already exists") {
        return reply.code(409).send({
          success: false,
          message: "Category already exists",
        });
      }

      return reply.code(500).send({
        success: false,
        message: "Error adding category",
        error: error.message,
      });
    }
  },
};

export default promotionController;
