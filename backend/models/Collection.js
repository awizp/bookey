import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
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

        type: {
            type: String,
            enum: ["normal", "custom", "liked"],
            default: "custom",
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        books: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;
