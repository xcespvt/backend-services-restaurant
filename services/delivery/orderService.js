'use strict';

import Order from '../../models/restaurant/orderModel.js';

const orderService = {
  getAvailableOrders: async (location) => {
    try {
      // Logic to find orders near location that need a delivery partner
      // For now, return all 'Ready' orders for 'Delivery'
      return await Order.find({ 
        status: 'Ready', 
        type: 'Delivery',
        'deliveryPartner.name': { $exists: false } 
      });
    } catch (error) {
      console.error("Error fetching available orders:", error.message);
      throw error;
    }
  },

  getPartnerActiveOrders: async (partnerId) => {
    try {
      return await Order.find({
        'deliveryPartner.partnerId': partnerId,
        status: { $in: ['Accepted', 'Out for Delivery'] }
      });
    } catch (error) {
      console.error("Error fetching partner active orders:", error.message);
      throw error;
    }
  },

  getPartnerOrderHistory: async (partnerId) => {
    try {
      return await Order.find({
        'deliveryPartner.partnerId': partnerId,
        status: 'Delivered'
      });
    } catch (error) {
      console.error("Error fetching partner order history:", error.message);
      throw error;
    }
  },

  updateOrderStatus: async (orderId, partnerId, status) => {
    try {
      // Validation logic: only allow certain transitions
      return await Order.findOneAndUpdate(
        { orderId, 'deliveryPartner.partnerId': partnerId },
        { status },
        { new: true }
      );
    } catch (error) {
      console.error("Error updating order status:", error.message);
      throw error;
    }
  },

  acceptOrder: async (orderId, partnerInfo) => {
    try {
      return await Order.findOneAndUpdate(
        { orderId, status: 'Ready' },
        { 
          status: 'Accepted',
          deliveryPartner: {
            partnerId: partnerInfo.partnerId,
            name: partnerInfo.name,
            phone: partnerInfo.phone,
            rating: partnerInfo.rating
          }
        },
        { new: true }
      );
    } catch (error) {
      console.error("Error accepting order:", error.message);
      throw error;
    }
  }
};

export default orderService;
