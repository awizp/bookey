import { createContext, useState, useEffect } from "react";

const TrackingContext = createContext();

const TrackingProvider = ({ children }) => {

    const [trackingData, setTrackingData] = useState([]);

    // load from localStorage
    useEffect(() => {
        const getUsers = () => {
            const stored = localStorage.getItem("tracking");

            if (stored) {
                setTrackingData(JSON.parse(stored));
            }
        };

        getUsers();
    }, []);

    // save to localStorage
    useEffect(() => {
        localStorage.setItem("tracking", JSON.stringify(trackingData));
    }, [trackingData]);

    // get user tracking
    const getUserTracking = (userId) => {
        return trackingData.find((t) => t.userId === userId);
    };

    // ensure tracking exists
    const ensureTracking = (userId) => {

        let userTracking = trackingData.find((t) => t.userId === userId);

        if (!userTracking) {
            const newTracking = {
                userId,
                currentlyReading: [],
                wanted: [],
                dropped: [],
                completed: [],
                streak: {
                    count: 0,
                    lastUpdated: null
                }
            };

            setTrackingData((prev) => [...prev, newTracking]);
            return newTracking;
        }

        return userTracking;
    };

    // add to currently reading
    const addToReading = (book, user) => {

        setTrackingData((prev) => {

            const exists = prev.find((t) => t.userId === user.id);

            if (!exists) {
                return [
                    ...prev,
                    {
                        userId: user.id,
                        currentlyReading: [
                            {
                                bookId: book.id,
                                pagesRead: 0,
                                totalPages: book.pages || 100,
                                startedAt: new Date().toString(),
                                lastUpdated: null
                            }
                        ],
                        wanted: [],
                        dropped: [],
                        completed: [],
                        streak: { count: 0, lastUpdated: null }
                    }
                ];
            }

            return prev.map((t) => {

                if (t.userId !== user.id) return t;

                const already = t.currentlyReading.find((b) => b.bookId === book.id);

                if (already) return t;

                return {
                    ...t,
                    currentlyReading: [
                        ...t.currentlyReading,
                        {
                            bookId: book.id,
                            pagesRead: 0,
                            totalPages: book.pages || 100,
                            startedAt: new Date().toString(),
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

                // streak logic
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

                const book = t.currentlyReading.find(
                    (b) => b.bookId === bookId
                );

                if (!book) return t;

                return {
                    ...t,
                    currentlyReading: t.currentlyReading.filter((b) => b.bookId !== bookId),
                    dropped: [...t.dropped, book]
                };
            })
        );
    };

    const value = {
        trackingData,
        getUserTracking,
        ensureTracking,
        addToReading,
        updateProgress,
        markCompleted,
        markDropped
    };

    return (
        <TrackingContext.Provider value={value}>
            {children}
        </TrackingContext.Provider>
    );
};

export { TrackingContext, TrackingProvider };