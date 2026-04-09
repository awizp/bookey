import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaArrowLeft, FaUsers, FaTrash } from "react-icons/fa";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";

import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";

const ClubDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const { clubs, setClubs, joinClub, leaveClub } =
        useContext(DataContext);

    const { currentUser } = useContext(AuthContext);

    const club = clubs.find((c) => c.id === id);

    if (!club) {
        return <div className="p-6">Club not found</div>;
    }

    const isMember = club.members.includes(currentUser.id);

    // delete club
    const deleteClub = () => {
        const updated = clubs.filter((c) => c.id !== id);
        setClubs(updated);
        navigate("/app/clubs");
    };

    return (
        <div className="h-screen flex overflow-hidden">

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="flex-1 flex flex-col">

                <AppNavbar setIsOpen={setIsOpen} />

                {/* main */}
                <div className="flex-1 overflow-y-auto bg-bgLight dark:bg-darkBg p-4">

                    {/* back btn */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm mb-4 text-primary cursor-pointer font-semibold"
                    >
                        <FaArrowLeft />
                        Back
                    </button>

                    <div className="bg-white dark:bg-darkCard p-5 rounded-2xl">
                        <div className="flex justify-between items-start">

                            <div>
                                <h1 className="text-2xl font-bold">
                                    {club.name}
                                </h1>

                                <p className="text-sm text-textSecondary mt-1">
                                    Genre: {club.genre}
                                </p>

                                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                    <FaUsers />
                                    {club.members.length} members
                                </div>
                            </div>

                            {/* moderator delete only */}
                            {currentUser.role === "moderator" && (
                                <button
                                    onClick={deleteClub}
                                    className="text-red-500 flex items-center gap-1 text-sm"
                                >
                                    <FaTrash />
                                    Delete
                                </button>
                            )}

                        </div>

                        <div className="mt-6 flex gap-3">

                            {isMember ? (
                                <button
                                    onClick={() =>
                                        leaveClub(club.id, currentUser)
                                    }
                                    className="px-4 py-2 rounded-xl border"
                                >
                                    Leave Club
                                </button>
                            ) : (
                                <button
                                    onClick={() =>
                                        joinClub(club.id, currentUser)
                                    }
                                    className="px-4 py-2 rounded-xl bg-primary text-white"
                                >
                                    Join Club
                                </button>
                            )}

                        </div>

                    </div>

                    {/* no posts means needs to be empty */}
                    <div className="mt-6 text-sm text-gray-600 font-semibold">
                        No posts yet. Be the first to share something!
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ClubDetails;