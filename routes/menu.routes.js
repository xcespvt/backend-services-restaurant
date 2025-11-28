import menuController from "../controllers/menu.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
async function menuRoutes(fastify, options) {

  // Get all menu items for a branch
  fastify.get("/getitems/:restaurantId", { preHandler: authMiddleware }, menuController.getMenuItems);

  // Search menu items
  fastify.get("/:restaurantId/search", { preHandler: authMiddleware }, menuController.searchMenuItems);

  // Update a menu item
  fastify.put("/updateitems/:restaurantId/:itemId", { preHandler: authMiddleware }, menuController.updateMenuItem);

  // Add a new menu item
  fastify.post("/add-menu-item", { preHandler: authMiddleware }, menuController.addMenuItem);

  // Delete a menu item
  fastify.delete("/deleteitems/:restaurantId/:itemId", { preHandler: authMiddleware }, menuController.deleteMenuItem);

  // Toggle menu item availability
  fastify.patch("/:restaurantId/:itemId/toggle-availability", { preHandler: authMiddleware }, menuController.toggleMenuItemAvailability);

  // Add a new category
  fastify.post("/:restaurantId/category", { preHandler: authMiddleware }, menuController.addCategory);
  
  // Delete image from Cloudflare
  fastify.delete("/delete-image", { preHandler: authMiddleware }, menuController.deleteCloudflareImage);
  
  // Image upload route with multer middleware
  fastify.post("/upload-image", {

  },{ preHandler: authMiddleware }, menuController.uploadImageToCloudflare);
}

export default menuRoutes;
