import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";

import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";
import { TrackingContext } from "../context/TrackingContext";
import { ToastContext } from "../context/ToastContext";

const TrackingPlaylist = () => {

    const { type } = useParams();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const { currentUser } = useContext(AuthContext);
    const { books } = useContext(DataContext);
    const { trackingData, moveToReading, removeFromList } = useContext(TrackingContext);
    const { showToast } = useContext(ToastContext);

    // user tracking
    const userTracking =
        trackingData.find((t) => t.userId === currentUser.id) || {
            wanted: [],
            currentlyReading: [],
            completed: [],
            dropped: []
        };

    const list = userTracking[type] || [];

    const mapped = list.map((item) => {
        const book = books.find((b) => b.id === item.bookId);
        return { ...item, book };
    });

    const getTitle = () => {
        switch (type) {
            case "wanted":
                return "Wanted to Read";
            case "currentlyReading":
                return "Currently Reading";
            case "completed":
                return "Completed";
            case "dropped":
                return "Dropped";
            default:
                return "Tracking";
        }
    };

    // user functions
    const handleRead = (book) => {
        if (!book) return;

        moveToReading(book, currentUser);
        showToast("Moved to currently reading", "success");
    };

    const handleRemove = (e, bookId) => {
        e.stopPropagation();

        removeFromList(type, bookId, currentUser);
        showToast("Removed from list", "info");
    };

    const handleOpen = (bookId) => {
        navigate(`/app/reading/${bookId}`);
    };

    return (
        <div className="h-screen flex overflow-hidden">

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="flex-1 flex flex-col">

                <AppNavbar setIsOpen={setIsOpen} />

                <div className="flex-1 p-4 bg-bgLight dark:bg-darkBg space-y-4">

                    {/* back button */}
                    <button
                        onClick={() => navigate("/app")}
                        className="flex items-center gap-2 text-sm mb-2 text-primary font-semibold cursor-pointer"
                    >
                        <FaArrowLeft />
                        Back
                    </button>

                    <h1 className="text-lg font-semibold">
                        {getTitle()}
                    </h1>

                    {mapped.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            No books in this list
                        </p>
                    ) : (

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

                            {mapped.map(({ bookId, book, pagesRead, totalPages }) => {

                                if (!book) return null;

                                const progress = totalPages ? Math.min((pagesRead / totalPages) * 100, 100) : 0;

                                return (
                                    <div
                                        key={bookId}
                                        className="bg-white dark:bg-darkCard rounded-2xl p-3 space-y-2"
                                    >

                                        {/* image */}
                                        <div
                                            onClick={() => handleOpen(bookId)}
                                            className="w-full h-44 rounded-xl overflow-hidden cursor-pointer border border-primary/30"
                                        >
                                            <img
                                                src={book.image}
                                                alt={book.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* title */}
                                        <p className="text-sm font-semibold line-clamp-2">
                                            {book.title}
                                        </p>

                                        {/* progress bar */}
                                        {(type === "currentlyReading" || type === "completed") && (
                                            <div className="space-y-1">
                                                <p className="text-xs text-gray-500">
                                                    {pagesRead || 0} / {totalPages || book.pages}
                                                </p>

                                                <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary"
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex flex-col gap-2 pt-1">

                                            {(type === "wanted" || type === "completed" || type === "dropped") && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRead(book);
                                                    }}
                                                    className="text-xs bg-primary text-white py-1 rounded-lg"
                                                >
                                                    {type === "wanted" ? "Read" : "Read Again"}
                                                </button>
                                            )}

                                            {/* continue btn */}
                                            {type === "currentlyReading" && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleOpen(bookId);
                                                    }}
                                                    className="text-xs border border-primary text-primary py-1 rounded-lg"
                                                >
                                                    Continue
                                                </button>
                                            )}

                                            {/* remove */}
                                            <button
                                                onClick={(e) => handleRemove(e, bookId)}
                                                className="text-xs text-red-500"
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                    )}

                </div>

            </div>
        </div>
    );
};

export default TrackingPlaylist;