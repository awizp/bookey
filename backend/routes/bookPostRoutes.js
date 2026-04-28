import express from "express";

import {
    getPostsByBook,
    createPost,
    deletePost,
} from "../controllers/bookPostController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// get posts
router.get("/:bookId",protect, getPostsByBook);

// create post
router.post("/:bookId", protect, createPost);

// delete post
router.delete("/:bookId/:postId", protect, deletePost);

export default router;