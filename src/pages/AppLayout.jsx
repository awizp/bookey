import { useState, useContext } from "react";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";

import BookCard from "../components/app/books/BookCard";
import CollectionCard from "../components/app/collections/CollectionCard";
import ClubCard from "../components/app/clubs/ClubCard";
import AddBookModal from "../components/app/books/AddBookModal";

import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";

const AppLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const { books, addBook } = useContext(DataContext);
    const { currentUser } = useContext(AuthContext);

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

            <title>Welcome to the dashboard | Bookey</title>

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
                            Hello, {currentUser?.name} 👋
                        </h1>
                        <p className="text-sm text-textSecondary">
                            Discover books, build collections, and join clubs
                        </p>
                    </div>

                    {/* collections */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold mb-3 text-primary">
                            Your Collections
                        </h2>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <CollectionCard type="liked" />
                            <CollectionCard
                                type="create"
                                onClick={() => console.log("Create playlist")}
                            />
                        </div>
                    </div>

                    {/* books */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold mb-3 text-primary">
                            Recommended Books
                        </h2>

                        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
                            {books.slice(0, 8).map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))}
                        </div>
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

export default AppLayout;