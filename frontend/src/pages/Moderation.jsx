import { useContext, useState, useMemo } from "react";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";

import { DataContext } from "../context/DataContext";

import { FaBan } from "react-icons/fa";

const Moderation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { users, blockUser, unblockUser } = useContext(DataContext);

    const [search, setSearch] = useState("");

    // users only
    const filteredUsers = useMemo(() => {
        return users.filter((u) => u.role === "user")
            .filter((u) =>
                u.name.toLowerCase().includes(search.toLowerCase())
            );
    }, [users, search]);

    // moderation action
    const moderationActions = async (e, user) => {
        const value = e.target.value;

        if (!value) return;

        if (value === "unblock") {
            if (window.confirm("Unblock this user?")) {
                try {
                    await unblockUser(user.id);
                } catch (error) {
                    alert(error.message);
                }
            }
            return;
        }

        if (window.confirm("Apply block to this user?")) {
            try {
                await blockUser(user.id, Number(value));
            } catch (error) {
                alert(error.message);
            }
        }
    };

    return (
        <div className="h-screen flex overflow-hidden">

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="flex-1 flex flex-col">

                <AppNavbar setIsOpen={setIsOpen} />

                {/* current users */}
                <div className="flex-1 overflow-y-auto bg-bgLight dark:bg-darkBg p-4">

                    <div className="mb-6 space-y-2">
                        <h1 className="text-2xl font-bold">
                            Moderation Panel
                        </h1>
                        <p className="text-sm text-gray-600 font-semibold">
                            Manage user activity and apply temporary blocks
                        </p>
                    </div>

                    {/* search */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full sm:w-80 p-3 rounded-xl bg-white dark:bg-darkCard outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                        {filteredUsers.length === 0 ? (
                            <p className="text-sm text-gray-600">
                                No users found
                            </p>
                        ) : (
                            filteredUsers.map((user) => {
                                const isBlocked =
                                    user.blockedUntil &&
                                    new Date().getTime() < user.blockedUntil;

                                return (
                                    <div
                                        key={user.id}
                                        className="bg-white dark:bg-darkCard p-4 rounded-2xl shadow-sm hover:shadow-md transition"
                                    >

                                        {/* users */}
                                        <div className="flex items-center gap-3 mb-3">

                                            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                                                {user.name?.charAt(0)}
                                            </div>

                                            <div>
                                                <p className="font-semibold text-sm">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    {user.email}
                                                </p>
                                            </div>

                                        </div>

                                        {/* block status */}
                                        <div className="mb-4 space-y-2">
                                            {isBlocked ? (
                                                <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-600">
                                                    Blocked
                                                </span>
                                            ) : (
                                                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">
                                                    Active
                                                </span>
                                            )}

                                            {isBlocked && (
                                                <p className="text-[10px] text-red-500 mt-1">
                                                    Blocked until: {new Date(user.blockedUntil).toLocaleString()}
                                                </p>
                                            )}
                                        </div>

                                        {/* block options */}
                                        <div className="mt-3">

                                            <select
                                                defaultValue=""
                                                onChange={(e) => moderationActions(e, user)}
                                                className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs outline-none"
                                            >
                                                <option value="">Moderation Actions</option>
                                                <option value={8 * 60 * 60 * 1000}>Block 8 hours</option>
                                                <option value={12 * 60 * 60 * 1000}>Block 12 hours</option>
                                                <option value={24 * 60 * 60 * 1000}>Block 1 day</option>
                                                <option value="unblock">Unblock</option>
                                            </select>

                                        </div>

                                    </div>
                                );
                            })
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Moderation;
