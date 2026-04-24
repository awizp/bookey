import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";

import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";
import { TrackingContext } from "../context/TrackingContext";
import { ToastContext } from "../context/ToastContext";

const ReadingDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [pages, setPages] = useState("");

    const { currentUser } = useContext(AuthContext);
    const { books } = useContext(DataContext);
    const {
        trackingData,
        updateProgress,
        markCompleted,
        markDropped
    } = useContext(TrackingContext);
    const { showToast } = useContext(ToastContext);

    // get book
    const book = books.find((b) => b.id === id);

    // get tracking
    const userTracking = trackingData.find(
        (t) => t.userId === currentUser.id
    );

    const trackingItem = userTracking?.currentlyReading?.find(
        (b) => b.bookId === id
    );

    // fallback
    if (!book) {
        return <p className="p-6">Book not found</p>;
    }

    if (!trackingItem) {
        return <p className="p-6">This book is not in currently reading</p>;
    }

    const totalPages = trackingItem.totalPages || book.pages || 100;

    const progress = Math.min(
        (trackingItem.pagesRead / totalPages) * 100,
        100
    );

    // update progress
    const handleUpdate = () => {

        const value = Number(pages);

        if (!value || value < 0 || value > totalPages) {
            showToast("Enter valid pages", "error");
            return;
        }

        updateProgress(id, value, currentUser);
        setPages("");
        showToast("Progress updated", "success");
    };

    // complete book
    const handleComplete = () => {
        markCompleted(id, currentUser);
        showToast("Marked as completed", "success");
        navigate("/app");
    };

    // drop book
    const handleDrop = () => {
        markDropped(id, currentUser);
        showToast("Marked as dropped", "info");
        navigate("/app");
    };

    return (
        <div className="h-screen flex overflow-hidden">

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="flex-1 flex flex-col">

                <AppNavbar setIsOpen={setIsOpen} />

                <div className="flex-1 overflow-y-auto bg-bgLight dark:bg-darkBg p-4 space-y-6">

                    {/* back */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm text-primary font-semibold"
                    >
                        <FaArrowLeft />
                        Back
                    </button>

                    {/* container */}
                    <div className="bg-white dark:bg-darkCard rounded-2xl p-5 space-y-6">

                        <div className="flex flex-col md:flex-row gap-8">

                            {/* image */}
                            <div className="w-full md:w-60 rounded-xl overflow-hidden border-2 border-primary">
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* details */}
                            <div className="flex-1 space-y-4">

                                <div>
                                    <h1 className="text-xl font-semibold">
                                        {book.title}
                                    </h1>

                                    <p className="text-sm text-gray-500">
                                        by {book.author}
                                    </p>
                                </div>

                                {/* genres */}
                                <div className="flex flex-wrap gap-2">
                                    {book.genre.map((g, i) => (
                                        <span
                                            key={i}
                                            className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
                                        >
                                            {g}
                                        </span>
                                    ))}
                                </div>

                                {/* progress */}
                                <div className="space-y-2">

                                    <p className="text-sm text-gray-600">
                                        {trackingItem.pagesRead} / {totalPages} pages
                                    </p>

                                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>

                                </div>

                                {/* update */}
                                <div className="flex gap-2">

                                    <input
                                        type="number"
                                        value={pages}
                                        onChange={(e) => setPages(e.target.value)}
                                        placeholder="Update pages..."
                                        className="flex-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 outline-none text-sm"
                                    />

                                    <button
                                        onClick={handleUpdate}
                                        className="px-4 py-2 bg-primary text-white rounded-lg text-sm"
                                    >
                                        Update
                                    </button>

                                </div>

                                {/* actions */}
                                <div className="flex gap-3 flex-wrap">

                                    <button
                                        onClick={handleComplete}
                                        className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm"
                                    >
                                        Mark Completed
                                    </button>

                                    <button
                                        onClick={handleDrop}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
                                    >
                                        Drop Book
                                    </button>

                                </div>

                            </div>

                        </div>

                        {/* synopsis */}
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                            {book.synopsis || "No description available."}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ReadingDetails;