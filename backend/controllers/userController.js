import User from "../models/User.js";

const sanitizeUser = (user) => {
    const data = user.toJSON ? user.toJSON() : user;
    return {
        ...data,
        id: data._id?.toString(),
    };
};

// get all users
export const getUsers = async (req, res) => {
    try {
        if (!["admin", "moderator"].includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }

        const users = await User.find().select("-password").sort({ createdAt: -1 });

        res.json(users.map(sanitizeUser));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update own profile
export const updateProfile = async (req, res) => {
    try {
        const allowed = ["name", "username", "bio", "readerType", "likedGenres", "selectedBooks"];
        const updates = {};

        allowed.forEach((key) => {
            if (req.body[key] !== undefined) updates[key] = req.body[key];
        });

        const user = await User.findByIdAndUpdate(
            req.user._id,
            updates,
            { new: true, runValidators: true }
        ).select("-password");

        res.json(sanitizeUser(user));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// change user role
export const updateUserRole = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        const { role } = req.body;

        if (!["user", "moderator", "admin"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role === "admin") {
            return res.status(400).json({ message: "Admin role cannot be changed" });
        }

        user.role = role;
        await user.save();

        res.json(sanitizeUser(user));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// block user temporarily
export const blockUser = async (req, res) => {
    try {
        if (!["admin", "moderator"].includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }

        const { duration } = req.body;
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "user") {
            return res.status(400).json({ message: "Only users can be blocked" });
        }

        user.blockedUntil = new Date(Date.now() + Number(duration));
        await user.save();

        res.json(sanitizeUser(user));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// unblock user
export const unblockUser = async (req, res) => {
    try {
        if (!["admin", "moderator"].includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }

        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.blockedUntil = null;
        await user.save();

        res.json(sanitizeUser(user));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete user
export const deleteUser = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role === "admin") {
            return res.status(400).json({ message: "Admin cannot be deleted" });
        }

        await user.deleteOne();

        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
