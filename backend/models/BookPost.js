import mongoose from "mongoose";

const bookPostSchema = new mongoose.Schema(
    {
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true,
        },

        content: {
            type: String,
            required: true,
            trim: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        userName: {
            type: String,
            default: "",
        },

        authorRole: {
            type: String,
            default: "user",
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const BookPost = mongoose.model("BookPost", bookPostSchema);

export default BookPost;