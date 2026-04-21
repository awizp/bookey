import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaArrowLeft, FaUsers, FaTrash } from "react-icons/fa";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";

import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";

const ClubDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState("");
    const [type, setType] = useState("post");
    const [activeTab, setActiveTab] = useState("post");

    const {
        users,
        clubs,
        setClubs,
        joinClub,
        leaveClub,
        addPost,
        deletePost,
    } = useContext(DataContext);

    const { currentUser } = useContext(AuthContext);
    const { showToast } = useContext(ToastContext);

    const club = clubs.find((c) => c.id === id);
    if (!club) return <div className="p-6">Club not found</div>;

    const isMember = club.members.includes(currentUser.id);

    // if user blocked 
    const isBlocked =
        currentUser.blockedUntil &&
        new Date().getTime() < currentUser.blockedUntil;

    // filter posts
    const filteredPosts = club.posts.filter(
        (post) => post.type === activeTab
    );

    // club functions
    const handleBack = () => navigate(-1);

    const handleJoin = () => {
        if (isBlocked) {
            showToast("You are blocked temporarily", "error");
            return;
        }

        joinClub(id, currentUser);
        showToast("Joined club", "success");
    };

    const handleLeave = () => {
        if (isBlocked) {
            showToast("You are blocked temporarily", "error");
            return;
        }

        leaveClub(id, currentUser);
        showToast("Left club", "info");
    };

    const handleDeleteClub = () => {
        const isAdmin = currentUser.role === "admin";
        const isOwner = club.createdBy === currentUser.id;

        if (!isAdmin && !isOwner) {
            showToast("No permission", "error");
            return;
        }

        if (window.confirm("Delete this club?")) {
            const updated = clubs.filter((c) => c.id !== id);
            setClubs(updated);
            navigate("/app/clubs");
            showToast("Club deleted", "error");
        }
    };

    const handlePost = () => {
        if (isBlocked) {
            showToast("You are blocked temporarily", "error");
            return;
        }

        if (!content.trim()) return;

        addPost(id, { content, type }, currentUser);
        setContent("");
        showToast("Post published", "success");
    };

    const handleDeletePost = (postId) => {
        if (window.confirm("Delete this post?")) {
            deletePost(id, postId);
            showToast("Post removed", "error");
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const canDeletePost = (post) => {
        const isAdmin = currentUser.role === "admin";
        const isOwner = post.createdBy === currentUser.id;
        const postUser = users.find((u) => u.id === post.createdBy);
        const isModerator = currentUser.role === "moderator";

        if (isAdmin) return true;
        if (isOwner) return true;
        if (isModerator && postUser?.role === "user") return true;

        return false;
    };

    return (
        <div className="h-screen flex overflow-hidden">

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="flex-1 flex flex-col">

                <AppNavbar setIsOpen={setIsOpen} />

                <div className="flex-1 overflow-y-auto bg-bgLight dark:bg-darkBg p-4 space-y-6">

                    {/* back btn */}
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-sm text-primary font-semibold"
                    >
                        <FaArrowLeft /> Back
                    </button>

                    {/* if user blocked */}
                    {isBlocked && (
                        <p className="text-xs text-red-500">
                            You are temporarily blocked from actions
                        </p>
                    )}

                    <div className="bg-white dark:bg-darkCard p-5 rounded-2xl space-y-4">

                        <div className="flex justify-between items-start">

                            <div>
                                <h1 className="text-2xl font-bold">
                                    {club.name}
                                </h1>
                                <p className="text-sm text-gray-600">
                                    {club.genre}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <FaUsers /> {club.members.length}
                                </div>

                                {isMember ? (
                                    <button
                                        onClick={handleLeave}
                                        disabled={isBlocked}
                                        className="text-xs px-3 py-1 rounded-xl bg-gray-100 dark:bg-gray-800 disabled:opacity-50"
                                    >
                                        Leave
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleJoin}
                                        disabled={isBlocked}
                                        className="text-xs px-3 py-1 rounded-xl bg-primary text-white disabled:opacity-50"
                                    >
                                        Join
                                    </button>
                                )}

                                {currentUser.role === "moderator" && (
                                    <button
                                        onClick={handleDeleteClub}
                                        className="text-red-500"
                                    >
                                        <FaTrash />
                                    </button>
                                )}

                            </div>

                        </div>

                    </div>

                    {/* create posts */}
                    {isMember && (
                        <div className="bg-white dark:bg-darkCard p-4 rounded-2xl space-y-3">

                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Share something..."
                                className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none"
                            />

                            <div className="flex justify-between items-center">

                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="text-sm bg-gray-100 dark:bg-gray-800 rounded-lg px-2 py-1"
                                >
                                    <option value="post">Post</option>
                                    <option value="quote">Quote</option>
                                </select>

                                <button
                                    onClick={handlePost}
                                    disabled={isBlocked}
                                    className="bg-primary text-white px-4 py-2 rounded-xl disabled:opacity-50"
                                >
                                    Publish
                                </button>

                            </div>

                        </div>
                    )}

                    {/* post or quote tabs */}
                    <div className="flex gap-2">

                        <button
                            onClick={() => handleTabChange("post")}
                            className={`px-4 py-2 rounded-xl text-sm ${activeTab === "post"
                                    ? "bg-primary text-white"
                                    : "bg-gray-100 dark:bg-gray-800"
                                }`}
                        >
                            Posts
                        </button>

                        <button
                            onClick={() => handleTabChange("quote")}
                            className={`px-4 py-2 rounded-xl text-sm ${activeTab === "quote"
                                    ? "bg-primary text-white"
                                    : "bg-gray-100 dark:bg-gray-800"
                                }`}
                        >
                            Quotes
                        </button>

                    </div>

                    {/* feed */}
                    <div className="space-y-4">

                        {filteredPosts.length === 0 ? (
                            <p className="text-sm text-gray-600">
                                No {activeTab === "post" ? "posts" : "quotes"} yet
                            </p>
                        ) : (
                            filteredPosts.map((post) => {

                                const canDelete = canDeletePost(post);

                                return (
                                    <div
                                        key={post.id}
                                        className="bg-white dark:bg-darkCard p-4 rounded-2xl shadow-sm hover:shadow-md transition"
                                    >

                                        <div className="flex justify-between items-center">

                                            <div className="flex items-center gap-3">

                                                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold">
                                                    {post.userName?.charAt(0)}
                                                </div>

                                                <div>
                                                    <p className="text-sm font-semibold">
                                                        {post.userName}
                                                    </p>
                                                    <p className="text-xs text-gray-600">
                                                        {new Date(post.createdAt).toLocaleString()}
                                                    </p>
                                                </div>

                                            </div>

                                            {canDelete && (
                                                <button
                                                    onClick={() => handleDeletePost(post.id)}
                                                    className="text-gray-400 hover:text-red-500"
                                                >
                                                    <FaTrash size={14} />
                                                </button>
                                            )}

                                        </div>

                                        <div className="mt-4">

                                            {post.type === "quote" ? (
                                                <div className="text-sm italic text-gray-700 dark:text-gray-300">
                                                    <span className="text-primary text-lg">“ </span>
                                                    {post.content}
                                                    <span className="text-primary text-lg"> ”</span>
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                                                    {post.content}
                                                </p>
                                            )}

                                        </div>

                                    </div>
                                );
                            })
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
};

export default ClubDetails;