import { useContext, useMemo, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import { DataContext } from "../../../context/DataContext";
import { TrackingContext } from "../../../context/TrackingContext";
import { ToastContext } from "../../../context/ToastContext";

const CurrentReading = () => {

    const { currentUser } = useContext(AuthContext);
    const { books } = useContext(DataContext);
    const {
        trackingData,
        updateProgress,
        markCompleted,
        markDropped
    } = useContext(TrackingContext);

    const { showToast } = useContext(ToastContext);

    const [pageInput, setPageInput] = useState({});

    // get user tracking
    const userTracking = useMemo(() => {
        return trackingData.find(
            (t) => t.userId === currentUser.id
        );
    }, [trackingData, currentUser]);

    const readingList = userTracking?.currentlyReading || [];

    // merge book details
    const readingBooks = readingList.map((item) => {
        const book = books.find((b) => b.id === item.bookId);
        return { ...item, book };
    });

    const handleUpdate = (bookId, totalPages) => {

        const pages = Number(pageInput[bookId]);

        if (!pages || pages < 0) {
            showToast("Enter valid pages", "error");
            return;
        }

        if (pages > totalPages) {
            showToast("Exceeds total pages", "error");
            return;
        }

        updateProgress(bookId, pages, currentUser);
        showToast("Progress updated", "success");

        setPageInput((prev) => ({ ...prev, [bookId]: "" }));
    };

    const handleComplete = (bookId) => {
        markCompleted(bookId, currentUser);
        showToast("Marked as completed", "success");
    };

    const handleDrop = (bookId) => {
        markDropped(bookId, currentUser);
        showToast("Moved to dropped", "info");
    };

    return (
        <div className="bg-white dark:bg-darkCard rounded-2xl p-5 space-y-4">

            <h2 className="text-lg font-semibold">
                Currently Reading
            </h2>

            {readingBooks.length === 0 ? (
                <p className="text-sm text-gray-500">
                    No books in progress. Start reading 🚀
                </p>
            ) : (

                <div className="space-y-4">

                    {readingBooks.map(({ bookId, pagesRead, totalPages, book }) => {

                        if (!book) return null;

                        const progress = Math.min(
                            (pagesRead / totalPages) * 100,
                            100
                        );

                        return (
                            <div
                                key={bookId}
                                className="flex flex-col md:flex-row gap-4 bg-bgLight dark:bg-darkBg p-4 rounded-xl"
                            >

                                {/* image */}
                                <div className="w-20 h-28 overflow-hidden rounded-lg">
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* content */}
                                <div className="flex-1 space-y-2">

                                    <h3 className="font-semibold text-sm">
                                        {book.title}
                                    </h3>

                                    <p className="text-xs text-gray-600">
                                        {pagesRead} / {totalPages} pages
                                    </p>

                                    {/* progress bar */}
                                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>

                                    {/* actions */}
                                    <div className="flex flex-wrap gap-2 mt-2">

                                        <input
                                            type="number"
                                            placeholder="Update pages"
                                            value={pageInput[bookId] || ""}
                                            onChange={(e) =>
                                                setPageInput((prev) => ({
                                                    ...prev,
                                                    [bookId]: e.target.value
                                                }))
                                            }
                                            className="px-2 py-1 rounded-lg bg-white dark:bg-darkCard text-sm outline-none w-28"
                                        />

                                        <button
                                            onClick={() => handleUpdate(bookId, totalPages)}
                                            className="px-3 py-1 text-sm bg-primary text-white rounded-lg"
                                        >
                                            Update
                                        </button>

                                        <button
                                            onClick={() => handleComplete(bookId)}
                                            className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg"
                                        >
                                            Complete
                                        </button>

                                        <button
                                            onClick={() => handleDrop(bookId)}
                                            className="px-3 py-1 text-sm bg-gray-400 text-white rounded-lg"
                                        >
                                            Drop
                                        </button>

                                    </div>

                                </div>

                            </div>
                        );
                    })}

                </div>

            )}

        </div>
    );
};

export default CurrentReading;