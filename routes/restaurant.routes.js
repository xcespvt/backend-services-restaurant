import express from "express"

import restaurantController from "../controllers/restaurant.controller.js";

const router = express.Router();


router.post('/hello',restaurantController.helloWorld);

router.post('/add-restaurant',restaurantController.addRestaurant);





export default router;