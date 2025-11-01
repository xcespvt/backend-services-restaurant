"use strict";
import MenuService from "../services/menuServices.js";
import { v4 as uuidv4 } from "uuid";
import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';

const menuController = {
  // Handle image upload with multer
  handleImageUpload: (request, reply, done) => {
    // Process the upload with multer
    const upload = request.uploadHandler;
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
  },
  
  // Delete image from Cloudflare
  deleteCloudflareImage: async (request, reply) => {
    try {
      const { imageUrl } = request.body;
      const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
      const apiToken = process.env.IMAGE_API_TOKEN;
      if (!imageUrl) {
        return reply.code(400).send({
          success: 0,
          message: "Image URL is required"
        });
      }
      
      // Extract image ID from URL
      // URL format: https://imagedelivery.net/guQWSg-jb8gZbMVNCQh-GA/2531a00b-0dc7-4ab7-57e2-19b63a6eb200/public
      const urlParts = imageUrl.split('/');
      const imageId = urlParts[urlParts.length - 2];
      
      if (!imageId) {
        return reply.code(400).send({
          success: 0,
          message: "Invalid image URL format"
        });
      }
      const cloudflareUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1/${imageId}`;
      
      const response = await fetch(cloudflareUrl, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${apiToken}`
        }
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.errors?.[0]?.message || 'Failed to delete image from Cloudflare');
      }
      
      return reply.code(200).send({
        success: 1,
        message: "Image deleted successfully"
      });
    } catch (error) {
      console.error("Image deletion error:", error);
      return reply.code(500).send({
        success: 0,
        message: "Server error while deleting image",
        error: error.message
      });
    }
  },

  // Upload image directly to Cloudflare
  uploadImageToCloudflare: async (request, reply) => {
    try {
      if (!request.file) {
        return reply.code(400).send({
          success: 0,
          message: "No image file provided"
        });
      }

      const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
      const apiToken = process.env.IMAGE_API_TOKEN;
      const cloudflareUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`;
      
      const formData = new FormData();
      formData.append('file', fs.createReadStream(request.file.path));
      
      const response = await fetch(cloudflareUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`
        },
        body: formData
      });

      const data = await response.json();
      
      // Clean up the temporary file
      fs.unlinkSync(request.file.path);
      
      if (!data.success) {
        throw new Error(data.errors?.[0]?.message || 'Failed to upload image to Cloudflare');
      }
      
      return reply.code(200).send({
        success: 1,
        message: "Image uploaded successfully",
        imageId: data.result.id,
        variants: data.result.variants
      });
    } catch (error) {
      console.error("Image upload error:", error);
      return reply.code(500).send({
        success: 0,
        message: "Server error while uploading image",
        error: error.message
      });
    }
  },
  getMenuItems: async (request, reply) => {
    try {
      const { restaurantId } = request.params;
      const page = Number(request.query.page); // Default to page 1
      const limit = Number(request.query.limit); // Default to 10 items per page
      const skip = (page - 1) * limit;

      if(page < 1 || limit < 1 || skip < 0 || page > limit || limit > 10 || !restaurantId || !page || !limit){
        return reply.code(400).send({
          success: false,
          message: "Invalid request"
        });
      }



      // Get total count for pagination metadata
      const totalItems = await MenuService.getCountDocument({ restaurantId: restaurantId });
      const totalPages = Math.ceil(totalItems / limit);

      const menu = await MenuService.getData(
        { restaurantId: restaurantId },  // filter
        { _id: 0 },                   // select
        {},                           // sort
        skip,                            // skip
        limit                             // limit
      );


      return reply.code(200).send({
        success: true,
        message: "Menu items retrieved successfully",
        data: menu,
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1
        }
      });
    } catch (error) {
      console.error(error.message);

      return reply.code(500).send({
        success: false,
        message: "Error retrieving menu items",
        error: error.message
      });
    }
  },

  addMenuItem: async (request, reply) => {
    try {
      const { restaurantId, name, description, type, available, category, images, pricing_unit, pricing_options } = request.body;

      if (!restaurantId || !name || !type || !category || !pricing_unit || !pricing_options) {
        return reply.code(400).send({ success: false, message: "One or more filed names are not defined" });
     }
     // don't include portions in required check
     
      let data = await MenuService.addData({
        restaurantId,
        itemId: uuidv4(),
        name,
        description,
        type,
        available,
        category,
        images,
        pricing_unit,
        pricing_options
      });

      if (data) {
        return reply.code(200).send({
          success: 1,
          message: "Menu item added successfully",
          data
        });
      } else {
        return reply.code(400).send({
          success: 0,
          message: "Failed to add menu item",
          error: error.message
        });
      }
    } catch (error) {
      console.error(error);
      return reply.code(500).send({
        success: 0,
        message: "Failed to add menu item",
        error: error.message
      });
    }

  },

  updateMenuItem: async (request, reply) => {
    try {
 
      const { restaurantId, itemId } = request.params;
        if (!restaurantId || !itemId) {
            return reply.code(400).send({
                success: 0,
                message: "Invalid request"
            });
        }

        // Pull only fields you allow to be updated
        const {
            name,
            description,
            type,
            available,
            category,
            images,
            pricing_unit,
            pricing_options
        } = request.body;

        // Build update payload only with provided fields (partial update)
        const update = {};
        if (restaurantId !== undefined) update.restaurantId = restaurantId;
        if (itemId !== undefined) update.itemId = itemId;
        if (name !== undefined) update.name = name;
        if (description !== undefined) update.description = description;
        if (type !== undefined) update.type = type;
        if (available !== undefined) update.available = available;
        if (category !== undefined) update.category = category;
        if (images !== undefined) update.images = images;
        if (pricing_unit !== undefined) update.pricing_unit = pricing_unit;
        if (pricing_options !== undefined) update.pricing_options = pricing_options;

        if (Object.keys(update).length === 0) {
            return reply.code(400).send({
                success: 0,
                message: "No fields provided to update"
            });
        }

       
        const data = await MenuService.updateData({restaurantId : restaurantId, itemId : itemId}, update);

        if (!data) {
            return reply.code(404).send({
                success: 0,
                message: "Menu item not found"
            });
        }

        return reply.code(200).send({
            success: 1,
            message: "Menu item updated successfully",
            data
        });
    } catch (error) {
        console.error(error);
        return reply.code(500).send({
            success: 0,
            message: "Failed to update menu item"
        });
    }
},

  deleteMenuItem: async (request, reply) => {
    try {
      const { restaurantId, itemId } = request.params;

      if (!restaurantId || !itemId) {
        return reply.code(400).send({
          success: false,
          message: "Invalid Request"
        });
      }

      await MenuService.deleteData({ restaurantId,  itemId });

      return reply.code(200).send({
        success: true,
        message: "Menu item deleted successfully"
      });
    } catch (error) {
      console.error(error.message);

      if (error.message === "Menu item not found") {
        return reply.code(404).send({
          success: false,
          message: "Menu item not found"
        });
      }

      return reply.code(500).send({
        success: false,
        message: "Error deleting menu item",
        error: error.message
      });
    }
  },

  toggleMenuItemAvailability: async (request, reply) => {
    try {
      const { branchId, itemId } = request.params;

      if (!branchId || !itemId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID and Item ID are required"
        });
      }

      const result = await MenuService.toggleMenuItemAvailability(branchId, itemId);

      return reply.code(200).send({
        success: true,
        message: `Menu item is now ${result.available ? 'available' : 'unavailable'}`,
        data: result
      });
    } catch (error) {
      console.error(error.message);

      if (error.message === "Menu item not found") {
        return reply.code(404).send({
          success: false,
          message: "Menu item not found"
        });
      }

      return reply.code(500).send({
        success: false,
        message: "Error toggling menu item availability",
        error: error.message
      });
    }
  },

  addCategory: async (request, reply) => {
    try {
      const { branchId } = request.params;
      const { name } = request.body;

      if (!branchId) {
        return reply.code(400).send({
          success: false,
          message: "Branch ID is required"
        });
      }

      if (!name) {
        return reply.code(400).send({
          success: false,
          message: "Category name is required"
        });
      }

      const result = await MenuService.addCategory(branchId, name);

      return reply.code(201).send({
        success: true,
        message: "Category added successfully",
        data: result
      });
    } catch (error) {
      console.error(error.message);

      if (error.message === "Category already exists") {
        return reply.code(409).send({
          success: false,
          message: "Category already exists"
        });
      }

      return reply.code(500).send({
        success: false,
        message: "Error adding category",
        error: error.message
      });
    }
  },

 searchMenuItems: async (request, reply) => {
  try {
    const { restaurantId } = request.params;
    if (!restaurantId) {
      return reply.code(400).send({
        success: 0,
        message: "Invalid request.",
      });
    }

    let { query, category } = request.query; // e.g. /api/menu/search?query=pizza&category=Pizza
    
    // Remove quotation marks if present
    if (query && typeof query === 'string') {
      query = query.replace(/^"(.*)"$/, '$1');
    }
    
    if (category && typeof category === 'string') {
      category = category.replace(/^"(.*)"$/, '$1');
    }
    
    // Initialize filter with restaurant ID
    let filter = { restaurantId: { $eq: restaurantId } };
    
    // Add text search if query is provided
    if (query && query.trim() !== "") {
      filter.$text = { $search: query };
    }
    
    // Add category filter if category is provided and not "NA"
    if (category && category.trim() !== "" && category !== "NA") {
      filter.category = category;
    }
    
    // If neither query nor valid category is provided, return error
    if ((!query || query.trim() === "") && (!category || category === "NA")) {
      return reply.code(400).send({
        success: 0,
        message: "Search query or valid category is required.",
      });
    }

    const select = { _id: 0, name: 1, description: 1, category: 1, images: 1 };
    
    const data = await MenuService.getData(filter, select);

    if(!data || data.length === 0){
      return reply.code(404).send({
        success: 0,
        message: "No menu items found.",
      });
    }

    return reply.code(200).send({
      success: 1,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Search error:", error);
    return reply.code(500).send({
      success: 0,
      message: "Server error while searching menu items.",
    });
  }
 }
};

export default menuController;