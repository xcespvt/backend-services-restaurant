"use strict";

import express from "express";
import offerController from "../controllers/offer.controller.js";

const router = express.Router();
// Get all offers
router.get("/offers/:restaurantId", offerController.getOffers);

router.post("/offers/add", offerController.addOffers);    

router.put("/offers/update/:restaurantId/:offerId", offerController.updateOffers);

router.delete("/offers/delete/:restaurantId/:offerId", offerController.deleteOffers);

router.put("/offers/toggle/:restaurantId/:offerId", offerController.toggleOfferAvailability);


export default router;