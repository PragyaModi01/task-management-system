import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
    crePrjct,
    getProjects,
    getProjectById,
    updtPrjct,
    dltprjct,
} from "../controllers/projectController.js";

const router = express.Router();

router.use(protect);

router.post("/", crePrjct);

router.get("/", getProjects);

router.get("/:id", getProjectById);

router.put("/:id", updtPrjct);

router.delete("/:id", dltprjct);

export default router;