import express from "express"

import restaurantController from "../controllers/restaurant.controller.js";

const router = express.Router();


router.post('/hello',restaurantController.helloWorld);

router.post('/add-restaurant',restaurantController.addRestaurant);


router.post('/add-menu-item',restaurantController.addMenuItem);
// router.get('/get-menu-item',restaurantController.getMenuItems);


export default router;