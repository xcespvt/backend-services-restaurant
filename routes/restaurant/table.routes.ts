"use strict";

import { FastifyInstance, FastifyPluginOptions } from "fastify";
import tableTypeController from "../../controllers/restaurant/tabletype.controller.ts";
import { authMiddleware } from "../../middleware/restaurant/auth.middleware.ts";

async function tableRoutes(fastify: FastifyInstance, opts: FastifyPluginOptions) {
    // Table Type Routes (Under /:branchId/types)
    fastify.get("/:branchId/types", { preHandler: authMiddleware }, tableTypeController.getTableTypes);
    fastify.post("/:branchId/types", { preHandler: authMiddleware }, tableTypeController.addTableType);
    fastify.put("/:branchId/types/:typeId", { preHandler: authMiddleware }, tableTypeController.updateTableType);
    fastify.delete("/:branchId/types/:typeId", { preHandler: authMiddleware }, tableTypeController.deleteTableType);

    
    
}

export default tableRoutes;
