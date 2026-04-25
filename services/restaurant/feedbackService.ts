"use strict";

import Feedback from "../../models/restaurant/feedbackModel.ts";

const feedbackService = {
  getAllFeedback: async (branchId: any, startDate?: string, endDate?: string) => {
    try {
      const filter: any = { branchId };

      if (startDate && endDate) {
        filter.date = { $gte: startDate, $lte: endDate };
      }

      const feedback = await Feedback.find(filter).lean();
      return feedback;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  getFeedbackDetails: async (branchId: any, feedbackId: string) => {
    try {
      const feedback = await Feedback.findOne({ feedbackId, branchId }).lean();

      if (!feedback) {
        throw new Error("Feedback not found");
      }

      return feedback;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  addFeedback: async (branchId: any, feedbackData: any) => {
    try {
      const feedback = new Feedback({
        branchId,
        ...feedbackData,
        date: new Date().toISOString().split('T')[0],
        replied: false
      });

      const savedFeedback = await feedback.save();
      return savedFeedback;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  replyToFeedback: async (branchId: any, feedbackId: string, reply: string) => {
    try {
      const feedback = await Feedback.findOneAndUpdate(
        { feedbackId, branchId },
        {
          reply,
          replied: true,
          replyDate: new Date().toISOString().split('T')[0]
        },
        { new: true }
      ).lean();

      if (!feedback) {
        throw new Error("Feedback not found");
      }

      return feedback;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  getFeedbackAnalytics: async (branchId: any, period: string) => {
    try {
      // Define date range based on period
      let startDate;
      const endDate = new Date().toISOString().split('T')[0];

      if (period === 'week') {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        startDate = lastWeek.toISOString().split('T')[0];
      } else if (period === 'month') {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        startDate = lastMonth.toISOString().split('T')[0];
      } else if (period === 'year') {
        const lastYear = new Date();
        lastYear.setFullYear(lastYear.getFullYear() - 1);
        startDate = lastYear.toISOString().split('T')[0];
      } else {
        // Default to all time
        startDate = '2000-01-01';
      }

      // Get all feedback for the branch within the date range
      const feedback = await Feedback.find({
        branchId,
        date: { $gte: startDate, $lte: endDate }
      }).lean();

      // Calculate average rating
      const totalRating = feedback.reduce((sum, item) => sum + item.rating, 0);
      const averageRating = feedback.length > 0 ? (totalRating / feedback.length).toFixed(1) : 0;

      // Calculate rating breakdown
      const ratingBreakdown: Record<number, number> = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      };

      feedback.forEach((item: any) => {
        ratingBreakdown[item.rating as keyof typeof ratingBreakdown]++;
      });

      // Calculate period data (simplified for this implementation)
      const periodData = [
        { date: startDate, count: 0, rating: 0 },
        { date: endDate, count: feedback.length, rating: averageRating }
      ];

      return {
        averageRating,
        totalFeedbacks: feedback.length,
        ratingBreakdown,
        periodData
      };
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }
};

export default feedbackService;
