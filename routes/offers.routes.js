"use strict";

import express from "express";
import offerController from "../controllers/offer.controller.js";

const router = express.Router();
// Get all offers
router.get("/:branchId", offerController.getOffers);

router.post("/offer/add", offerController.addOffers);    



export default router;