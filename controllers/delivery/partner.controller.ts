import { FastifyRequest, FastifyReply } from "fastify";
import partnerService from "../../services/delivery/partnerService.ts";

const partnerController = {
  getProfile: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { referenceId: partnerId } = request.user;
      const profile = await partnerService.getProfile(partnerId);
      return reply.code(200).send({ success: true, profile });
    } catch (error: any) {
      return reply.code(500).send({ success: false, message: error.message });
    }
  },

  updateProfile: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { referenceId: partnerId } = request.user;
      const profile = await partnerService.updateProfile(partnerId, request.body);
      return reply.code(200).send({ success: true, profile });
    } catch (error: any) {
      return reply.code(500).send({ success: false, message: error.message });
    }
  },

  toggleOnline: async (request: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { referenceId: partnerId } = request.user;
      const { isOnline } = request.body as any;
      const profile = await partnerService.updateStatus(partnerId, isOnline);
      return reply.code(200).send({ success: true, isOnline: (profile as any).isOnline });
    } catch (error: any) {
      return reply.code(500).send({ success: false, message: error.message });
    }
  }
};

export default partnerController;

