import { createContext, useContext, useEffect, useState } from "react";

import { apiRequest } from "../api/api";
import { AuthContext } from "./AuthContext";

const TrackingContext = createContext();

const getId = (value) => {
    if (!value) return value;
    if (typeof value === "string") return value;
    return value.id || value._id;
};

const normalizeItem = (item) => ({
    ...item,
    bookId: getId(item.bookId),
});

const normalizeTracking = (tracking, userId) => ({
    ...tracking,
    id: getId(tracking),
    userId: getId(tracking.userId) || userId,
    currentlyReading: (tracking.currentlyReading || []).map(normalizeItem),
    wanted: (tracking.wanted || []).map(normalizeItem),
    completed: (tracking.completed || []).map(normalizeItem),
    dropped: (tracking.dropped || []).map(normalizeItem),
    streak: tracking.streak || {
        count: 0,
        lastUpdated: null,
    },
});

const emptyTracking = (userId) => ({
    userId,
    currentlyReading: [],
    wanted: [],
    dropped: [],
    completed: [],
    streak: {
        count: 0,
        lastUpdated: null,
    },
});

const TrackingProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const [trackingData, setTrackingData] = useState([]);

    const upsertTracking = (tracking) => {
        setTrackingData((prev) => {
            const exists = prev.some((item) => item.userId === tracking.userId);

            if (!exists) return [...prev, tracking];

            return prev.map((item) => item.userId === tracking.userId ? tracking : item);
        });
    };

    const loadTracking = async () => {
        if (!currentUser) {
            setTrackingData([]);
            return;
        }

        try {
            const data = await apiRequest("/tracking");
            upsertTracking(normalizeTracking(data, currentUser.id));
        } catch {
            upsertTracking(emptyTracking(currentUser.id));
        }
    };

    useEffect(() => {
        const loadingTrackFunc = () => {
            loadTracking();
        };

        loadingTrackFunc();
    }, [currentUser?.id]);

    const getUserTracking = (userId) => {
        return trackingData.find((tracking) => tracking.userId === userId);
    };

    const addToReading = async (book, user) => {
        return moveToReading(book, user);
    };

    const addToList = async (type, book, user) => {
        const data = await apiRequest("/tracking/add", "POST", {
            type,
            bookId: book.id,
        });
        const tracking = normalizeTracking(data, user.id);
        upsertTracking(tracking);
        return tracking;
    };

    const removeFromList = async (type, bookId, user) => {
        const data = await apiRequest("/tracking/remove", "POST", {
            type,
            bookId,
        });
        const tracking = normalizeTracking(data, user.id);
        upsertTracking(tracking);
        return tracking;
    };

    const moveToReading = async (book, user) => {
        const data = await apiRequest("/tracking/move-reading", "POST", {
            bookId: book.id,
            totalPages: book.pages || 100,
        });
        const tracking = normalizeTracking(data, user.id);
        upsertTracking(tracking);
        return tracking;
    };

    const updateProgress = async (bookId, pages, user) => {
        const data = await apiRequest("/tracking/progress", "POST", {
            bookId,
            pages,
        });
        const tracking = normalizeTracking(data, user.id);
        upsertTracking(tracking);
        return tracking;
    };

    const markCompleted = async (bookId, user) => {
        const data = await apiRequest("/tracking/complete", "POST", { bookId });
        const tracking = normalizeTracking(data, user.id);
        upsertTracking(tracking);
        return tracking;
    };

    const markDropped = async (bookId, user) => {
        const data = await apiRequest("/tracking/drop", "POST", { bookId });
        const tracking = normalizeTracking(data, user.id);
        upsertTracking(tracking);
        return tracking;
    };

    const getLatestReading = (userId) => {
        const user = trackingData.find((tracking) => tracking.userId === userId);
        if (!user?.currentlyReading?.length) return null;

        return [...user.currentlyReading]
            .sort((a, b) =>
                new Date(b.addedAt || b.startedAt) - new Date(a.addedAt || a.startedAt)
            )[0];
    };

    const value = {
        trackingData,
        getUserTracking,
        addToReading,
        addToList,
        removeFromList,
        moveToReading,
        updateProgress,
        markCompleted,
        markDropped,
        getLatestReading,
        refreshTracking: loadTracking,
    };

    return (
        <TrackingContext.Provider value={value}>
            {children}
        </TrackingContext.Provider>
    );
};

export { TrackingContext, TrackingProvider };
