import Book from "../models/Book.js";

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
        const book = await Book.findById(req.params.id);

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
            title,
            author,
            image,
            genre,
            description,
            synopsis,
            pages,
        } = req.body;

        const newBook = await Book.create({
            title,
            author,
            image,
            genre,
            description,
            synopsis,
            pages,
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
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        await book.deleteOne();

        res.json({ message: "Book removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};