import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        legacyId: {
            type: String,
            unique: true,
            sparse: true,
            trim: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        author: {
            type: String,
            required: true,
            trim: true,
        },

        image: {
            type: String,
            default: "",
        },

        genre: [
            {
                type: String,
            },
        ],

        description: {
            type: String,
            default: "",
        },

        synopsis: {
            type: String,
            default: "",
        },

        pages: {
            type: Number,
            default: 100,
        },

        language: {
            type: String,
            default: "",
        },

        publishedYear: {
            type: Number,
            default: null,
        },

        rating: {
            type: Number,
            default: 0,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
