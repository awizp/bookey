import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";
import { DataContext } from "../../../context/DataContext";

const SuggestedBooks = () => {

    const { currentUser } = useContext(AuthContext);
    const { books } = useContext(DataContext);

    const navigate = useNavigate();

    // filter books based on liked genres
    const suggested = useMemo(() => {

        if (!currentUser?.likedGenres?.length) return [];

        return books
            .filter((book) =>
                book.genre.some((g) => currentUser.likedGenres.includes(g))
            ).slice(0, 4);

    }, [books, currentUser]);

    if (suggested.length === 0) return null;

    const handleClick = (id) => {
        navigate(`/app/book/${id}`);
    };

    return (
        <div className="space-y-4">

            <h2 className="text-lg font-semibold">
                Suggested for You
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px]">

                {/* big card */}
                {suggested[0] && (
                    <div
                        onClick={() => handleClick(suggested[0].id)}
                        className="col-span-2 row-span-2 rounded-2xl overflow-hidden cursor-pointer relative group"
                    >
                        <img
                            src={suggested[0].image}
                            alt={suggested[0].title}
                            className="w-full h-full object-cover group-hover:scale-105 transition"
                        />

                        <div className="absolute inset-0 bg-black/20 flex items-end p-4">
                            <p className="text-white font-semibold">
                                {suggested[0].title}
                            </p>
                        </div>
                    </div>
                )}

                {/* small cards */}
                {suggested.slice(1, 3).map((book) => (
                    <div
                        key={book.id}
                        onClick={() => handleClick(book.id)}
                        className="rounded-2xl overflow-hidden cursor-pointer relative group"
                    >
                        <img
                            src={book.image}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition"
                        />

                        <div className="absolute inset-0 bg-black/20 flex items-end p-2">
                            <p className="text-white text-xs font-semibold line-clamp-2">
                                {book.title}
                            </p>
                        </div>
                    </div>
                ))}

                {/* wide card */}
                {suggested[3] && (
                    <div
                        onClick={() => handleClick(suggested[3].id)}
                        className="col-span-2 rounded-2xl overflow-hidden cursor-pointer relative group"
                    >
                        <img
                            src={suggested[3].image}
                            alt={suggested[3].title}
                            className="w-full h-full object-cover group-hover:scale-105 transition"
                        />

                        <div className="absolute inset-0 bg-black/20 flex items-end p-3">
                            <p className="text-white text-sm font-semibold">
                                {suggested[3].title}
                            </p>
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
};

export default SuggestedBooks;