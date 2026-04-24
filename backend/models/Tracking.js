import mongoose from "mongoose";

const bookItemSchema = new mongoose.Schema(
    {
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true,
        },
        addedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: false }
);

const readingItemSchema = new mongoose.Schema(
    {
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true,
        },
        pagesRead: {
            type: Number,
            default: 0,
        },
        totalPages: {
            type: Number,
            default: 100,
        },
        startedAt: Date,
        addedAt: Date,
        lastUpdated: Date,
    },
    { _id: false }
);

const trackingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true,
            required: true,
        },

        wanted: [bookItemSchema],
        currentlyReading: [readingItemSchema],
        completed: [bookItemSchema],
        dropped: [bookItemSchema],

        streak: {
            count: { type: Number, default: 0 },
            lastUpdated: { type: Date, default: null },
        },
    },
    { timestamps: true }
);

const Tracking = mongoose.model("Tracking", trackingSchema);

export default Tracking;