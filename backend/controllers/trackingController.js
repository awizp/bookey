import Tracking from "../models/Tracking.js";

// user tracking create
const getOrCreateTracking = async (userId) => {
    let tracking = await Tracking.findOne({ userId });

    if (!tracking) {
        tracking = await Tracking.create({ userId });
    }

    return tracking;
};

// get create
export const getTracking = async (req, res) => {
    try {
        const tracking = await getOrCreateTracking(req.user._id);
        res.json(tracking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// add to list
export const addToList = async (req, res) => {
    try {
        const { type, bookId } = req.body;

        const tracking = await getOrCreateTracking(req.user._id);

        const exists = tracking[type].some(
            (b) => b.bookId.toString() === bookId
        );

        if (exists) {
            return res.status(400).json({ message: "Already exists" });
        }

        tracking[type].push({ bookId });

        await tracking.save();

        res.json(tracking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// move to reading
export const moveToReading = async (req, res) => {
    try {
        const { bookId, totalPages } = req.body;

        const tracking = await getOrCreateTracking(req.user._id);

        const exists = tracking.currentlyReading.some(
            (b) => b.bookId.toString() === bookId
        );

        if (exists) return res.json(tracking);

        // remove from others
        tracking.wanted = tracking.wanted.filter((b) => b.bookId.toString() !== bookId);
        tracking.completed = tracking.completed.filter((b) => b.bookId.toString() !== bookId);
        tracking.dropped = tracking.dropped.filter((b) => b.bookId.toString() !== bookId);

        tracking.currentlyReading.push({
            bookId,
            pagesRead: 0,
            totalPages,
            addedAt: new Date(),
            startedAt: new Date(),
        });

        await tracking.save();

        res.json(tracking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update progress bar
export const updateProgress = async (req, res) => {
    try {
        const { bookId, pages } = req.body;

        const tracking = await getOrCreateTracking(req.user._id);

        const item = tracking.currentlyReading.find(
            (b) => b.bookId.toString() === bookId
        );

        if (!item) {
            return res.status(404).json({ message: "Not in reading" });
        }

        item.pagesRead = pages;
        item.lastUpdated = new Date();

        // streak logic
        const today = new Date().toDateString();
        const last = tracking.streak.lastUpdated
            ? new Date(tracking.streak.lastUpdated).toDateString()
            : null;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (last !== today) {
            if (last === yesterday.toDateString()) {
                tracking.streak.count += 1;
            } else {
                tracking.streak.count = 1;
            }
            tracking.streak.lastUpdated = new Date();
        }

        await tracking.save();

        res.json(tracking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// completed books to complete
export const markCompleted = async (req, res) => {
    try {
        const { bookId } = req.body;

        const tracking = await getOrCreateTracking(req.user._id);

        const item = tracking.currentlyReading.find(
            (b) => b.bookId.toString() === bookId
        );

        if (!item) return res.status(404).json({ message: "Not found" });

        tracking.currentlyReading = tracking.currentlyReading.filter(
            (b) => b.bookId.toString() !== bookId
        );

        tracking.completed.push({ bookId });

        await tracking.save();

        res.json(tracking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// dropped books
export const markDropped = async (req, res) => {
    try {
        const { bookId } = req.body;

        const tracking = await getOrCreateTracking(req.user._id);

        const item = tracking.currentlyReading.find(
            (b) => b.bookId.toString() === bookId
        );

        if (!item) return res.status(404).json({ message: "Not found" });

        tracking.currentlyReading = tracking.currentlyReading.filter(
            (b) => b.bookId.toString() !== bookId
        );

        tracking.dropped.push({ bookId });

        await tracking.save();

        res.json(tracking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// remove from list items
export const removeFromList = async (req, res) => {
    try {
        const { type, bookId } = req.body;

        const tracking = await getOrCreateTracking(req.user._id);

        tracking[type] = tracking[type].filter(
            (b) => b.bookId.toString() !== bookId
        );

        await tracking.save();

        res.json(tracking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};