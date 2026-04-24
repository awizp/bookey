import { useContext, useMemo } from "react";
import { FaBook, FaFire, FaFolder, FaHeart } from "react-icons/fa";

import { AuthContext } from "../../../context/AuthContext";
import { DataContext } from "../../../context/DataContext";
import { TrackingContext } from "../../../context/TrackingContext";

const StatsCards = () => {

    const { currentUser } = useContext(AuthContext);
    const { collections, books } = useContext(DataContext);
    const { trackingData } = useContext(TrackingContext);

    const userTracking = useMemo(() => {
        return trackingData.find(
            (t) => t.userId === currentUser.id
        );
    }, [trackingData, currentUser]);

    // books read
    const booksRead = userTracking?.completed?.length || 0;

    // playlists
    const playlistsCount = useMemo(() => {
        return collections.filter(
            (c) => c.userId === currentUser.id
        ).length;
    }, [collections, currentUser]);

    // streak
    const streak = userTracking?.streak?.count || 0;

    // smarter genre calculation
    const mostLikedGenre = useMemo(() => {

        if (!userTracking?.completed?.length) {
            return currentUser.likedGenres?.[0] || "N/A";
        }

        const genreCount = {};

        userTracking.completed.forEach(({ bookId }) => {
            const book = books.find((b) => b.id === bookId);
            if (!book) return;

            book.genre.forEach((g) => {
                genreCount[g] = (genreCount[g] || 0) + 1;
            });
        });

        const sorted = Object.entries(genreCount).sort(
            (a, b) => b[1] - a[1]
        );

        return sorted[0]?.[0] || "N/A";

    }, [userTracking, books, currentUser]);

    const stats = [
        {
            label: "Books Read",
            value: booksRead,
            icon: <FaBook />,
        },
        {
            label: "Top Genre",
            value: mostLikedGenre,
            icon: <FaHeart />,
        },
        {
            label: "Playlists",
            value: playlistsCount,
            icon: <FaFolder />,
        },
        {
            label: "Streak",
            value: `${streak} days`,
            icon: <FaFire />,
        },
    ];

    return (
        <div className="space-y-3">
            <h2 className="text-lg font-semibold">
                Your Insights
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-darkCard rounded-2xl p-4 flex flex-col gap-3 hover:-translate-y-0.5 transition duration-300 hover:shadow"
                    >

                        {/* icon */}
                        <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary/10 text-primary text-sm">
                            {stat.icon}
                        </div>

                        {/* value */}
                        <h3 className="text-xl font-bold capitalize text-gray-800 dark:text-white">
                            {stat.value}
                        </h3>

                        {/* label */}
                        <p className="text-xs text-gray-600">
                            {stat.label}
                        </p>

                    </div>
                ))}

            </div>
        </div>
    );
};

export default StatsCards;