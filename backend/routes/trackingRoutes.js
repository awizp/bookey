import express from "express";

import {
    getTracking,
    addToList,
    moveToReading,
    updateProgress,
    markCompleted,
    markDropped,
    removeFromList,
} from "../controllers/trackingController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// protected
router.use(protect);

router.get("/", getTracking);

router.post("/add", addToList);
router.post("/move-reading", moveToReading);
router.post("/progress", updateProgress);

router.post("/complete", markCompleted);
router.post("/drop", markDropped);

router.post("/remove", removeFromList);

export default router;