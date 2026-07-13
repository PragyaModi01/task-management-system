import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
    creWorkspace,
    getAllWorkspaces,
    getWorkspaceById,
    updateWorkspace,
    dltWorkspace,
} from "../controllers/workspaceController.js";

const router = express.Router();

router.use(protect);

router.post("/", creWorkspace);

router.get("/", getAllWorkspaces);

router.get("/:id", getWorkspaceById);

router.put("/:id", updateWorkspace);

router.delete("/:id", dltWorkspace);

export default router;