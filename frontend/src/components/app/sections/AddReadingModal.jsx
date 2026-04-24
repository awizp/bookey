import { useContext, useState } from "react";
import { FaTimes } from "react-icons/fa";

import { DataContext } from "../../../context/DataContext";
import { AuthContext } from "../../../context/AuthContext";
import { TrackingContext } from "../../../context/TrackingContext";
import { ToastContext } from "../../../context/ToastContext";

const AddReadingModal = ({ isOpen, setIsOpen }) => {

    const { books } = useContext(DataContext);
    const { currentUser } = useContext(AuthContext);
    const { trackingData, addToReading } = useContext(TrackingContext);
    const { showToast } = useContext(ToastContext);

    const [search, setSearch] = useState("");

    if (!isOpen) return null;

    const userTracking = trackingData.find(
        (t) => t.userId === currentUser.id
    );

    const readingIds =
        userTracking?.currentlyReading?.map((b) => b.bookId) || [];

    // filter the books
    const query = search.trim().toLowerCase();

    let filteredBooks = [];

    if (!books || books.length === 0) {
        filteredBooks = [];
    } else if (!query) {
        filteredBooks = books;
    } else {
        filteredBooks = books.filter((b) => {
            const title = b?.title?.toLowerCase() || "";
            const author = b?.author?.toLowerCase() || "";

            return title.includes(query) || author.includes(query);
        });
    }

    const handleAdd = (book) => {

        if (readingIds.includes(book.id)) {
            showToast("Already in reading list", "info");
            return;
        }

        addToReading(book, currentUser);
        showToast("Added to reading", "success");
        setIsOpen(false);
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

            <div className="w-full max-w-lg bg-white dark:bg-darkCard rounded-2xl p-5 space-y-4">

                {/* header */}
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg">
                        Add to Reading
                    </h2>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:text-red-500"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* search */}
                <input
                    type="text"
                    placeholder="Search books..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary text-sm"
                />

                {/* list */}
                <div className="max-h-80 overflow-y-auto space-y-2">

                    {!books || books.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            No books available
                        </p>
                    ) : filteredBooks.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            No books found
                        </p>
                    ) : (

                        filteredBooks.map((book) => {

                            const isAdded = readingIds.includes(book.id);

                            return (
                                <div
                                    key={book.id}
                                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-primary/10"
                                >

                                    <div className="w-10 h-14 overflow-hidden rounded-md">
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-sm font-medium">
                                            {book.title}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {book.author}
                                        </p>
                                    </div>

                                    {isAdded ? (
                                        <span className="text-xs text-gray-400">
                                            Added
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => handleAdd(book)}
                                            className="text-xs bg-primary text-white px-3 py-1 rounded-lg"
                                        >
                                            Add
                                        </button>
                                    )}

                                </div>
                            );
                        })

                    )}

                </div>

            </div>

        </div>
    );
};

export default AddReadingModal;