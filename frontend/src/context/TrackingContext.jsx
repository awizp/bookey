import { createContext, useState, useEffect } from "react";

const TrackingContext = createContext();

const TrackingProvider = ({ children }) => {

    const [trackingData, setTrackingData] = useState([]);

    // load tracking
    useEffect(() => {
        const trackingUser = () => {
            const stored = localStorage.getItem("tracking");
            if (stored) {
                setTrackingData(JSON.parse(stored));
            }
        };

        trackingUser();
    }, []);

    // save the tracking
    useEffect(() => {
        localStorage.setItem("tracking", JSON.stringify(trackingData));
    }, [trackingData]);

    // ensure user tracking exists
    const ensureUser = (prev, userId) => {
        const exists = prev.find((t) => t.userId === userId);

        if (exists) return prev;

        return [
            ...prev,
            {
                userId,
                currentlyReading: [],
                wanted: [],
                dropped: [],
                completed: [],
                streak: {
                    count: 0,
                    lastUpdated: null
                }
            }
        ];
    };

    // get user
    const getUserTracking = (userId) => {
        return trackingData.find((t) => t.userId === userId);
    };

    // add to reading
    const addToReading = (book, user) => {

        setTrackingData((prev) => {

            const updated = ensureUser(prev, user.id);

            return updated.map((t) => {

                if (t.userId !== user.id) return t;

                const exists = t.currentlyReading.some(
                    (b) => b.bookId === book.id
                );

                if (exists) return t;

                const now = new Date().toISOString();

                return {
                    ...t,
                    // remove from all other lists
                    wanted: t.wanted.filter((b) => b.bookId !== book.id),
                    completed: t.completed.filter((b) => b.bookId !== book.id),
                    dropped: t.dropped.filter((b) => b.bookId !== book.id),

                    currentlyReading: [
                        ...t.currentlyReading,
                        {
                            bookId: book.id,
                            pagesRead: 0,
                            totalPages: book.pages || 100,
                            startedAt: now,
                            addedAt: now,
                            lastUpdated: null
                        }
                    ]
                };
            });
        });
    };

    // add book to list
    const addToList = (type, book, user) => {

        setTrackingData((prev) => {

            const updated = ensureUser(prev, user.id);

            return updated.map((t) => {

                if (t.userId !== user.id) return t;

                const exists = t[type].some(
                    (b) => b.bookId === book.id
                );

                if (exists) return t;

                return {
                    ...t,
                    [type]: [
                        ...t[type],
                        {
                            bookId: book.id,
                            addedAt: new Date().toISOString()
                        }
                    ]
                };
            });
        });
    };

    // remove book
    const removeFromList = (type, bookId, user) => {

        setTrackingData((prev) => {

            const updated = ensureUser(prev, user.id);

            return updated.map((t) => {

                if (t.userId !== user.id) return t;

                return {
                    ...t,
                    [type]: t[type].filter((b) => b.bookId !== bookId)
                };
            });
        });
    };

    // move to reading
    const moveToReading = (book, user) => {

        setTrackingData((prev) => {

            const updated = ensureUser(prev, user.id);

            return updated.map((t) => {

                if (t.userId !== user.id) return t;

                const exists = t.currentlyReading.some(
                    (b) => b.bookId === book.id
                );

                if (exists) return t;

                const now = new Date().toISOString();

                return {
                    ...t,
                    wanted: t.wanted.filter((b) => b.bookId !== book.id),
                    completed: t.completed.filter((b) => b.bookId !== book.id),
                    dropped: t.dropped.filter((b) => b.bookId !== book.id),

                    currentlyReading: [
                        ...t.currentlyReading,
                        {
                            bookId: book.id,
                            pagesRead: 0,
                            totalPages: book.pages || 100,
                            startedAt: now,
                            addedAt: now,
                            lastUpdated: null
                        }
                    ]
                };
            });
        });
    };

    // update progress
    const updateProgress = (bookId, pages, user) => {

        const today = new Date().toDateString();

        setTrackingData((prev) =>
            prev.map((t) => {

                if (t.userId !== user.id) return t;

                let newStreak = t.streak;

                if (t.streak.lastUpdated !== today) {

                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);

                    if (t.streak.lastUpdated === yesterday.toDateString()) {
                        newStreak = {
                            count: t.streak.count + 1,
                            lastUpdated: today
                        };
                    } else {
                        newStreak = {
                            count: 1,
                            lastUpdated: today
                        };
                    }
                }

                return {
                    ...t,
                    currentlyReading: t.currentlyReading.map((b) => {
                        if (b.bookId !== bookId) return b;

                        return {
                            ...b,
                            pagesRead: pages,
                            lastUpdated: today
                        };
                    }),
                    streak: newStreak
                };
            })
        );
    };

    // move to completed
    const markCompleted = (bookId, user) => {

        setTrackingData((prev) =>
            prev.map((t) => {

                if (t.userId !== user.id) return t;

                const book = t.currentlyReading.find((b) => b.bookId === bookId);

                if (!book) return t;

                return {
                    ...t,
                    currentlyReading: t.currentlyReading.filter((b) => b.bookId !== bookId),
                    completed: [...t.completed, book]
                };
            })
        );
    };

    // move to dropped
    const markDropped = (bookId, user) => {

        setTrackingData((prev) =>
            prev.map((t) => {

                if (t.userId !== user.id) return t;

                const book = t.currentlyReading.find((b) => b.bookId === bookId);

                if (!book) return t;

                return {
                    ...t,
                    currentlyReading: t.currentlyReading.filter((b) => b.bookId !== bookId),
                    dropped: [...t.dropped, book]
                };
            })
        );
    };

    // latest reading
    const getLatestReading = (userId) => {
        const user = trackingData.find((t) => t.userId === userId);
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
        getLatestReading
    };

    return (
        <TrackingContext.Provider value={value}>
            {children}
        </TrackingContext.Provider>
    );
};

export { TrackingContext, TrackingProvider };