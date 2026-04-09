import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";
import BookCard from "../components/app/books/BookCard";

import { DataContext } from "../context/DataContext";

const CollectionDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const { collections, setCollections } = useContext(DataContext);

    const collection = collections.find((c) => c.id === id);

    if (!collection) {
        return (
            <div className="p-6">
                <p>Collection not found</p>
            </div>
        );
    }

    // remove book from collection
    const removeBook = (bookId) => {
        const updated = collections.map((col) =>
            col.id === id
                ? {
                    ...col,
                    books: col.books.filter((b) => b.id !== bookId),
                }
                : col
        );

        setCollections(updated);
    };

    return (
        <div className="h-screen flex overflow-hidden">

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* content */}
            <div className="flex-1 flex flex-col">

                <AppNavbar setIsOpen={setIsOpen} />

                <div className="flex-1 overflow-y-auto bg-bgLight dark:bg-darkBg p-4">

                    {/* back btn */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm mb-4 text-primary cursor-pointer font-semibold"
                    >
                        <FaArrowLeft />
                        Back
                    </button>

                    <div className="mb-6 space-y-2">
                        <h1 className="text-2xl font-bold capitalize">
                            {collection.name}
                        </h1>
                        <p className="text-sm text-gray-600 font-semibold">
                            {collection.books.length} books in this playlist
                        </p>
                    </div>

                    {/* book details */}
                    {collection.books.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            No books added yet
                        </p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

                            {collection.books.map((book) => (
                                <div key={book.id} className="relative group">

                                    <BookCard book={book} />

                                    {/* remove book btn */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeBook(book.id);
                                        }}
                                        className="absolute top-2 left-2 bg-white dark:bg-darkCard p-2 rounded-full shadow text-red-500 opacity-0 group-hover:opacity-100 transition"
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