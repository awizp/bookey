import { useState } from "react";

import ProfileCard from "../sections/ProfileCard";
import StatsCards from "../sections/StatsCards";
import CurrentReading from "../sections/CurrentReading";
import AddReadingModal from "../sections/AddReadingModal";
import TrackingLists from "../sections/TrackingLists";
import StreakCard from "../sections/StreakCard";
import SuggestedBooks from "../sections/SuggestedBooks";

const UserDashboard = () => {

    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="space-y-10">

            {/* profile */}
            <ProfileCard />

            {/* main grid */}
            <div className="grid lg:grid-cols-3 items-end gap-6">

                {/* reading section */}
                <div className="lg:col-span-2 space-y-4">

                    {/* header */}
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

                {/* streak */}
                <div>
                    <StreakCard />
                </div>

            </div>

            {/* stats */}
            <StatsCards />

            {/* suggested books */}
            <SuggestedBooks />

            {/* tracking lists */}
            <TrackingLists />

            {/* modal */}
            <AddReadingModal
                isOpen={openModal}
                setIsOpen={setOpenModal}
            />

        </div>
    );
};

export default UserDashboard;