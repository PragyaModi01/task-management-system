import Project from "../models/Project.js";

export const crePrjct = async (req, res) => {
    try {
        const { name, description, workspace } = req.body;

        const project = await Project.create({
            name,
            description,
            workspace,
            createdBy: req.user._id,
            members: [req.user._id],
        });

        res.status(201).json({
            success: true,
            data: project,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getProjects = async (req, res) => {
    try {

        const projects = await Project.find()
            .populate("workspace", "name")
            .populate("createdBy", "name email");

        res.json({
            success: true,
            count: projects.length,
            data: projects,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const getProjectById = async (req, res) => {
    try {

        const project = await Project.findById(req.params.id)
            .populate("workspace", "name")
            .populate("members", "name email");

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        res.json({
            success: true,
            data: project,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const updtPrjct = async (req, res) => {
    try {

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        res.json({
            success: true,
            data: project,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const dltprjct = async (req, res) => {
    try {

        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        res.json({
            success: true,
            message: "Project deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};