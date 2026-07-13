import express from "express";
import {
    registerUser,
    loginUser,
    getProfile,
} from "../controllers/authController.js";

import protectMid from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// protected route
router.get("/me", protectMid, getProfile);

export default router;