import Project from "../models/Project.js";
import Sprint from "../models/Sprint.js";
import Task from "../models/Task.js";

export const getDashboard = async (req, res) => {
    try {

        const totalProjects = await Project.countDocuments();

        const activeSprint = await Sprint.countDocuments({
            status: "Active",
        });

        const totalTasks = await Task.countDocuments({
            isDeleted: false,
        });

        const completedTasks = await Task.countDocuments({
            status: "Done",
            isDeleted: false,
        });

        const pendingTasks = await Task.countDocuments({
            status: {
                $ne: "Done",
            },
            isDeleted: false,
        });

        const storyPoints = await Task.aggregate([
            {
                $match: {
                    isDeleted: false,
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$storyPoints",
                    },
                },
            },
        ]);

        const tasksByStatus = await Task.aggregate([
            {
                $match: {
                    isDeleted: false,
                },
            },
            {
                $group: {
                    _id: "$status",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);

        const tasksByPriority = await Task.aggregate([
            {
                $match: {
                    isDeleted: false,
                },
            },
            {
                $group: {
                    _id: "$priority",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalProjects,
                activeSprint,
                totalTasks,
                completedTasks,
                pendingTasks,
                storyPoints: storyPoints[0]?.total || 0,
                tasksByStatus,
                tasksByPriority,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};