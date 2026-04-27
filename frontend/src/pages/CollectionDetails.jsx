import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";
import BookCard from "../components/app/books/BookCard";

import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";

const CollectionDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const {
        collections,
        removeBookFromCollection
    } = useContext(DataContext);

    const { currentUser } = useContext(AuthContext);
    const { showToast } = useContext(ToastContext);

    const collection = collections.find((c) => c.id === id);

    if (!collection || collection.userId !== currentUser.id) {
        showToast("Access denied", "error");
        navigate("/app/collections");
        return null;
    }

    const handleBack = () => {
        navigate(-1);
    };

    const handleRemove = async (bookId) => {

        if (!window.confirm("Remove this book from playlist?")) return;

        try {
            await removeBookFromCollection(id, bookId);
            showToast("Removed from playlist", "info");
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
                        onClick={handleBack}
                        className="flex items-center gap-2 text-sm text-primary font-semibold"
                    >
                        <FaArrowLeft />
                        Back
                    </button>

                    <div className="bg-white dark:bg-darkCard p-5 rounded-2xl">

                        <h1 className="text-2xl font-bold capitalize">
                            {collection.name || "Untitled Playlist"}
                        </h1>

                        <p className="text-sm text-gray-600 mt-1">
                            {collection?.books?.length || 0} books
                        </p>

                    </div>

                    {collection.books.length === 0 ? (
                        <div className="text-center text-sm text-gray-600 py-10">
                            No books added yet
                        </div>
                    ) : (

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

                            {collection.books.map((book) => (
                                <div key={book.id} className="relative group">

                                    <BookCard book={book} />

                                    <button
                                        onClick={() => handleRemove(book.id)}
                                        className="absolute top-2 left-2 bg-white dark:bg-darkCard p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition text-red-500"
                                    >
                                        <FaTrash size={12} />
                                    </button>

                                </div>
                            ))}

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default CollectionDetails;
