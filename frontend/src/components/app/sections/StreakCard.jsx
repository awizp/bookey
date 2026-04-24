import { useContext, useMemo } from "react";
import { FaFire } from "react-icons/fa";

import { AuthContext } from "../../../context/AuthContext";
import { TrackingContext } from "../../../context/TrackingContext";

const StreakCard = () => {

    const { currentUser } = useContext(AuthContext);
    const { trackingData } = useContext(TrackingContext);

    const userTracking = useMemo(() => {
        return trackingData.find(
            (t) => t.userId === currentUser.id
        );
    }, [trackingData, currentUser]);

    const streak = userTracking?.streak?.count || 0;
    const lastUpdated = userTracking?.streak?.lastUpdated;

    // motivation message
    const getMessage = () => {

        if (streak === 0) return "Start your reading streak today 🚀";
        if (streak < 3) return "Good start! Keep going 🔥";
        if (streak < 7) return "You're building a habit 💪";
        if (streak < 15) return "Amazing consistency 📚";
        return "You're unstoppable 🔥🔥";
    };

    return (
        <div className="bg-white dark:bg-darkCard rounded-2xl p-5 flex items-center justify-between">

            <div className="space-y-2">

                <h3 className="text-sm text-gray-600">
                    Reading Streak
                </h3>

                <h2 className="text-2xl font-bold text-primary">
                    {streak} days
                </h2>

                <p className="text-xs text-gray-500">
                    {getMessage()}
                </p>

                {lastUpdated && (
                    <p className="text-[10px] text-gray-400">
                        Last updated: {lastUpdated}
                    </p>
                )}

            </div>

            {/* icon */}
            <div className="text-primary text-3xl">
                <FaFire />
            </div>

        </div>
    );
};

export default StreakCard;