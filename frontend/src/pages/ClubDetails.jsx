import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaArrowLeft, FaTrash, FaPlus } from "react-icons/fa";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";
import CreatePostModal from "../components/app/clubs/CreatePostModal";
import PostCard from "../components/app/clubs/PostCard";

import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";

const ClubDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [openPostModal, setOpenPostModal] = useState(false);

    // tabs and pagination
    const [activeTab, setActiveTab] = useState("posts");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    const { clubs, deleteClub, addPost, deletePost, joinClub, leaveClub } = useContext(DataContext);
    const { currentUser } = useContext(AuthContext);
    const { showToast } = useContext(ToastContext);

    const club = clubs.find((c) => c.id === id);
    if (!club) return <div className="p-6">Club not found</div>;

    const isAdmin = currentUser.role === "admin";
    const isModerator = currentUser.role === "moderator";
    const isOwner = club.createdBy === currentUser.id;
    const isMember = club.members.includes(currentUser.id);

    // filter posts
    const filteredPosts = club.posts.filter((post) =>
        activeTab === "posts"
            ? post.type === "text"
            : post.type === "quote"
    );

    // pagination logic
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;

    const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

    // delete club
    const handleDeleteClub = async () => {
        if (!isAdmin && !isModerator && !isOwner) {
            return showToast("No permission", "error");
        }

        if (!window.confirm("Delete this club?")) return;

        try {
            await deleteClub(id);
            showToast("Club deleted", "error");
            navigate("/app/clubs", { replace: true });
        } catch (error) {
            showToast(error.message, "error");
        }
    };

    // create post
    const handleCreatePost = async (data) => {
        try {
            await addPost(id, data);
            showToast("Published", "success");
        } catch (error) {
            showToast(error.message, "error");
        }
    };

    // delete post
    const handleDeletePost = async (postId) => {
        try {
            await deletePost(id, postId);
            showToast("Post deleted", "info");
        } catch (error) {
            showToast(error.message, "error");
        }
    };

    // join club
    const handleJoinClub = async () => {
        try {
            await joinClub(id);
            showToast("Joined club", "success");
        } catch (error) {
            showToast(error.message, "error");
        }
    };

    // leave club
    const handleLeaveClub = async () => {
        try {
            await leaveClub(id);
            showToast("Left club", "info");
        } catch (error) {
            showToast(error.message, "error");
        }
    };

    return (
        <div className="h-screen flex">

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="flex-1 flex flex-col">

                <AppNavbar setIsOpen={setIsOpen} />

                <div className="flex-1 p-4 bg-bgLight dark:bg-darkBg space-y-6 overflow-y-auto">

                    {/* back */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-primary text-sm"
                    >
                        <FaArrowLeft /> Back
                    </button>

                    {/* header */}
                    <div className="bg-white dark:bg-darkCard p-5 rounded-2xl space-y-4">

                        <div className="flex justify-between items-center">

                            <div>
                                <h1 className="text-xl font-semibold">{club.name}</h1>
                                <p className="text-sm text-gray-600">{club.genre}</p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">

                                {/* join/leave */}
                                <button
                                    onClick={() => isMember ? handleLeaveClub() : handleJoinClub()}
                                    disabled={isOwner}
                                    className={`text-xs px-3 py-1 rounded-full transition ${isOwner ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed" : isMember ? "bg-gray-100 dark:bg-gray-800 cursor-pointer" : "bg-primary text-white cursor-pointer"}`}
                                >
                                    {isOwner ? "Owner" : isMember ? "Leave" : "Join"}
                                </button>

                                {/* post */}
                                {isMember && (
                                    <button
                                        onClick={() => setOpenPostModal(true)}
                                        className="flex items-center gap-1 sm:gap-2 text-xs px-3 py-1 rounded-full bg-primary text-white"
                                    >
                                        <FaPlus /> <span className="hidden sm:inline">Post</span>
                                    </button>
                                )}

                                {/* delete club */}
                                {(isAdmin || isModerator || isOwner) && (
                                    <button onClick={handleDeleteClub} className="text-red-500">
                                        <FaTrash />
                                    </button>
                                )}

                            </div>
                        </div>
                    </div>

                    {/* tabs */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveTab("posts")}
                            className={`text-sm px-4 py-1 rounded-full ${activeTab === "posts" ? "bg-primary text-white" : "bg-gray-100 dark:bg-gray-800"}`}
                        >
                            Posts
                        </button>

                        <button
                            onClick={() => setActiveTab("quotes")}
                            className={`text-sm px-4 py-1 rounded-full ${activeTab === "quotes" ? "bg-primary text-white" : "bg-gray-100 dark:bg-gray-800"}`}
                        >
                            Quotes
                        </button>
                    </div>

                    {/* posts */}
                    <div className="space-y-3">
                        {currentPosts.length === 0 ? (
                            <p className="text-sm text-gray-500">No {activeTab} yet</p>
                        ) : (
                            currentPosts.map((post) => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    currentUser={currentUser}
                                    onDelete={handleDeletePost}
                                />
                            ))
                        )}
                    </div>

                    {/* pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">

                            {/* prev */}
                            <button
                                onClick={() => setCurrentPage((p) => p - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 text-xs rounded bg-gray-100 dark:bg-gray-800 disabled:opacity-50"
                            >
                                Prev
                            </button>

                            {/* page numbers */}
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1 text-xs rounded ${currentPage === i + 1
                                        ? "bg-primary text-white"
                                        : "bg-gray-100 dark:bg-gray-800"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            {/* next */}
                            <button
                                onClick={() => setCurrentPage((p) => p + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 text-xs rounded bg-gray-100 dark:bg-gray-800 disabled:opacity-50"
                            >
                                Next
                            </button>

                        </div>
                    )}

                </div>
            </div>

            {/* modal */}
            <CreatePostModal
                isOpen={openPostModal}
                setIsOpen={setOpenPostModal}
                onSubmit={handleCreatePost}
            />
        </div>
    );
};

export default ClubDetails;