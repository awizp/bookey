import { useState, useContext } from "react";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";

import BookCard from "../components/app/books/BookCard";
import CollectionCard from "../components/app/collections/CollectionCard";
import ClubCard from "../components/app/clubs/ClubCard";
import AddBookModal from "../components/app/books/AddBookModal";
import UserDashboard from "../components/app/dashboard/UserDashboard";
import ModeratorDashboard from "../components/app/dashboard/ModeratorDashboard";
import AdminDashboard from "../components/app/dashboard/AdminDashboard";

import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";

const AppLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const { books, addBook } = useContext(DataContext);
    const { currentUser } = useContext(AuthContext);
    const { showToast } = useContext(ToastContext);

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

    const handleAddBook = async (bookData) => {
        try {
            await addBook(bookData);
            showToast("Book added", "success");
        } catch (error) {
            showToast(error.message, "error");
        }
    };

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

                    {currentUser?.role === "admin" && <AdminDashboard />}

                    {currentUser?.role === "moderator" && <ModeratorDashboard />}

                    {currentUser?.role === "user" && <UserDashboard />}

                </div>

            </div>

            {/* add book btn */}
            <AddBookModal
                isOpen={openModal}
                setIsOpen={setOpenModal}
                onSubmit={handleAddBook}
            />

        </div>
    );
};

export default AppLayout;
