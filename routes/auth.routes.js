"use strict";

import express from "express";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

// User registration
router.post("/register", authController.registerUser);

// User login
router.post("/login", authController.loginUser);

// Employee login
router.post("/employee/login", authController.loginEmployee);

export default router;