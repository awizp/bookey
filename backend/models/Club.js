import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        genre: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            default: "",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Club = mongoose.model("Club", clubSchema);

export default Club;