import { FaHome, FaBook, FaLayerGroup, FaUsers, FaPlus, FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../../context/AuthContext";
import { ThemeContext } from "../../../context/ThemeContext";

const Sidebar = ({ isOpen, setIsOpen, onAddBook }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const { currentUser } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);

    const role = currentUser?.role;

    const baseMenu = [
        {
            name: "Dashboard",
            icon: <FaHome />,
            path: "/app"
        },
        {
            name: "Library",
            icon: <FaBook />,
            path: "/app/library"
        },
        {
            name: "Collections",
            icon: <FaLayerGroup />,
            path: "/app/collections"
        },
        {
            name: "Clubs",
            icon: <FaUsers />,
            path: "/app/clubs"
        },
    ];

    const roleMenu = [];

    if (role === "moderator") {
        roleMenu.push({
            name: "Moderation",
            icon: <FaUsers />,
            path: "/app/moderation",
        });
    }

    if (role === "admin") {
        roleMenu.push({
            name: "Users",
            icon: <FaUsers />,
            path: "/app/users",
        });
    }

    const menu = [...baseMenu, ...roleMenu];

    return (
        <>
            {/* mobile sidebar */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* desktop sidebar */}
            <div className={`fixed md:static top-2 left-2 h-full w-64 bg-white dark:bg-darkCard z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-[120%]"} rounded-2xl md:rounded-tl-none md:rounded-bl-none md:translate-x-0`}>
                <div className="h-16 flex items-center justify-between px-4 m-1 rounded-2xl">
                    <div
                        onClick={() => navigate("/")}
                        className="w-32 h-8"
                    >
                        <img
                            src={theme === "dark" ? "/light-logo.png" : "/dark-logo.png"}
                            alt="Bookey Logo"
                            className="w-full h-full object-fill"
                        />
                    </div>

                    {/* close btn in mobile */}
                    <button
                        className="md:hidden cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* links */}
                <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">

                    {menu.map((item) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <button
                                key={item.name}
                                onClick={() => {
                                    navigate(item.path);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition ${isActive ? "bg-primary text-white shadow-sm" : "text-gray-600 dark:text-gray-300 hover:bg-primary/10"}`}
                            >
                                <span className="text-base">{item.icon}</span>
                                {item.name}
                            </button>
                        );
                    })}

                </div>

                {/* add book */}
                <div className="w-full fixed bottom-10 p-3 mt-5">
                    <button
                        onClick={onAddBook}
                        className="w-full cursor-pointer flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl text-sm active:scale-95 transition"
                    >
                        <FaPlus />
                        Add Book
                    </button>
                </div>

            </div>
        </>
    );
};

export default Sidebar;