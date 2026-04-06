import { useState, useContext } from "react";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";

import BookCard from "../components/app/books/BookCard";
import CollectionCard from "../components/app/collections/CollectionCard";
import ClubCard from "../components/app/clubs/ClubCard";
import AddBookModal from "../components/app/books/AddBookModal";

import { DataContext } from "../context/DataContext";

const Clubs = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const { addBook } = useContext(DataContext);

    // random clubs data
    const clubs = [
        {
            id: 1,
            name: "Sci-Fi Explorers",
            genre: "scifi",
            members: 120
        },
        {
            id: 2,
            name: "Self Growth Club",
            genre: "self help",
            members: 80
        },
        {
            id: 3,
            name: "Manga World",
            genre: "manga",
            members: 200
        },
    ];

    return (
        <div className="h-screen flex overflow-hidden">

            <title>Your clubs | Bookey</title>

            <Sidebar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onAddBook={() => setOpenModal(true)}
            />

            {/* main app */}
            <div className="flex-1 flex flex-col">

                <AppNavbar setIsOpen={setIsOpen} />

                {/* content */}
                <div className="flex-1 overflow-y-auto bg-bgLight dark:bg-darkBg p-4">

                    <div className="mb-6 space-y-2">
                        <h1 className="text-4xl font-bold text-primary capitalize">
                            Your Clubs
                        </h1>
                        <p className="text-sm text-gray-600 font-semibold">
                            Discover and join clubs
                        </p>
                    </div>

                    {/* clubs */}
                    <div>
                        <h2 className="text-lg font-semibold mb-3 text-primary">
                            Clubs
                        </h2>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {clubs.map((club) => (
                                <ClubCard
                                    key={club.id}
                                    club={club}
                                    onClick={() =>
                                        console.log("Go to club", club.id)
                                    }
                                />
                            ))}
                        </div>
                    </div>

                </div>

            </div>

            {/* add book btn */}
            <AddBookModal
                isOpen={openModal}
                setIsOpen={setOpenModal}
                onSubmit={addBook}
            />

        </div>
    );
};

export default Clubs;