import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
    createSprint,
    getSprints,
    updateSprint,
    deleteSprint,
} from "../controllers/sprintController.js";

const router = express.Router();

router.use(protect);

router.post("/", createSprint);
router.get("/", getSprints);
router.put("/:id", updateSprint);
router.delete("/:id", deleteSprint);

export default router;