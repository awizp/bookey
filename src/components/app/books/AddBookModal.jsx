import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const genresList = [
  "action",
  "adventure",
  "romance",
  "business",
  "self help",
  "mystery",
  "thriller",
  "horror",
  "spirituality",
  "young adult",
  "fiction",
  "scifi",
  "crime",
  "classics",
  "manga",
  "manhwa",
  "novel",
  "graphic novel",
];

const AddBookModal = ({ isOpen, setIsOpen, onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    image: "",
    genre: [],
  });

  const toggleGenre = (g) => {
    setForm((prev) => ({
      ...prev,
      genre: prev.genre.includes(g)
        ? prev.genre.filter((item) => item !== g)
        : [...prev.genre, g],
    }));
  };

  const handleSubmit = () => {
    if (!form.title || !form.author) return;

    onSubmit?.(form);
    setIsOpen(false);

    // reset
    setForm({
      title: "",
      author: "",
      image: "",
      genre: [],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

      {/* modal div */}
      <div className="w-full max-w-lg bg-white dark:bg-darkCard rounded-2xl shadow-lg p-5 relative">

        {/* close modal */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
        >
          <FaTimes />
        </button>

        {/* header */}
        <h2 className="text-lg font-semibold mb-4">
          Add New Book
        </h2>

        {/* form */}
        <div className="space-y-4">
          <input
            placeholder="Book Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            placeholder="Author"
            value={form.author}
            onChange={(e) =>
              setForm({ ...form, author: e.target.value })
            }
            className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary"
          />
          
          <input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) =>
              setForm({ ...form, image: e.target.value })
            }
            className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary"
          />
          
          <div>
            <p className="text-sm font-medium mb-2">
              Select Genres
            </p>

            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">

              {genresList.map((g) => {
                const selected = form.genre.includes(g);

                return (
                  <button
                    key={g}
                    onClick={() => toggleGenre(g)}
                    className={`px-3 py-1 rounded-full text-xs transition ${ selected ? "bg-primary text-white" : "bg-gray-100 dark:bg-gray-800 hover:bg-primary/20"}`}
                  >
                    {g}
                  </button>
                );
              })}

            </div>
          </div>

        </div>

        {/* btns */}
        <div className="flex gap-3 mt-6">

          <button
            onClick={() => setIsOpen(false)}
            className="flex-1 border border-borderLight dark:border-borderDark py-2 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="flex-1 bg-primary text-white py-2 rounded-xl active:scale-95 transition"
          >
            Add Book
          </button>

        </div>

      </div>

    </div>
  );
};

export default AddBookModal;