import express from "express";

import protect from "../middleware/authMiddleware.js";
import {
    getUsers,
    updateProfile,
    updateUserRole,
    blockUser,
    unblockUser,
    deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// protected route
router.get("/profile", protect, (req, res) => {
    res.json(req.user);
});

router.put("/profile", protect, updateProfile);

router.get("/", protect, getUsers);

router.patch("/:id/role", protect, updateUserRole);

router.patch("/:id/block", protect, blockUser);

router.patch("/:id/unblock", protect, unblockUser);

router.delete("/:id", protect, deleteUser);

export default router;
