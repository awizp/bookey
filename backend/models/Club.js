import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        legacyId: {
            type: String,
            trim: true,
        },

        content: {
            type: String,
            required: true,
            trim: true,
        },

        type: {
            type: String,
            default: "text",
        },

        authorRole: {
            type: String,
            default: "user",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        userName: {
            type: String,
            default: "",
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: true }
);

const clubSchema = new mongoose.Schema(
    {
        legacyId: {
            type: String,
            unique: true,
            sparse: true,
            trim: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        genre: {
            type: String,
            default: "general",
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

        memberCount: {
            type: Number,
            default: 0,
        },

        posts: [postSchema],
    },
    {
        timestamps: true,
    }
);

const Club = mongoose.model("Club", clubSchema);

export default Club;
