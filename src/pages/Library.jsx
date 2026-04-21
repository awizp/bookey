import { useContext, useState, useMemo } from "react";
import { FaSlidersH, FaSort, FaTimes } from "react-icons/fa";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";
import BookCard from "../components/app/books/BookCard";

import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";

const Library = () => {

    const { books } = useContext(DataContext);
    const { currentUser } = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);

    const [showGenres, setShowGenres] = useState(false);
    const [showSort, setShowSort] = useState(false);

    const [sortType, setSortType] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 10;

    // genres from json
    const genres = useMemo(() => {
        const all = books.flatMap((b) => b.genre || []);
        return [...new Set(all)];
    }, [books]);

    // toggle genre
    const handleToggleGenre = (genre) => {
        setSelectedGenres((prev) => {
            if (prev.includes(genre)) {
                return prev.filter((g) => g !== genre);
            }
            return [...prev, genre];
        });
        setCurrentPage(1);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const handleSort = (type) => {
        setSortType(type);
        setShowSort(false);
    };

    const handleClearAll = () => {
        setSearch("");
        setSelectedGenres([]);
        setSortType("");
        setCurrentPage(1);
    };

    // filter + sort
    const filteredBooks = useMemo(() => {

        let result = books.filter((book) => {

            const matchSearch = book.title
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchGenre =
                selectedGenres.length === 0 ||
                selectedGenres.some((g) => book.genre.includes(g));

            return matchSearch && matchGenre;
        });

        if (sortType === "az") {
            result.sort((a, b) => a.title.localeCompare(b.title));
        }

        if (sortType === "za") {
            result.sort((a, b) => b.title.localeCompare(a.title));
        }

        if (sortType === "latest") {
            result.sort((a, b) => Number(b.id) - Number(a.id));
        }

        return result;

    }, [books, search, selectedGenres, sortType]);

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    const paginatedBooks = filteredBooks.slice(
        (currentPage - 1) * booksPerPage,
        currentPage * booksPerPage
    );

    const hasActiveFilters =
        search || selectedGenres.length > 0 || sortType;

    return (
        <div className="h-screen flex overflow-hidden">

            <title>Our Library | Bookey</title>

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="flex-1 flex flex-col">

                <AppNavbar setIsOpen={setIsOpen} />

                <div className="flex-1 overflow-y-auto bg-bgLight dark:bg-darkBg p-4">

                    {/* header */}
                    <div className="mb-6 space-y-2">
                        <h1 className="text-3xl font-bold text-primary">
                            Our Library
                        </h1>
                        <p className="text-sm text-gray-600 font-semibold">
                            Explore all books available
                        </p>
                    </div>

                    {/* search + controls */}
                    <div className="flex gap-2 mb-4 items-center">

                        <input
                            type="text"
                            placeholder="Search books..."
                            value={search}
                            onChange={handleSearch}
                            className="flex-1 p-3 rounded-xl bg-white dark:bg-darkCard outline-none focus:ring-2 focus:ring-primary"
                        />

                        <button
                            onClick={() => {
                                setShowGenres((prev) => !prev);
                                setShowSort(false);
                            }}
                            className="p-3 bg-white dark:bg-darkCard rounded-xl"
                        >
                            <FaSlidersH />
                        </button>

                        <button
                            onClick={() => {
                                setShowSort((prev) => !prev);
                                setShowGenres(false);
                            }}
                            className="p-3 bg-white dark:bg-darkCard rounded-xl"
                        >
                            <FaSort />
                        </button>

                    </div>

                    {/* active filters */}
                    {hasActiveFilters && (
                        <div className="mb-4 flex flex-wrap items-center gap-2">

                            {search && (
                                <span className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
                                    Search: {search}
                                </span>
                            )}

                            {selectedGenres.map((g) => (
                                <span
                                    key={g}
                                    className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full flex items-center gap-1"
                                >
                                    {g}
                                    <FaTimes
                                        className="cursor-pointer"
                                        onClick={() => handleToggleGenre(g)}
                                    />
                                </span>
                            ))}

                            {sortType && (
                                <span className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
                                    Sort: {sortType}
                                </span>
                            )}

                            <button
                                onClick={handleClearAll}
                                className="text-xs text-red-500 font-semibold"
                            >
                                Clear All
                            </button>

                        </div>
                    )}

                    {/* genres panel */}
                    {showGenres && (
                        <div className="mb-4 flex flex-wrap gap-2">

                            {genres.map((genre) => {
                                const active = selectedGenres.includes(genre);

                                return (
                                    <button
                                        key={genre}
                                        onClick={() => handleToggleGenre(genre)}
                                        className={`px-3 py-1 text-sm rounded-full ${active
                                            ? "bg-primary text-white"
                                            : "bg-white dark:bg-darkCard text-gray-600"
                                            }`}
                                    >
                                        {genre}
                                    </button>
                                );
                            })}

                        </div>
                    )}

                    {/* sort panel */}
                    {showSort && (
                        <div className="mb-4 flex gap-2">

                            <button
                                onClick={() => handleSort("az")}
                                className="px-3 py-1 rounded-full bg-white dark:bg-darkCard text-sm"
                            >
                                A-Z
                            </button>

                            <button
                                onClick={() => handleSort("za")}
                                className="px-3 py-1 rounded-full bg-white dark:bg-darkCard text-sm"
                            >
                                Z-A
                            </button>

                            <button
                                onClick={() => handleSort("latest")}
                                className="px-3 py-1 rounded-full bg-white dark:bg-darkCard text-sm"
                            >
                                Latest
                            </button>

                        </div>
                    )}

                    {/* books */}
                    <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

                        {paginatedBooks.length > 0 ? (
                            paginatedBooks.map((book) => (
                                <BookCard
                                    key={book.id}
                                    book={book}
                                    showDelete
                                />
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">
                                No books found
                            </p>
                        )}

                    </div>

                    {/* pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8 gap-2 flex-wrap">

                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((p) => p - 1)}
                                className="px-3 py-1 rounded-lg bg-white dark:bg-darkCard disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                            >
                                Prev
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1 rounded-lg text-sm ${currentPage === i + 1
                                        ? "bg-primary text-white"
                                        : "bg-white dark:bg-darkCard"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((p) => p + 1)}
                                className="px-3 py-1 rounded-lg bg-white dark:bg-darkCard disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
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