import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";
import { TrackingContext } from "../../../context/TrackingContext";

import { FaBookmark, FaBookOpen, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const TrackingLists = () => {

    const { currentUser } = useContext(AuthContext);
    const { trackingData } = useContext(TrackingContext);

    const navigate = useNavigate();

    const userTracking = trackingData.find(
        (t) => t.userId === currentUser.id
    );

    const lists = [
        {
            key: "wanted",
            title: "Wanted to Read",
            icon: <FaBookmark />,
            count: userTracking?.wanted?.length || 0
        },
        {
            key: "currentlyReading",
            title: "Currently Reading",
            icon: <FaBookOpen />,
            count: userTracking?.currentlyReading?.length || 0
        },
        {
            key: "completed",
            title: "Completed",
            icon: <FaCheckCircle />,
            count: userTracking?.completed?.length || 0
        },
        {
            key: "dropped",
            title: "Dropped",
            icon: <FaTimesCircle />,
            count: userTracking?.dropped?.length || 0
        }
    ];

    const handleOpen = (key) => {
        navigate(`/app/tracking/${key}`);
    };

    return (
        <div className="space-y-4">

            <h2 className="text-lg font-semibold">
                Your Library
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                {lists.map((list) => (

                    <div
                        key={list.key}
                        onClick={() => handleOpen(list.key)}
                        className="bg-white dark:bg-darkCard rounded-2xl p-4 cursor-pointer hover:shadow-md transition"
                    >

                        <div className="flex items-center justify-between">

                            <div className="text-primary text-lg">
                                {list.icon}
                            </div>

                            <p className="text-sm font-semibold">
                                {list.count}
                            </p>

                        </div>

                        <p className="text-sm mt-3 font-medium">
                            {list.title}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default TrackingLists;