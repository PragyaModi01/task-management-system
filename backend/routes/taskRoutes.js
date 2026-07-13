import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
    crtTask,
    getTasks,
    getTaskById,
    updtTask,
    dltTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.use(protect);

router.post("/", crtTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.put("/:id", updtTask);
router.delete("/:id", dltTask);

export default router;