// import MENU_ITEM_SERVICE from "../services/menuItemServices.js";
// import MENU_PRICING_SERVICE from "../services/menuPricingServices.js";

import { v4 as uuidv4 } from "uuid";
import RESTAURANT_SERVICE from "../services/restaurantServices.js";
import MENU_SERVICE from "../services/menuServices.js";

const restaurantController = {
    helloWorld: (req, res) => {
        res.send("Hello World!");
    },

    addRestaurant: async (req, res) => {
        try {
            const {
                name,
                address,
                phone,
                website,
                logo,
                coverImage,
                description,
                isOnline,
                isRushHour
            } = req.body;

            let data = await RESTAURANT_SERVICE.addData({
                restaurantId: uuidv4(),
                name,
                address,
                phone,
                website,
                logo,
                coverImage,
                description,
                isOnline,
                isRushHour
            });

            if (data) {
                return res.status(200).json({
                    success: 1,
                    message: "Restaurant added successfully",
                    data
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: 0,
                message: "Failed to add restaurant"
            });
        }
    }

};

export default restaurantController;