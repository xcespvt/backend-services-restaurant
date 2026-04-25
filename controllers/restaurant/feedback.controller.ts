import { FastifyRequest, FastifyReply } from "fastify";
import feedbackService from "../../services/restaurant/feedbackService.ts";

const feedbackController = {
  getAllFeedback: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { branchId } = request.params;
      const { startDate, endDate } = request.query;

      if (!branchId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID is required"
        });
      }

      const feedback = await feedbackService.getAllFeedback(branchId, startDate, endDate);

      return reply.code(200).send({
        success: true,
        message: "Feedback retrieved successfully",
        data: feedback
      });
    } catch (error: any) {
      console.error(error.message);

      return reply.code(500).send({
        success: false,
        message: "Error retrieving feedback",
        error: error.message
      });
    }
  },

  getFeedbackDetails: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { branchId, feedbackId } = request.params;

      if (!branchId || !feedbackId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID and Feedback ID are required"
        });
      }

      const feedback = await feedbackService.getFeedbackDetails(branchId, feedbackId);

      return reply.code(200).send({
        success: true,
        message: "Feedback details retrieved successfully",
        data: feedback
      });
    } catch (error: any) {
      console.error(error.message);

      if (error.message === "Feedback not found") {
        return reply.code(404).send({
          success: false,
          message: "Feedback not found"
        });
      }

      return reply.code(500).send({
        success: false,
        message: "Error retrieving feedback details",
        error: error.message
      });
    }
  },

  addFeedback: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { branchId } = request.params;
      const feedbackData = request.body;

      if (!branchId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID is required"
        });
      }

      // Validate required fields
      if (!feedbackData.rating || !feedbackData.orderId) {
        return reply.code(400).send({
          success: false,
          message: "Missing required fields"
        });
      }

      const feedback = await feedbackService.addFeedback(branchId, feedbackData);

      return reply.code(201).send({
        success: true,
        message: "Feedback added successfully",
        data: feedback
      });
    } catch (error: any) {
      console.error(error.message);

      return reply.code(500).send({
        success: false,
        message: "Error adding feedback",
        error: error.message
      });
    }
  },

  replyToFeedback: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { branchId, feedbackId } = request.params;
      const { reply: replyText } = request.body;

      if (!branchId || !feedbackId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID and Feedback ID are required"
        });
      }

      if (!replyText) {
        return reply.code(400).send({
          success: false,
          message: "Reply is required"
        });
      }

      const feedback = await feedbackService.replyToFeedback(branchId, feedbackId, replyText);

      return reply.code(200).send({
        success: true,
        message: "Reply added successfully",
        data: feedback
      });
    } catch (error: any) {
      console.error(error.message);

      if (error.message === "Feedback not found") {
        return reply.code(404).send({
          success: false,
          message: "Feedback not found"
        });
      }

      return reply.code(500).send({
        success: false,
        message: "Error adding reply",
        error: error.message
      });
    }
  },

  getFeedbackAnalytics: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { branchId } = request.params;
      const { period } = request.query;

      if (!branchId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID is required"
        });
      }

      const analytics = await feedbackService.getFeedbackAnalytics(branchId, period);

      return reply.code(200).send({
        success: true,
        message: "Feedback analytics retrieved successfully",
        data: analytics
      });
    } catch (error: any) {
      console.error(error.message);

      return reply.code(500).send({
        success: false,
        message: "Error retrieving feedback analytics",
        error: error.message
      });
    }
  }
};

export default feedbackController;
