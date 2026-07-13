import mongoose from "mongoose";

const sprtSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        goal: {
            type: String,
            default: "",
        },

        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true,
        },

        status: {
            type: String,
            enum: ["Planned", "Active", "Completed"],
            default: "Planned",
        },
    },
    {
        timestamps: true,
    }
);

const Sprint = mongoose.model("Sprint", sprtSchema);

export default Sprint;