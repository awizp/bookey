import Collection from "../models/Collection.js";

// get user collections
export const getCollections = async (req, res) => {
    try {
        const collections = await Collection.find({
            userId: req.user._id,
        }).populate("books");

        res.json(collections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// create collections
export const createCollection = async (req, res) => {
    try {
        const { name, type } = req.body;

        const newCollection = await Collection.create({
            name,
            type: type || "normal",
            userId: req.user._id,
            books: [],
        });

        res.status(201).json(newCollection);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// add book collection
export const addBookToCollection = async (req, res) => {
    try {
        const { collectionId, bookId } = req.body;

        const collection = await Collection.findById(collectionId);

        if (!collection) {
            return res.status(404).json({ message: "Collection not found" });
        }

        // prevent duplicates
        if (collection.books.includes(bookId)) {
            return res.status(400).json({ message: "Book already added" });
        }

        collection.books.push(bookId);
        await collection.save();

        res.json(collection);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// remove book collection
export const removeBookFromCollection = async (req, res) => {
    try {
        const { collectionId, bookId } = req.body;

        const collection = await Collection.findById(collectionId);

        if (!collection) {
            return res.status(404).json({ message: "Collection not found" });
        }

        collection.books = collection.books.filter(
            (id) => id.toString() !== bookId
        );

        await collection.save();

        res.json(collection);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete collection
export const deleteCollection = async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);

        if (!collection) {
            return res.status(404).json({ message: "Collection not found" });
        }

        if (collection.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await collection.deleteOne();

        res.json({ message: "Collection deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};