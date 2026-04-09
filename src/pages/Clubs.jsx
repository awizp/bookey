import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";
import CreateClubModal from "../components/app/clubs/CreateClubModal";

import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";

const Clubs = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const { clubs, createClub, joinClub, leaveClub } = useContext(DataContext);

    const { currentUser } = useContext(AuthContext);

    const navigate = useNavigate();

    return (
        <div className="h-screen flex overflow-hidden">

            <title>Your clubs collections | Bookey</title>

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="flex-1 flex flex-col">

                <AppNavbar setIsOpen={setIsOpen} />

                <div className="flex-1 p-4 overflow-y-auto bg-bgLight dark:bg-darkBg">
                    <div className="mb-6 space-y-2">
                        <h1 className="text-3xl font-bold text-primary">Clubs</h1>
                    </div>

                    {currentUser.role === "moderator" && (
                        <button
                            onClick={() => setOpenModal(true)}
                            className="mb-6 bg-primary text-white px-4 py-2 rounded-xl cursor-pointer font-semibold"
                        >
                            + Create Club
                        </button>
                    )}

                    {/* clubs list */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

                        {clubs.map((club) => {
                            const isMember = club.members.includes(
                                currentUser.id
                            );

                            return (
                                <div
                                    key={club.id}
                                    className="bg-white dark:bg-darkCard p-4 rounded-xl"
                                >
                                    <p className="font-semibold">{club.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {club.genre}
                                    </p>

                                    <p className="text-xs mt-1">
                                        {club.members.length} members
                                    </p>

                                    <div className="mt-3 flex gap-2">

                                        {isMember ? (
                                            <button
                                                onClick={() =>
                                                    leaveClub(club.id, currentUser)
                                                }
                                                className="text-xs border border-primary text-primary px-2 py-1 rounded"
                                            >
                                                Leave
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    joinClub(club.id, currentUser)
                                                }
                                                className="text-xs bg-primary text-white px-2 py-1 rounded"
                                            >
                                                Join
                                            </button>
                                        )}

                                        <button
                                            onClick={() =>
                                                navigate(`/app/clubs/${club.id}`)
                                            }
                                            className="text-xs border px-2 py-1 rounded"
                                        >
                                            View
                                        </button>

                                    </div>

                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>

            {/* club modal */}
            <CreateClubModal
                isOpen={openModal}
                setIsOpen={setOpenModal}
                onCreate={(data) => createClub(data, currentUser)}
            />

        </div>
    );
};

export default Clubs;