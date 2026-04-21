import { useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";
import CreateClubModal from "../components/app/clubs/CreateClubModal";

import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";

const Clubs = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [search, setSearch] = useState("");

    const { clubs, createClub, joinClub, leaveClub } = useContext(DataContext);
    const { currentUser } = useContext(AuthContext);
    const { showToast } = useContext(ToastContext);

    const navigate = useNavigate();

    // blocked users check
    const isBlocked =
        currentUser.blockedUntil &&
        new Date().getTime() < currentUser.blockedUntil;

    // filter clubs
    const filteredClubs = useMemo(() => {
        return clubs.filter((club) =>
            club.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [clubs, search]);

    // user clubs
    const userClubs = useMemo(() => {
        return filteredClubs.filter(
            (club) =>
                club.members.includes(currentUser.id) ||
                club.createdBy === currentUser.id
        );
    }, [filteredClubs, currentUser]);

    // other clubs
    const otherClubs = useMemo(() => {
        return filteredClubs.filter(
            (club) =>
                !club.members.includes(currentUser.id) &&
                club.createdBy !== currentUser.id
        );
    }, [filteredClubs, currentUser]);

    // club handle functions
    const handleJoin = (clubId) => {
        if (isBlocked) {
            showToast("You are blocked temporarily", "error");
            return;
        }

        joinClub(clubId, currentUser);
        showToast("Joined club", "success");
    };

    const handleLeave = (clubId) => {
        if (isBlocked) {
            showToast("You are blocked temporarily", "error");
            return;
        }

        leaveClub(clubId, currentUser);
        showToast("Left club", "info");
    };

    const handleView = (clubId) => {
        navigate(`/app/clubs/${clubId}`);
    };

    const handleCreateClub = (data) => {
        if (isBlocked) {
            showToast("You are blocked temporarily", "error");
            return;
        }

        createClub(data, currentUser);
        showToast("Club created successfully", "success");
    };

    return (
        <div className="h-screen flex overflow-hidden">

            <title>Explore clubs | Bookey</title>

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="flex-1 flex flex-col">

                <AppNavbar setIsOpen={setIsOpen} />

                <div className="flex-1 p-4 overflow-y-auto bg-bgLight dark:bg-darkBg">

                    <div className="mb-6 space-y-3">
                        <h1 className="text-3xl font-bold text-primary">
                            Explore Clubs
                        </h1>

                        <input
                            type="text"
                            placeholder="Search clubs..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full sm:w-80 p-3 rounded-xl bg-white dark:bg-darkCard outline-none"
                        />

                        {/* block message if blocked */}
                        {isBlocked && (
                            <p className="text-xs text-red-500">
                                You are temporarily blocked from actions
                            </p>
                        )}
                    </div>

                    {/* create club */}
                    {currentUser.role === "moderator" && (
                        <button
                            onClick={() => setOpenModal(true)}
                            className="mb-8 bg-primary text-white px-4 py-2 rounded-xl font-semibold disabled:opacity-50"
                            disabled={isBlocked}
                        >
                            + Create Club
                        </button>
                    )}

                    {/* your clubs */}
                    {userClubs.length > 0 && (
                        <div className="mb-8 space-y-4">

                            <h2 className="text-lg font-semibold">
                                Your Clubs
                            </h2>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

                                {userClubs.map((club) => {
                                    const isMember = club.members.includes(currentUser.id);

                                    return (
                                        <div
                                            key={club.id}
                                            className="bg-white dark:bg-darkCard p-4 rounded-2xl shadow-sm hover:shadow-md transition"
                                        >
                                            <p className="font-semibold">
                                                {club.name}
                                            </p>

                                            <p className="text-xs text-gray-600">
                                                {club.genre}
                                            </p>

                                            <p className="text-xs mt-1">
                                                {club.members.length} members
                                            </p>

                                            <div className="mt-3 flex gap-2">

                                                {isMember && (
                                                    <button
                                                        onClick={() => handleLeave(club.id)}
                                                        className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 disabled:opacity-50"
                                                        disabled={isBlocked}
                                                    >
                                                        Leave
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => handleView(club.id)}
                                                    className="text-xs px-2 py-1 rounded bg-primary/10 text-primary"
                                                >
                                                    View
                                                </button>

                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        </div>
                    )}

                    {/* explore clubs */}
                    <div className="space-y-4">

                        <h2 className="text-lg font-semibold">
                            Explore Clubs
                        </h2>

                        {otherClubs.length === 0 ? (
                            <p className="text-sm text-gray-600">
                                No clubs available
                            </p>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

                                {otherClubs.map((club) => {
                                    const isMember = club.members.includes(currentUser.id);

                                    return (
                                        <div
                                            key={club.id}
                                            className="bg-white dark:bg-darkCard p-4 rounded-2xl shadow-sm hover:shadow-md transition"
                                        >
                                            <p className="font-semibold">
                                                {club.name}
                                            </p>

                                            <p className="text-xs text-gray-600">
                                                {club.genre}
                                            </p>

                                            <p className="text-xs mt-1">
                                                {club.members.length} members
                                            </p>

                                            <div className="mt-3 flex gap-2">

                                                {!isMember && (
                                                    <button
                                                        onClick={() => handleJoin(club.id)}
                                                        className="text-xs px-2 py-1 rounded bg-primary text-white disabled:opacity-50"
                                                        disabled={isBlocked}
                                                    >
                                                        Join
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => handleView(club.id)}
                                                    className="text-xs px-2 py-1 rounded bg-primary/10 text-primary"
                                                >
                                                    View
                                                </button>

                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        )}

                    </div>

                </div>
            </div>

            {/* create clubs modal */}
            <CreateClubModal
                isOpen={openModal}
                setIsOpen={setOpenModal}
                onCreate={handleCreateClub}
            />

        </div>
    );
};

export default Clubs;