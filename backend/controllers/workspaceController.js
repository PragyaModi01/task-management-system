import Workspace from "../models/Workspace.js";

export const creWorkspace = async (req, res) => {
    try {
        const { name, description } = req.body;

        const workspace = await Workspace.create({
            name,
            description,
            owner: req.user._id,
            members: [
                {
                    user: req.user._id,
                    role: "Admin",
                },
            ],
        });

        res.status(201).json({
            success: true,
            data: workspace,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllWorkspaces = async (req, res) => {
    try {
        const workspaces = await Workspace.find({
            "members.user": req.user._id,
        }).populate("owner", "name email");

        res.json({
            success: true,
            count: workspaces.length,
            data: workspaces,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getWorkspaceById = async (req, res) => {
    try {

        const workspace = await Workspace.findById(req.params.id)
            .populate("owner", "name email")
            .populate("members.user", "name email");

        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: "Workspace not found",
            });
        }

        res.json({
            success: true,
            data: workspace,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateWorkspace = async (req, res) => {
    try {

        const workspace = await Workspace.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );

        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: "Workspace not found",
            });
        }

        res.json({
            success: true,
            data: workspace,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const dltWorkspace = async (req, res) => {
    try {

        const workspace = await Workspace.findByIdAndDelete(req.params.id);

        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: "Workspace not found",
            });
        }

        res.json({
            success: true,
            message: "Workspace deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};