import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";
import { DataContext } from "../../../context/DataContext";
import { TrackingContext } from "../../../context/TrackingContext";

const CurrentReading = () => {

    const { currentUser } = useContext(AuthContext);
    const { books } = useContext(DataContext);
    const { getLatestReading } = useContext(TrackingContext);

    const navigate = useNavigate();

    const latest = getLatestReading(currentUser.id);

    if (!latest) {
        return (
            <div className="bg-white dark:bg-darkCard rounded-2xl p-5">
                <p className="text-sm text-gray-500">
                    No books in progress. Start reading 🚀
                </p>
            </div>
        );
    }

    const book = books.find((b) => b.id === latest.bookId);

    if (!book) return null;

    const progress = Math.min(
        (latest.pagesRead / latest.totalPages) * 100,
        100
    );

    const handleOpen = () => {
        navigate(`/app/reading/${book.id}`);
    };

    return (
        <div
            onClick={handleOpen}
            className="bg-white dark:bg-darkCard rounded-2xl p-5 flex gap-5 cursor-pointer hover:shadow transition"
        >

            {/* cover */}
            <div className="w-24 h-32 rounded-xl overflow-hidden">
                <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* content */}
            <div className="flex-1 space-y-3">

                <div>
                    <h3 className="font-semibold text-base">
                        {book.title}
                    </h3>

                    <p className="text-xs text-gray-600">
                        by {book.author}
                    </p>
                </div>

                {/* progress text */}
                <p className="text-xs text-gray-500">
                    {latest.pagesRead} / {latest.totalPages} pages
                </p>

                {/* progress bar */}
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* action hint */}
                <p className="text-xs text-primary font-semibold">
                    Continue Reading →
                </p>

            </div>

        </div>
    );
};

export default CurrentReading;