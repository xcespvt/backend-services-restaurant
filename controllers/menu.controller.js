"use strict";
import MenuService from "../services/menuServices.js";


// Rest of your controller code...

const menuController = {
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
     // don't include portions in requestuired check
     
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
          message: "Branch ID and Item ID are requestuired"
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
          message: "Branch ID is requestuired"
        });
      }

      if (!name) {
        return reply.code(400).send({
          success: false,
          message: "Category name is requestuired"
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

    const { query } = request.query; // e.g. /api/menu/search?query=pizza
    if (!query || query.trim() === "") {
      return reply.code(400).send({
        success: 0,
        message: "Search query is requestuired.",
      });
    }

    // Ensure text index exists on `name` field (recommended to add in schema: MenuItemSchema.index({ name: "text" }))
    const filter = { restaurantId: { $eq: restaurantId }, $text: { $search: query } };
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