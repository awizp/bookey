import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";
import { DataContext } from "../../../context/DataContext";

const SuggestedBooks = () => {

    const { currentUser } = useContext(AuthContext);
    const { books } = useContext(DataContext);

    const navigate = useNavigate();

    const suggested = books
        .filter((book) =>
            currentUser?.likedGenres?.some((g) =>
                book.genre.includes(g)
            )
        )
        .slice(0, 4);

    if (!suggested.length) return null;

    const handleClick = (id) => {
        navigate(`/app/book/${id}`);
    };

    return (
        <div className="space-y-4">

            <h2 className="text-lg font-semibold">
                Suggested for You
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                {suggested.map((book, index) => (

                    <div
                        key={book.id}
                        onClick={() => handleClick(book.id)}
                        className="bg-white dark:bg-darkCard rounded-2xl p-5 cursor-pointer hover:shadow-lg group"
                    >

                        {/* image */}
                        <div className="relative w-full h-72 rounded-xl overflow-hidden border border-primary/30">

                            <div className="w-full h-full overflow-hidden rounded-xl border-2 border-primary">
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="w-full h-full object-cover transition duration-500 ease-out group-hover:scale-110 group-hover:rotate-[0.5deg]"
                                />
                            </div>

                            {/* overlay layer */}
                            <div
                                className={`absolute inset-0 transition duration-300 ${index % 2 === 0 ? "bg-primary/10 dark:bg-primary/20" : "bg-black/10 dark:bg-black/20"} group-hover:bg-transparent`}
                            />

                        </div>

                        {/* content */}
                        <div className="mt-3 space-y-2">

                            <p className="text-sm font-semibold line-clamp-2 text-gray-800 dark:text-white">
                                {book.title}
                            </p>

                            <p className="text-xs text-gray-500">
                                {book.author}
                            </p>

                            <div className="flex flex-wrap gap-1 mt-1">
                                {book.genre.slice(0, 2).map((genreData, i) => (
                                    <span
                                        key={i}
                                        className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full"
                                    >
                                        {genreData}
                                    </span>
                                ))}
                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default SuggestedBooks;