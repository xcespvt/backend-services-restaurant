import menuController from "../controllers/menu.controller.js";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const upload = multer({ 
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
    }
  }),
  limits: {
    fileSize: 1 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only images
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  }
});


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
  
  // Image upload route with multer middleware
  fastify.post("/upload-image", {
    preHandler: (request, reply, done) => {
      // Process the upload with multer
      upload.single('image')(request.raw, reply.raw, (err) => {
        if (err) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            reply.code(400).send({
              success: 0,
              message: "File size exceeds the 1MB limit"
            });
            return;
          }
          reply.code(400).send({
            success: 0,
            message: err.message || "Error processing file upload"
          });
          return;
        }
        
        // Make the file available in the request object for the controller
        if (request.raw.file) {
          request.file = request.raw.file;
        }
        done();
      });
    }
  }, menuController.uploadImageToCloudflare);
}

export default menuRoutes;
