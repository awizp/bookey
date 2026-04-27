import { useState, useContext } from "react";
import { FaTimes } from "react-icons/fa";

import { ToastContext } from "../../../context/ToastContext";

const CreatePostModal = ({ isOpen, setIsOpen, onSubmit }) => {

    const [form, setForm] = useState({
        content: "",
        type: "text",
    });

    const { showToast } = useContext(ToastContext);

    const handleClose = () => {
        setIsOpen(false);
        setForm({ content: "", type: "text" });
    };

    const handleSubmit = async () => {
        if (!form.content.trim()) {
            showToast("Content is required", "error");
            return;
        }

        await onSubmit(form);

        setForm({ content: "", type: "text" });
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

            <div className="w-full max-w-md bg-white dark:bg-darkCard rounded-2xl p-5 relative shadow-lg">

                {/* close */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 cursor-pointer"
                >
                    <FaTimes />
                </button>

                <h2 className="text-lg font-semibold mb-4">
                    Create Post / Quote
                </h2>

                {/* type selector */}
                <select
                    value={form.type}
                    onChange={(e) =>
                        setForm({ ...form, type: e.target.value })
                    }
                    className="w-full p-3 mb-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary"
                >
                    <option value="text">Post</option>
                    <option value="quote">Quote</option>
                </select>

                {/* content */}
                <textarea
                    value={form.content}
                    onChange={(e) =>
                        setForm({ ...form, content: e.target.value })
                    }
                    placeholder={
                        form.type === "quote"
                            ? "Write a quote..."
                            : "Write your post..."
                    }
                    className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary h-28 resize-none"
                />

                {/* actions */}
                <div className="flex gap-3 mt-6">

                    <button
                        onClick={handleClose}
                        className="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-gray-800"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="flex-1 bg-primary text-white py-2 rounded-xl"
                    >
                        Publish
                    </button>

                </div>

            </div>
        </div>
    );
};

export default CreatePostModal;