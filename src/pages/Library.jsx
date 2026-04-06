import { useContext, useState, useMemo } from "react";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";
import BookCard from "../components/app/books/BookCard";

import { DataContext } from "../context/DataContext";

const Library = () => {

    const { books } = useContext(DataContext);

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("all");

    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 10;

    const genres = useMemo(() => {
        const allGenres = books.flatMap((b) => b.genre);
        return ["all", ...new Set(allGenres)];
    }, [books]);

    // filter books
    const filteredBooks = useMemo(() => {
        return books.filter((book) => {
            const matchSearch = book.title
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchGenre = selectedGenre === "all" || book.genre.includes(selectedGenre);

            return matchSearch && matchGenre;
        });
    }, [books, search, selectedGenre]);

    // pagination
    const totalPages = Math.ceil(
        filteredBooks.length / booksPerPage
    );

    const paginatedBooks = filteredBooks.slice(
        (currentPage - 1) * booksPerPage,
        currentPage * booksPerPage
    );

    return (
        <div className="h-screen flex overflow-hidden">

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* main component */}
            <div className="flex-1 flex flex-col">

                <AppNavbar setIsOpen={setIsOpen} />

                {/* content */}
                <div className="flex-1 overflow-y-auto bg-bgLight dark:bg-darkBg p-4">

                    <div className="mb-6 space-y-2">
                        <h1 className="text-4xl font-bold text-primary">
                            Library
                        </h1>
                        <p className="text-sm text-textSecondary">
                            Explore all books available in the platform
                        </p>
                    </div>

                    {/* search filter */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                        <input
                            type="text"
                            placeholder="Search books..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="flex-1 p-3 rounded-xl bg-white dark:bg-darkCard border-2 outline-none focus:border-primary"
                        />

                        {/* genre filter */}
                        <select
                            value={selectedGenre}
                            onChange={(e) => {
                                setSelectedGenre(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="p-3 rounded-xl bg-white dark:bg-darkCard border-2 focus:border-primary cursor-pointer outline-none"
                        >
                            {genres.map((genre, idx) => (
                                <option key={idx} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>

                    </div>

                    {/* book list */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

                        {paginatedBooks.length > 0 ? (
                            paginatedBooks.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">
                                No books found
                            </p>
                        )}

                    </div>

                    {/* pagination area */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8 gap-2 flex-wrap">

                            <button
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage((prev) => prev - 1)
                                }
                                className="px-3 py-1 rounded-lg border disabled:opacity-50 cursor-pointer"
                            >
                                Prev
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1 rounded-lg border text-sm ${currentPage === i + 1 ? "bg-primary text-white" : ""}`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                    setCurrentPage((prev) => prev + 1)
                                }
                                className="px-3 py-1 rounded-lg border disabled:opacity-50 cursor-pointer"
                            >
                                Next
                            </button>

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Library;