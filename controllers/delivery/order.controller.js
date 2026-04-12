"use strict";

import orderService from "../../services/delivery/orderService.js";

const orderController = {
  getAvailableOrders: async (request, reply) => {
    try {
      const orders = await orderService.getAvailableOrders();
      return reply.code(200).send({ success: true, orders });
    } catch (error) {
      return reply.code(500).send({ success: false, message: error.message });
    }
  },

  getActiveOrders: async (request, reply) => {
    try {
      const { partnerId } = request.user; // Assuming auth middleware sets this
      const orders = await orderService.getPartnerActiveOrders(partnerId);
      return reply.code(200).send({ success: true, orders });
    } catch (error) {
      return reply.code(500).send({ success: false, message: error.message });
    }
  },

  acceptOrder: async (request, reply) => {
    try {
      const { orderId } = request.params;
      const partnerInfo = request.user; // Simplified
      const order = await orderService.acceptOrder(orderId, partnerInfo);
      if (!order) {
        return reply.code(404).send({ success: false, message: "Order not found or already taken" });
      }
      return reply.code(200).send({ success: true, order });
    } catch (error) {
      return reply.code(500).send({ success: false, message: error.message });
    }
  },

  updateStatus: async (request, reply) => {
    try {
      const { orderId } = request.params;
      const { status } = request.body;
      const { partnerId } = request.user;
      const order = await orderService.updateOrderStatus(orderId, partnerId, status);
      if (!order) {
        return reply.code(404).send({ success: false, message: "Order not found" });
      }
      return reply.code(200).send({ success: true, order });
    } catch (error) {
      return reply.code(500).send({ success: false, message: error.message });
    }
  }
};

export default orderController;
