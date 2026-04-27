import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        legacyId: {
            type: String,
            unique: true,
            sparse: true,
            trim: true,
        },

        // basic info
        name: {
            type: String,
            required: true,
            trim: true,
        },

        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        bio: {
            type: String,
            default: "",
        },

        // roles
        role: {
            type: String,
            enum: ["user", "moderator", "admin"],
            default: "user",
        },

        // reading preferences
        readerType: {
            type: String,
            enum: ["beginner", "regular", "occasional", "casual", "advanced"],
            default: "beginner",
        },

        likedGenres: [
            {
                type: String,
            },
        ],

        selectedBooks: [
            {
                type: String,
            },
        ],

        // clubs
        clubsJoined: [
            {
                type: String,
            },
        ],

        // moderation control
        blockedUntil: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true, // createdAt, updatedAt all in mongodb field
    }
);

// remove password when sending response
userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};

const User = mongoose.model("User", userSchema);

export default User;
