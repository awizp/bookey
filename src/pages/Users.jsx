import { useContext, useState, useMemo } from "react";
import { FaTrash, FaUserShield } from "react-icons/fa";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";

import { DataContext } from "../context/DataContext";


const Users = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { users, setUsers } = useContext(DataContext);

    const [search, setSearch] = useState("");

    // filter users
    const filteredUsers = useMemo(() => {
        return users.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [users, search]);

    // role change by toggle
    const toggleRole = (id) => {
        const updated = users.map((u) => {
            if (u.id !== id) return u;

            // admin role doesn't need to change
            if (u.role === "admin") return u;

            return {
                ...u,
                role: u.role === "moderator" ? "user" : "moderator",
            };
        });

        setUsers(updated);
    };

    // delete the user
    const deleteUser = (id) => {
        if (window.confirm("Delete this user?")) {
            setUsers(users.filter((u) => u.id !== id));
        }
    };

    return (
        <div className="h-screen flex overflow-hidden">
            <title>Manage users in our platform | Bookey</title>

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="flex-1 flex flex-col">

                <AppNavbar setIsOpen={setIsOpen} />

                <div className="flex-1 overflow-y-auto bg-bgLight dark:bg-darkBg p-4">
                    <div className="mb-6 space-y-2">
                        <h1 className="text-2xl font-bold">
                            Users Management
                        </h1>
                        <p className="text-sm text-gray-600">
                            Manage users and their roles
                        </p>
                    </div>

                    {/* search users */}
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
                            filteredUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="bg-white dark:bg-darkCard p-4 rounded-2xl shadow-sm hover:shadow-md transition"
                                >

                                    {/* user info */}
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

                                    {/* role */}
                                    <div className="mb-4">
                                        <span className={`text-xs px-2 py-1 rounded-full font-semibold capitalize ${user.role === "admin" ? "bg-primary text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500"}`}>
                                            {user.role}
                                        </span>
                                    </div>

                                    <div className="flex gap-2">

                                        {user.role !== "admin" && (
                                            <button
                                                onClick={() => toggleRole(user.id)}
                                                className="flex-1 flex items-center justify-center gap-1 text-xs px-3 py-2 rounded-lg bg-primary text-white hover:bg-primary/50 cursor-pointer transition"
                                            >
                                                <FaUserShield size={12} />
                                                Toggle Role
                                            </button>
                                        )}

                                        {user.role !== "admin" && <button
                                            onClick={() => deleteUser(user.id)}
                                            className="flex items-center justify-center px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition"
                                        >
                                            <FaTrash size={12} />
                                        </button>}

                                    </div>

                                </div>
                            ))
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;