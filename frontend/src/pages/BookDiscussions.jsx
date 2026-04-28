import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";

import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";

const BookDiscussions = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);

    const { getBookPosts, deleteBookPost, books } = useContext(DataContext);
    const { currentUser } = useContext(AuthContext);
    const { showToast } = useContext(ToastContext);

    const book = books.find((b) => b.id === id);

    const POSTS_PER_PAGE = 10;

    const loadPosts = async () => {
        try {
            const data = await getBookPosts(id);
            setPosts(data);
        } catch (err) {
            showToast(err.message, "error");
        }
    };

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await getBookPosts(id);
                setPosts(data);
            } catch (err) {
                showToast(err.message, "error");
            }
        };

        loadPosts();
    }, [id]);

    const handleDelete = async (postId) => {
        try {
            await deleteBookPost(id, postId);
            setPosts((prev) => prev.filter((p) => p._id !== postId));
            showToast("Post deleted", "success");
        } catch (err) {
            showToast(err.message, "error");
        }
    };

    // pagination logic
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const start = (page - 1) * POSTS_PER_PAGE;
    const currentPosts = posts.slice(start, start + POSTS_PER_PAGE);

    return (
        <div className="h-screen flex overflow-hidden">

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="flex-1 flex flex-col">

                <AppNavbar setIsOpen={setIsOpen} />

                <div className="flex-1 overflow-y-auto p-4 bg-bgLight dark:bg-darkBg space-y-4">

                    {/* back */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-primary text-sm cursor-pointer"
                    >
                        <FaArrowLeft /> Back
                    </button>

                    <h1 className="font-semibold">
                        {book ? <span className="text-primary capitalize">`${book.title} Discussions`</span> : "Discussions"}
                    </h1>

                    {/* posts */}
                    <div className="space-y-3">
                        {currentPosts.length === 0 ? (
                            <p className="text-sm text-gray-500">
                                No discussions yet
                            </p>
                        ) : (
                            currentPosts.map((post) => {
                                const isAdmin = currentUser.role === "admin";
                                const isModerator = currentUser.role === "moderator";
                                const isAuthor = post.createdBy === currentUser.id;
                                const authorRole = post.authorRole || "user";

                                let canDelete = false;

                                if (isAdmin) {
                                    canDelete = true;
                                } else if (isModerator) {
                                    if (isAuthor) {
                                        canDelete = true;
                                    } else if (authorRole === "user") {
                                        canDelete = true;
                                    }
                                } else if (isAuthor) {
                                    canDelete = true;
                                }

                                return (
                                    <div
                                        key={post._id}
                                        className="bg-white dark:bg-darkCard p-4 rounded-2xl shadow-sm"
                                    >

                                        <div className="flex justify-between items-center">

                                            <div className="flex items-center gap-2">

                                                {/* avatar */}
                                                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">
                                                    {post.userName?.charAt(0)?.toUpperCase()}
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-medium">
                                                        {post.userName}
                                                    </p>

                                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                                        {post.authorRole}
                                                    </span>
                                                </div>

                                            </div>

                                            {canDelete && (
                                                <button
                                                    onClick={() => handleDelete(post._id)}
                                                    className="text-red-500 text-xs cursor-pointer"
                                                >
                                                    <FaTrash />
                                                </button>
                                            )}

                                        </div>

                                        <p className="text-sm mt-2">
                                            {post.content}
                                        </p>

                                        <p className="text-[10px] text-gray-500 mt-2">
                                            {new Date(post.createdAt).toLocaleString()}
                                        </p>

                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 pt-4">

                            <button
                                disabled={page === 1}
                                onClick={() => setPage((p) => p - 1)}
                                className="px-3 py-1 bg-gray-200 rounded cursor-pointer disabled:opacity-50"
                            >
                                Prev
                            </button>

                            <span className="text-sm">
                                {page} / {totalPages}
                            </span>

                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage((p) => p + 1)}
                                className="px-3 py-1 bg-gray-200 rounded cursor-pointer disabled:opacity-50"
                            >
                                Next
                            </button>

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
};

export default BookDiscussions;