import express from "express";

import {
    getClubs,
    getClubById,
    createClub,
    joinClub,
    leaveClub,
    deleteClub,
    addPost,
    deletePost,
} from "../controllers/clubController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// public
router.get("/", getClubs);
router.get("/:id", getClubById);

// protected
router.post(
    "/",
    protect,
    authorizeRoles("admin", "moderator"),
    createClub
);

router.post("/:id/join", protect, joinClub);
router.post("/:id/leave", protect, leaveClub);
router.post("/:id/posts", protect, addPost);
router.delete("/:id/posts/:postId", protect, deletePost);

router.delete("/:id", protect, deleteClub);

export default router;
