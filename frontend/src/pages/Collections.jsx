import { useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaTrash } from "react-icons/fa";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";
import CreatePlaylistModal from "../components/app/collections/CreatePlaylistModal";

import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";

const Collections = () => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [search, setSearch] = useState("");

    const {
        collections,
        createCollection,
        deleteCollection,
    } = useContext(DataContext);

    const { currentUser } = useContext(AuthContext);
    const { showToast } = useContext(ToastContext);

    // user collections
    const userCollections = useMemo(() => {
        return collections.filter(
            (col) => col.userId === currentUser.id
        );
    }, [collections, currentUser]);

    // liked playlist (always from full list)
    const likedCollection = useMemo(() => {
        return userCollections.find(
            (col) => col.type === "liked"
        );
    }, [userCollections]);

    // filter only custom playlists
    const filteredCollections = useMemo(() => {
        return userCollections
            .filter((col) => col.type === "custom")
            .filter((col) =>
                (col.name || "")
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
    }, [userCollections, search]);

    // handlers
    const handleNavigate = (id) => {
        navigate(`/app/collections/${id}`);
    };

    const handleCreate = (data) => {
        createCollection(data, currentUser);
        showToast("Playlist created", "success");
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this playlist?")) {
            deleteCollection(id);
            showToast("Playlist deleted", "error");
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="h-screen flex overflow-hidden">

            <title>Your collections | Bookey</title>

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="flex-1 flex flex-col">

                <AppNavbar setIsOpen={setIsOpen} />

                <div className="flex-1 overflow-y-auto bg-bgLight dark:bg-darkBg p-4">

                    {/* header */}
                    <div className="mb-6 space-y-3">
                        <h1 className="text-3xl font-bold text-primary">
                            Your Collections
                        </h1>

                        <p className="text-sm text-gray-600 font-semibold">
                            Manage your personal playlists
                        </p>

                        <input
                            type="text"
                            placeholder="Search playlists..."
                            value={search}
                            onChange={handleSearch}
                            className="w-full sm:w-80 p-3 rounded-xl bg-white dark:bg-darkCard outline-none"
                        />
                    </div>

                    {/* create */}
                    <div className="mb-6">
                        <button
                            onClick={() => setOpenModal(true)}
                            className="bg-primary text-white px-4 py-3 rounded-xl font-semibold"
                        >
                            + Create collection
                        </button>
                    </div>

                    {/* liked */}
                    {likedCollection && (
                        <div className="mb-8">

                            <h2 className="font-semibold mb-3">
                                Default
                            </h2>

                            <div
                                onClick={() => handleNavigate(likedCollection.id)}
                                className={`w-fit bg-white dark:bg-darkCard p-5 rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md transition cursor-pointer`}
                            >
                                <div className="flex items-center gap-3">

                                    <div className="w-12 h-12 bg-primary/20 text-primary flex items-center justify-center rounded-xl">
                                        <FaHeart />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold">
                                            {likedCollection.name || "Liked Books"}
                                        </p>

                                        <p className="text-xs text-gray-600">
                                            {likedCollection?.books?.length || 0} books
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>
                    )}

                    {/* playlists */}
                    <div>
                        <h2 className="font-semibold mb-3">
                            Your Playlists
                        </h2>

                        {filteredCollections.length === 0 ? (
                            <p className="text-sm text-gray-600">
                                No playlists found
                            </p>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

                                {filteredCollections.map((col) => (
                                    <div
                                        key={col.id}
                                        className="bg-white dark:bg-darkCard p-5 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col justify-between"
                                    >

                                        <div
                                            onClick={() => handleNavigate(col.id)}
                                            className="cursor-pointer space-y-2"
                                        >
                                            <p className="font-semibold text-sm truncate">
                                                {col.name || "Untitled Playlist"}
                                            </p>

                                            <p className="text-xs text-gray-600">
                                                {col?.books?.length || 0} books
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => handleDelete(col.id)}
                                            className="mt-4 text-red-500 text-xs flex items-center gap-1"
                                        >
                                            <FaTrash size={10} />
                                            Delete
                                        </button>

                                    </div>
                                ))}

                            </div>
                        )}

                    </div>
                </div>
            </div>

            <CreatePlaylistModal
                isOpen={openModal}
                setIsOpen={setOpenModal}
                onCreate={handleCreate}
            />

        </div>
    );
};

export default Collections;