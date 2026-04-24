import express from "express";

import {
    getCollections,
    createCollection,
    addBookToCollection,
    removeBookFromCollection,
    deleteCollection,
} from "../controllers/collectionController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// protected routes
router.use(protect);

// get all collections
router.get("/", getCollections);

// create
router.post("/", createCollection);

// add book
router.post("/add-book", addBookToCollection);

// remove book
router.post("/remove-book", removeBookFromCollection);

// delete collection
router.delete("/:id", deleteCollection);

export default router;