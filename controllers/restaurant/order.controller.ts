import { FastifyRequest, FastifyReply } from "fastify";
import orderService from "../../services/restaurant/orderService.ts";

const orderController = {
  getAllOrders: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { branchId } = request.params;
      const { status, type, date } = request.query;

      if (!branchId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID is required"
        });
      }

      const orders = await orderService.getAllOrders(branchId, status, type, date);

      return reply.code(200).send({
        success: true,
        message: "Orders retrieved successfully",
        data: orders
      });
    } catch (error: any) {
      console.error(error.message);

      return reply.code(500).send({
        success: false,
        message: "Error retrieving orders",
        error: error.message
      });
    }
  },

  getOrderDetails: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { branchId, orderId } = request.params;

      if (!branchId || !orderId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID and Order ID are required"
        });
      }

      const order = await orderService.getOrderDetails(branchId, orderId);

      return reply.code(200).send({
        success: true,
        message: "Order details retrieved successfully",
        data: order
      });
    } catch (error: any) {
      console.error(error.message);

      if (error.message === "Order not found") {
        return reply.code(404).send({
          success: false,
          message: "Order not found"
        });
      }

      return reply.code(500).send({
        success: false,
        message: "Error retrieving order details",
        error: error.message
      });
    }
  },

  updateOrderStatus: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { branchId, orderId } = request.params;
      const { status } = request.body;

      if (!branchId || !orderId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID and Order ID are required"
        });
      }

      if (!status) {
        return reply.code(400).send({
          success: false,
          message: "Status is required"
        });
      }

      const result = await orderService.updateOrderStatus(branchId, orderId, status);

      return reply.code(200).send({
        success: true,
        message: "Order status updated successfully",
        data: result
      });
    } catch (error: any) {
      console.error(error.message);

      if (error.message === "Order not found") {
        return reply.code(404).send({
          success: false,
          message: "Order not found"
        });
      }

      return reply.code(500).send({
        success: false,
        message: "Error updating order status",
        error: error.message
      });
    }
  },

  updateOrderPrepTime: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { branchId, orderId } = request.params;
      const { extraMinutes } = request.body;

      if (!branchId || !orderId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID and Order ID are required"
        });
      }

      if (extraMinutes === undefined) {
        return reply.code(400).send({
          success: false,
          message: "Extra minutes is required"
        });
      }

      const result = await orderService.updateOrderPrepTime(branchId, orderId, extraMinutes);

      return reply.code(200).send({
        success: true,
        message: "Order preparation time updated successfully",
        data: result
      });
    } catch (error: any) {
      console.error(error.message);

      if (error.message === "Order not found") {
        return reply.code(404).send({
          success: false,
          message: "Order not found"
        });
      }

      return reply.code(500).send({
        success: false,
        message: "Error updating order preparation time",
        error: error.message
      });
    }
  },

  acceptNewOrder: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { branchId, orderId } = request.params;
      const { prepTime } = request.body;

      if (!branchId || !orderId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID and Order ID are required"
        });
      }

      if (!prepTime) {
        return reply.code(400).send({
          success: false,
          message: "Preparation time is required"
        });
      }

      const result = await orderService.acceptNewOrder(branchId, orderId, prepTime);

      return reply.code(200).send({
        success: true,
        message: "Order accepted successfully",
        data: result
      });
    } catch (error: any) {
      console.error(error.message);

      if (error.message === "Order not found or already accepted") {
        return reply.code(404).send({
          success: false,
          message: "Order not found or already accepted"
        });
      }

      return reply.code(500).send({
        success: false,
        message: "Error accepting order",
        error: error.message
      });
    }
  },

  createOfflineOrder: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { branchId } = request.params;
      const { items, customerName, customerPhone, type, paymentMethod } = request.body;

      if (!branchId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID is required"
        });
      }

      // Validate required fields
      if (!items || !items.length || !customerName || !type || !paymentMethod) {
        return reply.code(400).send({
          success: false,
          message: "Missing required fields"
        });
      }

      const order = await orderService.createOfflineOrder(
        branchId,
        items,
        customerName,
        customerPhone,
        type,
        paymentMethod
      );

      return reply.code(201).send({
        success: true,
        message: "Offline order created successfully",
        data: order
      });
    } catch (error: any) {
      console.error(error.message);

      return reply.code(500).send({
        success: false,
        message: "Error creating offline order",
        error: error.message
      });
    }
  },

  getOrderHistory: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { branchId } = request.params;
      const { startDate, endDate, type } = request.query;

      if (!branchId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID is required"
        });
      }

      const orders = await orderService.getOrderHistory(branchId, startDate, endDate, type);

      return reply.code(200).send({
        success: true,
        message: "Order history retrieved successfully",
        data: orders
      });
    } catch (error: any) {
      console.error(error.message);

      return reply.code(500).send({
        success: false,
        message: "Error retrieving order history",
        error: error.message
      });
    }
  }
};

export default orderController;
