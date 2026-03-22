"use strict";

import tableController from "../controllers/table.controller.js";
import tableTypeController from "../controllers/tabletype.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

async function tableRoutes(fastify) {
    // Get all tables for a branch
    fastify.get("/:branchId", { preHandler: authMiddleware }, tableController.getAllTables);

    // Table Type Routes (Under /:branchId/types)
    fastify.get("/:branchId/types", { preHandler: authMiddleware }, tableTypeController.getTableTypes);
    fastify.post("/:branchId/types", { preHandler: authMiddleware }, tableTypeController.addTableType);
    fastify.put("/:branchId/types/:typeId", { preHandler: authMiddleware }, tableTypeController.updateTableType);
    fastify.delete("/:branchId/types/:typeId", { preHandler: authMiddleware }, tableTypeController.deleteTableType);

    // Add a new table
    fastify.post("/:branchId", { preHandler: authMiddleware }, tableController.addTable);

    // Update a table
    fastify.put("/:branchId/:tableId", { preHandler: authMiddleware }, tableController.updateTable);

    // Delete a table
    fastify.delete("/:branchId/:tableId", { preHandler: authMiddleware }, tableController.deleteTable);

    // Update table status
    fastify.patch("/:branchId/:tableId/status", { preHandler: authMiddleware }, tableController.updateTableStatus);
}

export default tableRoutes;