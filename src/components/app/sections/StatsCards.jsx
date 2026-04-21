import { useContext, useMemo } from "react";
import { FaBook, FaFire, FaFolder, FaHeart } from "react-icons/fa";

import { AuthContext } from "../../../context/AuthContext";
import { DataContext } from "../../../context/DataContext";
import { TrackingContext } from "../../../context/TrackingContext";

const StatsCards = () => {

    const { currentUser } = useContext(AuthContext);
    const { collections } = useContext(DataContext);
    const { trackingData } = useContext(TrackingContext);

    // get tracking for current user
    const userTracking = useMemo(() => {
        return trackingData.find(
            (t) => t.userId === currentUser.id
        );
    }, [trackingData, currentUser]);

    // stats
    const booksRead = userTracking?.completed?.length || 0;

    const playlistsCount = useMemo(() => {
        return collections.filter(
            (c) => c.userId === currentUser.id
        ).length;
    }, [collections, currentUser]);

    const streak = userTracking?.streak?.count || 0;

    const mostLikedGenre = currentUser.likedGenres?.[0] || "N/A";

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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-darkCard rounded-2xl p-4 flex flex-col gap-2 hover:-translate-y-0.5 transition duration-300 hover:shadow"
                >

                    <div className="text-primary text-lg">
                        {stat.icon}
                    </div>

                    <h3 className="text-lg font-bold capitalize">
                        {stat.value}
                    </h3>

                    <p className="text-xs text-gray-600">
                        {stat.label}
                    </p>

                </div>
            ))}

        </div>
    );
};

export default StatsCards;