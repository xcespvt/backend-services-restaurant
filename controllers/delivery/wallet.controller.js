"use strict";

import walletService from "../../services/delivery/walletService.js";

const walletController = {
  getBalance: async (request, reply) => {
    try {
      const { referenceId: partnerId } = request.user;
      const balance = await walletService.getBalance(partnerId);
      return reply.code(200).send({ success: true, balance });
    } catch (error) {
      return reply.code(500).send({ success: false, message: error.message });
    }
  }
};

export default walletController;
