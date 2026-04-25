import { FastifyRequest, FastifyReply } from "fastify";
import orderService from "../../services/delivery/orderService.ts";

const orderController = {
  getAvailableOrders: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const orders = await orderService.getAvailableOrders();
      return reply.code(200).send({ success: true, orders });
    } catch (error: any) {
      return reply.code(500).send({ success: false, message: error.message });
    }
  },

  getActiveOrders: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { partnerId } = request.user; // Assuming auth middleware sets this
      const orders = await orderService.getPartnerActiveOrders(partnerId);
      return reply.code(200).send({ success: true, orders });
    } catch (error: any) {
      return reply.code(500).send({ success: false, message: error.message });
    }
  },

  acceptOrder: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { orderId } = request.params as any;
      const partnerInfo = request.user; // Simplified
      const order = await orderService.acceptOrder(orderId, partnerInfo);
      if (!order) {
        return reply.code(404).send({ success: false, message: "Order not found or already taken" });
      }
      return reply.code(200).send({ success: true, order });
    } catch (error: any) {
      return reply.code(500).send({ success: false, message: error.message });
    }
  },

  updateStatus: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { orderId } = request.params as any;
      const { status } = request.body as any;
      const { partnerId } = request.user;
      const order = await orderService.updateOrderStatus(orderId, partnerId, status);
      if (!order) {
        return reply.code(404).send({ success: false, message: "Order not found" });
      }
      return reply.code(200).send({ success: true, order });
    } catch (error: any) {
      return reply.code(500).send({ success: false, message: error.message });
    }
  }
};

export default orderController;

