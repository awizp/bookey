import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { DataContext } from "../../../context/DataContext";
import { ToastContext } from "../../../context/ToastContext";

const ProfileCard = () => {

    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const { users, setUsers } = useContext(DataContext);
    const { showToast } = useContext(ToastContext);

    const [editing, setEditing] = useState(false);
    const [bio, setBio] = useState(currentUser?.bio || "");

    // save user auth
    const handleSave = () => {

        const updatedUser = { ...currentUser, bio };

        // update users list
        setUsers((prev) =>
            prev.map((u) => u.id === currentUser.id ? updatedUser : u)
        );

        // update auth state (THIS FIXES UI)
        setCurrentUser(updatedUser);

        // update localStorage
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        setEditing(false);
        showToast("Profile updated", "success");
    };

    useEffect(() => {
        const setCurrentUserBio = () => {
            setBio(currentUser?.bio || "");
        };

        setCurrentUserBio();
    }, [currentUser]);

    return (
        <div className="bg-white dark:bg-darkCard rounded-2xl p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center">

            {/* avatar */}
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                {currentUser.name?.charAt(0)}
            </div>

            {/* details */}
            <div className="flex-1 space-y-2">

                <div>
                    <h2 className="text-lg font-semibold">
                        {currentUser.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                        @{currentUser.username}
                    </p>
                </div>

                {/* user id */}
                <p className="text-xs text-gray-500 font-semibold">
                    ID: {currentUser.id}
                </p>

                {/* bio */}
                <div className="mt-2">

                    {editing ? (
                        <div className="space-y-2">

                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary text-sm"
                                rows={3}
                                placeholder="Write something about you..."
                            />

                            <div className="flex gap-2">

                                <button
                                    onClick={handleSave}
                                    className="px-3 py-1 text-sm bg-primary text-white rounded-lg"
                                >
                                    Save
                                </button>

                                <button
                                    onClick={() => {
                                        setEditing(false);
                                        setBio(currentUser.bio || "");
                                    }}
                                    className="px-3 py-1 text-sm text-gray-500"
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>
                    ) : (
                        <div className="flex items-center justify-between gap-2">

                            <p className="text-sm text-gray-500 font-semibold">
                                {currentUser.bio || "No bio added yet"}
                            </p>

                            <button
                                onClick={() => setEditing(true)}
                                className="text-xs text-primary font-semibold"
                            >
                                Edit
                            </button>

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
};

export default ProfileCard;