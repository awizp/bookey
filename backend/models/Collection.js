import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        type: {
            type: String,
            enum: ["normal", "liked"],
            default: "normal",
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