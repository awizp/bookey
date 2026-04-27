import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const CreateClubModal = ({ isOpen, setIsOpen, onCreate }) => {

    const [form, setForm] = useState({
        name: "",
        genre: "",
    });

    if (!isOpen) return null;

    const handleCreate = () => {
        if (!form.name || !form.genre) return;
        onCreate(form);
        setIsOpen(false);
        setForm({ name: "", genre: "" });
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

            <div className="bg-white dark:bg-darkCard p-5 rounded-2xl w-full max-w-md">

                <button
                    onClick={() => setIsOpen(false)}
                    className="float-right"
                >
                    <FaTimes />
                </button>

                <h2 className="text-lg font-semibold mb-4">
                    Create Club
                </h2>

                <input
                    placeholder="Club Name"
                    className="w-full p-3 mb-3 rounded-xl bg-gray-100 dark:bg-gray-800"
                    onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                    }
                />

                <input
                    placeholder="Genre"
                    className="w-full p-3 mb-4 rounded-xl bg-gray-100 dark:bg-gray-800"
                    onChange={(e) =>
                        setForm({ ...form, genre: e.target.value })
                    }
                />

                <button
                    onClick={handleCreate}
                    className="w-full bg-primary text-white py-2 rounded-xl"
                >
                    Create Club
                </button>

            </div>
        </div>
    );
};

export default CreateClubModal;