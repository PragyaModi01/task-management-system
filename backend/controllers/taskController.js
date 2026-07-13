import Task from "../models/Task.js";
import Project from "../models/Project.js";

export const crtTask = async (req, res) => {

    try {

        console.log("TASK BODY:", req.body);
        console.log("USER:", req.user);

        const { workspace, project, ...restBody } = req.body;

        const taskPayload = {
            ...restBody,
            createdBy: req.user._id,
        };

        if (project) {
            taskPayload.project = project;

            const selectedProject = await Project.findById(project).select("workspace");

            if (!selectedProject) {
                return res.status(404).json({
                    success: false,
                    message: "Project not found",
                });
            }

            taskPayload.workspace = workspace && String(workspace).trim()
                ? workspace
                : selectedProject.workspace;
        } else if (workspace && String(workspace).trim()) {
            taskPayload.workspace = workspace;
        }

        if (!taskPayload.workspace) {
            return res.status(400).json({
                success: false,
                message: "A workspace is required to create a task",
            });
        }

        const task = await Task.create(taskPayload);

        res.status(201).json({
            success: true,
            data: task,
        });


    } catch (error) {

        console.log("TASK CREATE ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const getTasks = async (req, res) => {
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const search = req.query.search || "";

        const filter = {
            isDeleted: false,
        };

        // Search by title
        if (search) {
            filter.title = {
                $regex: search,
                $options: "i",
            };
        }

        // Filter by status
        if (req.query.status) {
            filter.status = req.query.status;
        }

        // Filter by priority
        if (req.query.priority) {
            filter.priority = req.query.priority;
        }

        const totalTasks = await Task.countDocuments(filter);

        const tasks = await Task.find(filter)
            .populate("assignee", "name email")
            .populate("project", "name")
            .populate("sprint", "name")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(totalTasks / limit),
            totalTasks,
            data: tasks,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const getTaskById = async (req, res) => {

    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found",
        });
    }

    res.json({
        success: true,
        data: task,
    });
};

export const updtTask = async (req, res) => {

    const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );

    res.json({
        success: true,
        data: task,
    });
};

export const dltTask = async (req, res) => {

    const task = await Task.findByIdAndUpdate(
        req.params.id,
        {
            isDeleted: true,
        },
        {
            new: true,
        }
    );

    res.json({
        success: true,
        message: "Task deleted successfully",
    });
};