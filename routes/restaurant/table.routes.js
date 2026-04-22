"use strict";

import tableTypeController from "../../controllers/restaurant/tabletype.controller.js";
import { authMiddleware } from "../../middleware/restaurant/auth.middleware.js";

async function tableRoutes(fastify) {
    // Table Type Routes (Under /:branchId/types)
    fastify.get("/:branchId/types", { preHandler: authMiddleware }, tableTypeController.getTableTypes);
    fastify.post("/:branchId/types", { preHandler: authMiddleware }, tableTypeController.addTableType);
    fastify.put("/:branchId/types/:typeId", { preHandler: authMiddleware }, tableTypeController.updateTableType);
    fastify.delete("/:branchId/types/:typeId", { preHandler: authMiddleware }, tableTypeController.deleteTableType);

    
    
}

export default tableRoutes;