import Book from "../models/Book.js";
import mongoose from "mongoose";

// get all books
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();

        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get single book
export const getBookById = async (req, res) => {
    try {
        const query = mongoose.Types.ObjectId.isValid(req.params.id)
            ? { $or: [{ _id: req.params.id }, { legacyId: req.params.id }] }
            : { legacyId: req.params.id };

        const book = await Book.findOne(query);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// create book
export const createBook = async (req, res) => {
    try {
        const {
            legacyId,
            title,
            author,
            image,
            genre,
            description,
            synopsis,
            pages,
            language,
            publishedYear,
            rating,
        } = req.body;

        const newBook = await Book.create({
            legacyId,
            title,
            author,
            image,
            genre,
            description,
            synopsis,
            pages,
            language,
            publishedYear,
            rating,
            createdBy: req.user._id,
        });

        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete book
export const deleteBook = async (req, res) => {
    try {
        const query = mongoose.Types.ObjectId.isValid(req.params.id)
            ? { $or: [{ _id: req.params.id }, { legacyId: req.params.id }] }
            : { legacyId: req.params.id };

        const book = await Book.findOne(query);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        await book.deleteOne();

        res.json({ message: "Book removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
