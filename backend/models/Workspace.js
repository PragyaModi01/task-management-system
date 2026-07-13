import mongoose from "mongoose";

const wrkspaceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        members: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },

                role: {
                    type: String,
                    enum: ["Admin", "Project Manager", "Developer"],
                    default: "Developer",
                },
            },
        ],

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Workspace = mongoose.model("Workspace", wrkspaceSchema);

export default Workspace;