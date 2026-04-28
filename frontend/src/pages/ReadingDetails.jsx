import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaTimes, FaPen } from "react-icons/fa";

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
    const [showPostInput, setShowPostInput] = useState(false);
    const [postContent, setPostContent] = useState("");

    const { currentUser } = useContext(AuthContext);
    const { books, createBookPost } = useContext(DataContext);
    const { trackingData, updateProgress, markCompleted, markDropped } = useContext(TrackingContext);
    const { showToast } = useContext(ToastContext);

    const book = books.find((b) => b.id === id);

    const userTracking = trackingData.find(
        (t) => t.userId === currentUser.id
    );

    const trackingItem = userTracking?.currentlyReading?.find(
        (b) => b.bookId === id
    );

    if (!book) return <p className="p-6">Book not found</p>;
    if (!trackingItem) return <p className="p-6">Not in reading list</p>;

    const totalPages = trackingItem.totalPages || book.pages || 100;

    const progress = Math.min(
        (trackingItem.pagesRead / totalPages) * 100,
        100
    );

    const handleUpdate = async () => {
        const value = Number(pages);

        if (!value || value < 0 || value > totalPages) {
            showToast("Enter valid pages", "error");
            return;
        }

        try {
            await updateProgress(id, value, currentUser);
            setPages("");
            showToast("Progress updated", "success");
        } catch (error) {
            showToast(error.message, "error");
        }
    };

    const handleComplete = async () => {
        await markCompleted(id, currentUser);
        navigate("/app");
    };

    const handleDrop = async () => {
        await markDropped(id, currentUser);
        navigate("/app");
    };

    const handleCreatePost = async () => {
        if (!postContent.trim()) {
            return showToast("Write something", "error");
        }

        try {
            await createBookPost(id, postContent);
            setPostContent("");
            setShowPostInput(false);
            showToast("Posted successfully", "success");
        } catch (error) {
            showToast(error.message, "error");
        }
    };

    return (
        <div className="h-screen flex overflow-hidden">

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="flex-1 flex flex-col">

                <AppNavbar setIsOpen={setIsOpen} />

                <div className="flex-1 overflow-y-auto bg-bgLight dark:bg-darkBg p-4 space-y-6">

                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm text-primary cursor-pointer"
                    >
                        <FaArrowLeft /> Back
                    </button>

                    <div className="bg-white dark:bg-darkCard rounded-2xl p-5 space-y-6">

                        <div className="flex flex-col md:flex-row gap-6">

                            <img
                                src={book.image}
                                alt={book.title}
                                className="w-40 h-56 object-cover rounded-xl"
                            />

                            <div className="flex-1 space-y-4 p-2">

                                <div>
                                    <h1 className="text-xl font-semibold">
                                        {book.title}
                                    </h1>
                                    <p className="text-sm text-gray-500">
                                        {book.author}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600">
                                        {trackingItem.pagesRead} / {totalPages} pages
                                    </p>

                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>

                                {/* update section */}
                                <div className="flex gap-2 items-center">

                                    <input
                                        type="text"
                                        value={pages}
                                        onChange={(e) => setPages(e.target.value)}
                                        placeholder="Update pages..."
                                        className="flex-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 outline-none text-sm"
                                    />

                                    <button
                                        onClick={handleUpdate}
                                        className="px-4 py-2 bg-primary text-white rounded-lg text-sm cursor-pointer"
                                    >
                                        Update
                                    </button>

                                    {/* post icon */}
                                    <button
                                        onClick={() => setShowPostInput((prev) => !prev)}
                                        title="Thoughts about this book?"
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-blue-500 cursor-pointer"
                                    >
                                        <FaPen />
                                    </button>

                                    <button
                                        onClick={handleComplete}
                                        title="Completed"
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-green-500 cursor-pointer"
                                    >
                                        <FaCheck />
                                    </button>

                                    <button
                                        onClick={handleDrop}
                                        title="Drop"
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-red-500 cursor-pointer"
                                    >
                                        <FaTimes />
                                    </button>

                                </div>

                                {/* post input */}
                                {showPostInput && (
                                    <div className="space-y-2">

                                        <textarea
                                            value={postContent}
                                            onChange={(e) => setPostContent(e.target.value)}
                                            placeholder="Write your thoughts..."
                                            className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none text-sm"
                                        />

                                        <div className="flex justify-end gap-2">

                                            <button
                                                onClick={() => setShowPostInput(false)}
                                                className="px-3 py-1 text-sm bg-gray-200 rounded-lg cursor-pointer"
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                onClick={handleCreatePost}
                                                className="px-4 py-1 text-sm bg-primary text-white rounded-lg cursor-pointer"
                                            >
                                                Post
                                            </button>

                                        </div>

                                    </div>
                                )}

                                {/* discussions navigation */}
                                <button
                                    onClick={() => navigate(`/app/book/${id}/discussions`)}
                                    className="w-fit mt-2 px-3 py-2 bg-primary text-white rounded-xl text-sm cursor-pointer"
                                >
                                    View Discussions
                                </button>

                            </div>

                        </div>

                        <p className="text-sm text-gray-600">
                            {book.synopsis || "No description available"}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ReadingDetails;