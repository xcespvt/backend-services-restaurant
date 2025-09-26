"use strict";

import express from "express";
import offerController from "../controllers/offer.controller.js";

const router = express.Router();
// Get all offers
router.get("/:branchId", offerController.getOffers);

router.post("/offer/add", offerController.addOffers);    

router.put("/offer/update/:branchId/:offerId", offerController.updateOffers);

router.delete("/offer/delete/:branchId/:offerId", offerController.deleteOffers);

router.put("/offer/toggle/:branchId/:offerId", offerController.toggleOfferAvailability);


export default router;