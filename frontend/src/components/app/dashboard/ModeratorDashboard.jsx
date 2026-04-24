import { useState, useContext } from "react";

import ProfileCard from "../sections/ProfileCard";
import StatsCards from "../sections/StatsCards";
import CurrentReading from "../sections/CurrentReading";
import AddReadingModal from "../sections/AddReadingModal";
import TrackingLists from "../sections/TrackingLists";
import StreakCard from "../sections/StreakCard";
import SuggestedBooks from "../sections/SuggestedBooks";

import { DataContext } from "../../../context/DataContext";

const ModeratorDashboard = () => {

    const [openModal, setOpenModal] = useState(false);

    const { users, books } = useContext(DataContext);

    const totalUsers = users.filter(u => u.role === "user").length;
    const totalBooks = books.length;

    const stats = [
        { label: "Users", value: totalUsers },
        { label: "Books", value: totalBooks }
    ];

    return (
        <div className="space-y-10">

            {/* profile */}
            <ProfileCard />

            {/* platform stats */}
            <div className="grid grid-cols-2 gap-4">

                {stats.map((item, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-darkCard rounded-2xl p-4"
                    >
                        <h3 className="text-lg font-bold text-primary">
                            {item.value}
                        </h3>
                        <p className="text-xs text-gray-600">
                            {item.label}
                        </p>
                    </div>
                ))}

            </div>

            {/* reading + streak */}
            <div className="grid lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2 space-y-4">

                    <div className="flex justify-between items-center">

                        <h2 className="text-lg font-semibold">
                            Reading Progress
                        </h2>

                        <button
                            onClick={() => setOpenModal(true)}
                            className="bg-primary text-white px-4 py-2 rounded-xl text-sm"
                        >
                            + Add Reading
                        </button>

                    </div>

                    <CurrentReading />

                </div>

                <div>
                    <StreakCard />
                </div>

            </div>

            {/* user stats */}
            <StatsCards />

            {/* suggested */}
            <SuggestedBooks />

            {/* tracking */}
            <TrackingLists />

            {/* modal */}
            <AddReadingModal
                isOpen={openModal}
                setIsOpen={setOpenModal}
            />

        </div>
    );
};

export default ModeratorDashboard;