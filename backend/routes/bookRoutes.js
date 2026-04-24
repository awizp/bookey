import express from "express";

import {
    getBooks,
    getBookById,
    createBook,
    deleteBook,
} from "../controllers/bookController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// public
router.get("/", getBooks);
router.get("/:id", getBookById);

// protected
router.post(
    "/",
    protect,
    authorizeRoles("admin", "moderator"),
    createBook
);

router.delete(
    "/:id",
    protect,
    authorizeRoles("admin", "moderator"),
    deleteBook
);

export default router;