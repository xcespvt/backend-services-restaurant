import menuController from "../controllers/menu.controller.js";

async function menuRoutes(fastify, options) {

  // Get all menu items for a branch
  fastify.get("/getitems/:restaurantId", menuController.getMenuItems);

  // Search menu items
  fastify.get("/:restaurantId/search", menuController.searchMenuItems);

  // Update a menu item
  fastify.put("/updateitems/:restaurantId/:itemId", menuController.updateMenuItem);

  // Add a new menu item
  fastify.post("/add-menu-item", menuController.addMenuItem);

  // Delete a menu item
  fastify.delete("/deleteitems/:restaurantId/:itemId", menuController.deleteMenuItem);

  // Toggle menu item availability
  fastify.patch("/:restaurantId/:itemId/toggle-availability", menuController.toggleMenuItemAvailability);

  // Add a new category
  fastify.post("/:restaurantId/category", menuController.addCategory);
  
  // Delete image from Cloudflare
  fastify.delete("/delete-image", menuController.deleteCloudflareImage);
  
  // Image upload route with multer middleware
  fastify.post("/upload-image", {

  }, menuController.uploadImageToCloudflare);
}

export default menuRoutes;
