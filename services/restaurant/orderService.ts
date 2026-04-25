"use strict";

import Order from "../../models/restaurant/orderModel.ts";
import Branch from "../../models/restaurant/mainBranch.ts";


const orderService = {
  getAllOrders: async (branchId: any, status?: string, type?: string, date?: string) => {
    try {
      const filter: any = { branchId };

      if (status) {
        filter.status = status;
      }

      if (type) {
        filter.type = type;
      }

      if (date) {
        filter.date = date;
      }

      const orders = await Order.find(filter).lean();
      return orders;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  getOrderDetails: async (branchId: any, orderId: string) => {
    try {
      const order = await Order.findOne({ orderId, branchId }).lean();

      if (!order) {
        throw new Error("Order not found");
      }

      return order;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  updateOrderStatus: async (branchId: any, orderId: string, status: string) => {
    try {
      const order = await Order.findOneAndUpdate(
        { orderId, branchId },
        { status },
        { new: true }
      ).lean();

      if (!order) {
        throw new Error("Order not found");
      }

      return {
        id: order.orderId,
        status: order.status
      };
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  updateOrderPrepTime: async (branchId: any, orderId: string, extraMinutes: number) => {
    try {
      const order = await Order.findOne({ orderId, branchId });

      if (!order) {
        throw new Error("Order not found");
      }

      // Parse current prep time and add extra minutes
      const currentPrepTime = parseInt(order.prepTime.split(' ')[0]);
      const newPrepTime = currentPrepTime + extraMinutes;
      order.prepTime = `${newPrepTime} mins`;

      await order.save();

      return {
        id: order.orderId,
        prepTime: order.prepTime
      };
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  acceptNewOrder: async (branchId: any, orderId: string, prepTime: string) => {
    try {
      const order = await Order.findOneAndUpdate(
        { orderId, branchId, status: 'New' },
        {
          status: 'Preparing',
          prepTime
        },
        { new: true }
      ).lean();

      if (!order) {
        throw new Error("Order not found or already accepted");
      }

      // Increment ordersToday count for the branch
      await Branch.findOneAndUpdate(
        { branchId },
        { $inc: { ordersToday: 1 } }
      );

      return {
        id: order.orderId,
        status: order.status,
        prepTime: order.prepTime
      };
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  createOfflineOrder: async (branchId: any, items: any[], customerName: string, customerPhone: string, type: string, paymentMethod: string) => {
    try {
      // Calculate subtotal and total
      const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const total = subtotal; // In a real implementation, you would add tax, delivery fee, etc.

      // Create new order
      const order = new Order({
        branchId,
        customer: customerName,
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
        date: new Date().toISOString().split('T')[0],
        status: 'New',
        type,
        items,
        subtotal,
        total,
        source: 'Offline',
        customerDetails: {
          name: customerName,
          phone: customerPhone,
          address: '',
          email: ''
        },
        payment: {
          method: paymentMethod,
          status: paymentMethod === 'Cash' ? 'Pending' : 'Paid'
        }
      });

      const savedOrder = await order.save();

      // Increment ordersToday count for the branch
      await Branch.findOneAndUpdate(
        { branchId },
        { $inc: { ordersToday: 1 } }
      );

      return savedOrder;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  getOrderHistory: async (branchId: any, startDate: string, endDate: string, type?: string) => {
    try {
      const filter: any = { branchId };

      if (startDate && endDate) {
        filter.date = { $gte: startDate, $lte: endDate };
      }

      if (type) {
        filter.type = type;
      }

      const orders = await Order.find(filter).lean();

      // Return simplified order history
      return orders.map(order => ({
        id: order.orderId,
        customer: order.customer,
        time: order.time,
        date: order.date,
        status: order.status,
        type: order.type,
        total: order.total,
        source: order.source,
        payment: order.payment
      }));
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }
};

export default orderService;
