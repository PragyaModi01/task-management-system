import Sprint from "../models/Sprint.js";

export const createSprint = async (req, res) => {
    try {
        const { name, goal, project, startDate, endDate, status } = req.body;

        if (status === "Active") {
            const activeSprint = await Sprint.findOne({
                project,
                status: "Active",
            });

            if (activeSprint) {
                return res.status(400).json({
                    success: false,
                    message: "Only one active sprint is allowed per project.",
                });
            }
        }

        const sprint = await Sprint.create({
            name,
            goal,
            project,
            startDate,
            endDate,
            status,
        });

        res.status(201).json({
            success: true,
            data: sprint,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const getSprints = async (req, res) => {

    const sprints = await Sprint.find().populate("project", "name");

    res.json({
        success: true,
        data: sprints,
    });
};

export const updateSprint = async (req, res) => {

    const sprint = await Sprint.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json({
        success: true,
        data: sprint,
    });
};

export const deleteSprint = async (req, res) => {

    await Sprint.findByIdAndDelete(req.params.id);

    res.json({
        success: true,
        message: "Sprint dlted successfully",
    });
};