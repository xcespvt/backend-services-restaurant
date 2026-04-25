"use strict";

import Refund from "../../models/restaurant/refundModel.ts";
import Order from "../../models/restaurant/orderModel.ts";

const refundService = {
  getAllRefunds: async (branchId: any, status?: string) => {
    try {
      const filter: any = { branchId };

      if (status) {
        filter.status = status;
      }

      const refunds = await Refund.find(filter).lean();
      return refunds;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  getRefundDetails: async (branchId: any, refundId: string) => {
    try {
      const refund = await Refund.findOne({ refundId, branchId }).lean();

      if (!refund) {
        throw new Error("Refund not found");
      }

      return refund;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  createRefundRequest: async (branchId: any, orderId: string, reason: string, items: any[], photos: string[] = []) => {
    try {
      // Get order details
      const order = await Order.findOne({ orderId, branchId }).lean();

      if (!order) {
        throw new Error("Order not found");
      }

      // Calculate refund amount based on items
      let amount = 0;
      if (items && items.length > 0) {
        // Calculate refund for specific items
        items.forEach((refundItem: any) => {
          const orderItem = (order as any).items.find((item: any) => item.id === refundItem.id);
          if (orderItem) {
            amount += orderItem.price * refundItem.quantity;
          }
        });
      } else {
        // Full refund
        amount = order.total;
      }

      // Create refund request
      const refund = new Refund({
        branchId,
        orderId,
        customerName: order.customer,
        amount,
        reason,
        status: 'Pending',
        date: new Date().toISOString().split('T')[0],
        items: items || [],
        photos: photos || [],
        orderType: order.type,
        orderTime: order.time,
        costSplit: {
          restaurant: amount,
          delivery: 0,
          platform: 0
        }
      });

      const savedRefund = await refund.save();
      return savedRefund;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  updateRefundStatus: async (branchId: any, refundId: string, status: string, notes: string, processedBy: string) => {
    try {
      const refund = await Refund.findOneAndUpdate(
        { refundId, branchId },
        {
          status,
          notes,
          processedBy,
          processedAt: new Date().toISOString()
        },
        { new: true }
      ).lean();

      if (!refund) {
        throw new Error("Refund not found");
      }

      return refund;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  updateCostSplit: async (branchId: any, refundId: string, costSplit: any) => {
    try {
      const refund = await Refund.findOneAndUpdate(
        { refundId, branchId },
        { costSplit },
        { new: true }
      ).lean();

      if (!refund) {
        throw new Error("Refund not found");
      }

      return refund;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }
};

export default refundService;
