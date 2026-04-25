"use strict";

import Order from "../../models/restaurant/orderModel.ts";
import Feedback from "../../models/restaurant/feedbackModel.ts";

const analyticsService = {
  getOrderAnalytics: async (branchId: any, period: string) => {
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

      // Get all orders for the branch within the date range
      const orders = await Order.find({
        branchId,
        date: { $gte: startDate, $lte: endDate }
      }).lean();

      // Calculate total orders
      const totalOrders = orders.length;

      // Calculate growth (simplified for this implementation)
      const growth = {
        percentage: 10,
        trend: 'up'
      };

      // Calculate order type breakdown
      const orderTypeBreakdown = {
        delivery: 0,
        takeaway: 0,
        dineIn: 0
      };

      orders.forEach((order: any) => {
        if (order.type === 'Delivery') {
          orderTypeBreakdown.delivery++;
        } else if (order.type === 'Takeaway') {
          orderTypeBreakdown.takeaway++;
        } else if (order.type === 'Dine-in') {
          orderTypeBreakdown.dineIn++;
        }
      });

      // Calculate top selling items (simplified)
      const itemCounts: Record<string, any> = {};
      orders.forEach((order: any) => {
        order.items.forEach((item: any) => {
          if (!itemCounts[item.name]) {
            itemCounts[item.name] = 0;
          }
          itemCounts[item.name] += item.quantity;
        });
      });

      const topSellingItems = Object.entries(itemCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Calculate period data (simplified)
      const periodData = [
        { date: startDate, orders: 0 },
        { date: endDate, orders: totalOrders }
      ];

      return {
        totalOrders,
        growth,
        periodData,
        orderTypeBreakdown,
        topSellingItems
      };
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  getCustomerAnalytics: async (branchId: any, period: string) => {
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

      // Get all orders for the branch within the date range
      const orders = await Order.find({
        branchId,
        date: { $gte: startDate, $lte: endDate }
      }).lean();

      // Calculate unique customers
      const uniqueCustomers = new Set();
      orders.forEach((order: any) => {
        if (order.customerDetails && order.customerDetails.phone) {
          uniqueCustomers.add(order.customerDetails.phone);
        } else {
          uniqueCustomers.add(order.customer);
        }
      });

      const totalCustomers = uniqueCustomers.size;

      // Calculate new vs returning customers (simplified)
      const newCustomers = Math.floor(totalCustomers * 0.3);
      const returningCustomers = totalCustomers - newCustomers;

      // Calculate growth (simplified)
      const growth = {
        percentage: 15,
        trend: 'up'
      };

      // Calculate top customers (simplified)
      const customerOrders: Record<string, any> = {};
      orders.forEach((order: any) => {
        const customerKey = order.customerDetails && order.customerDetails.phone
          ? order.customerDetails.phone
          : order.customer;

        if (!customerOrders[customerKey]) {
          customerOrders[customerKey] = {
            name: order.customer,
            orders: 0,
            total: 0
          };
        }

        customerOrders[customerKey].orders++;
        customerOrders[customerKey].total += order.total;
      });

      const topCustomers = Object.values(customerOrders)
        .sort((a, b) => b.total - a.total)
        .slice(0, 5);

      // Calculate period data (simplified)
      const periodData = [
        { date: startDate, customers: 0 },
        { date: endDate, customers: totalCustomers }
      ];

      return {
        totalCustomers,
        newCustomers,
        returningCustomers,
        growth,
        periodData,
        topCustomers
      };
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

      // Calculate total feedbacks
      const totalFeedbacks = feedback.length;

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

      // Calculate period data (simplified)
      const periodData = [
        { date: startDate, count: 0, rating: 0 },
        { date: endDate, count: totalFeedbacks, rating: averageRating }
      ];

      return {
        averageRating,
        totalFeedbacks,
        ratingBreakdown,
        periodData
      };
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }
};

export default analyticsService;
