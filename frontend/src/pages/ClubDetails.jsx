import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaArrowLeft, FaUsers, FaTrash } from "react-icons/fa";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";

import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";

const ClubDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const { clubs, setClubs } = useContext(DataContext);
    const { currentUser } = useContext(AuthContext);
    const { showToast } = useContext(ToastContext);

    const club = clubs.find((c) => c.id === id);
    if (!club) return <div className="p-6">Club not found</div>;

    const isAdmin = currentUser.role === "admin";
    const isModerator = currentUser.role === "moderator";
    const isOwner = club.createdBy === currentUser.id;

    const handleDeleteClub = () => {

        if (!isAdmin && !isModerator && !isOwner) {
            return showToast("No permission", "error");
        }

        if (!window.confirm("Delete this club?")) return;

        setClubs((prev) => {
            const updated = prev.filter((c) => c.id !== id);
            return [...updated];
        });

        showToast("Club deleted", "error");

        navigate("/app/clubs", { replace: true });
    };

    return (
        <div className="h-screen flex overflow-hidden">

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="flex-1 flex flex-col">

                <AppNavbar setIsOpen={setIsOpen} />

                <div className="flex-1 p-4 bg-bgLight dark:bg-darkBg space-y-6">

                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-primary text-sm"
                    >
                        <FaArrowLeft /> Back
                    </button>

                    <div className="bg-white dark:bg-darkCard p-5 rounded-2xl space-y-4">

                        <div className="flex justify-between">

                            <div>
                                <h1 className="text-xl font-semibold">{club.name}</h1>
                                <p className="text-sm text-gray-600">{club.genre}</p>
                            </div>

                            {(isAdmin || isModerator || isOwner) && (
                                <button
                                    onClick={handleDeleteClub}
                                    className="text-red-500"
                                >
                                    <FaTrash />
                                </button>
                            )}

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default ClubDetails;