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
        const { legacyId, name, type, books } = req.body;

        const newCollection = await Collection.create({
            legacyId,
            name,
            type: type || "custom",
            userId: req.user._id,
            books: books || [],
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

        if (collection.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        // prevent duplicates
        const exists = collection.books.some((id) => id.toString() === bookId);

        if (exists) {
            return res.status(400).json({ message: "Book already added" });
        }

        collection.books.push(bookId);
        await collection.save();

        const populated = await collection.populate("books");

        res.json(populated);
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

        if (collection.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        collection.books = collection.books.filter(
            (id) => id.toString() !== bookId
        );

        await collection.save();

        const populated = await collection.populate("books");

        res.json(populated);
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
