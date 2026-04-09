import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const CreatePlaylistModal = ({ isOpen, setIsOpen, onCreate }) => {

    const [name, setName] = useState("");

    const handleCreate = () => {
        if (!name.trim()) return;

        onCreate(name);
        setName("");
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

            <div className="w-full max-w-md bg-white dark:bg-darkCard rounded-2xl p-5 relative shadow-lg">

                {/* close btn */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                >
                    <FaTimes />
                </button>

                <h2 className="text-lg font-semibold mb-4">
                    Create Playlist
                </h2>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter playlist name..."
                    className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary"
                />

                <div className="flex gap-3 mt-6">

                    <button
                        onClick={() => setIsOpen(false)}
                        className="flex-1 border py-2 rounded-xl"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleCreate}
                        className="flex-1 bg-primary text-white py-2 rounded-xl"
                    >
                        Create
                    </button>

                </div>
            </div>
        </div>
    );
};

export default CreatePlaylistModal;