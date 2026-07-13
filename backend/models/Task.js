import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        workspace: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
            required: true,
        },

        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },

        sprint: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sprint",
        },

        assignee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        status: {
            type: String,
            enum: ["Todo", "In Progress", "Done"],
            default: "Todo",
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium",
        },

        storyPoints: {
            type: Number,
            default: 0,
        },

        labels: [
            {
                type: String,
            },
        ],

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Performance indexes
taskSchema.index({ workspace: 1 });
taskSchema.index({ project: 1 });
taskSchema.index({ sprint: 1 });
taskSchema.index({ assignee: 1 });
taskSchema.index({ status: 1 });

const Task = mongoose.model("Task", taskSchema);

export default Task;