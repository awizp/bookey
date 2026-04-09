import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";
import CreatePlaylistModal from "../components/app/collections/CreatePlaylistModal";

import { DataContext } from "../context/DataContext";

const Collections = () => {

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const { collections, createCollection } = useContext(DataContext);

    return (
        <div className="h-screen flex overflow-hidden">

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* main */}
            <div className="flex-1 flex flex-col">

                <AppNavbar setIsOpen={setIsOpen} />

                {/* content */}
                <div className="flex-1 overflow-y-auto bg-bgLight dark:bg-darkBg p-4">

                    <div className="mb-6 space-y-2">
                        <h1 className="text-3xl font-bold text-primary">
                            Your Collections
                        </h1>
                        <p className="text-sm text-gray-600 font-semibold">
                            Organize your favorite books into playlists
                        </p>
                    </div>

                    {/* create playlist btn */}
                    <div className="mb-6">
                        <button
                            onClick={() => setOpenModal(true)}
                            className="bg-primary cursor-pointer text-white px-4 py-3 rounded-xl flex items-center gap-2 font-semibold"
                        >
                            + Create Playlist
                        </button>
                    </div>

                    {/* default collection */}
                    <div className="mb-8">
                        <h2 className="font-semibold mb-3">Default</h2>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

                            <div className="bg-white dark:bg-darkCard p-4 rounded-xl flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/20 text-primary flex items-center justify-center rounded-lg">
                                    <FaHeart />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">
                                        Liked Books
                                    </p>
                                    <p className="text-xs text-textSecondary">
                                        Your saved favorites
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* user playlits */}
                    <div>
                        <h2 className="font-semibold mb-3">
                            Your Playlists
                        </h2>

                        {collections.length === 0 ? (
                            <p className="text-sm text-gray-500">
                                No playlists created yet
                            </p>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

                                {collections.map((col) => (
                                    <div
                                        key={col.id}
                                        onClick={() =>
                                            navigate(`/app/collections/${col.id}`)
                                        }
                                        className="bg-white dark:bg-darkCard p-4 rounded-xl hover:shadow-sm transition cursor-pointer capitalize"
                                    >
                                        <p className="font-semibold text-sm">
                                            {col.name}
                                        </p>

                                        <p className="text-xs text-textSecondary mt-1">
                                            {col.books.length} books
                                        </p>
                                    </div>
                                ))}

                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* create playlist modal */}
            <CreatePlaylistModal
                isOpen={openModal}
                setIsOpen={setOpenModal}
                onCreate={createCollection}
            />

        </div>
    );
};

export default Collections;