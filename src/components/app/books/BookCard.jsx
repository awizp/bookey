import { useNavigate } from "react-router-dom";
import { useContext, useState, useMemo } from "react";
import { FaHeart, FaPlus, FaTrash } from "react-icons/fa";

import { DataContext } from "../../../context/DataContext";
import { AuthContext } from "../../../context/AuthContext";
import { ToastContext } from "../../../context/ToastContext";

const BookCard = ({ book }) => {

  const navigate = useNavigate();

  const [showSelect, setShowSelect] = useState(false);

  const {
    collections,
    addBookToCollection,
    createCollection,
    deleteBook,
  } = useContext(DataContext);

  const { currentUser } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  // user collections
  const userCollections = useMemo(() => {
    return collections.filter(
      (col) => col.userId === currentUser.id
    );
  }, [collections, currentUser]);

  const canDelete = ["admin", "moderator"].includes(currentUser.role);

  const handleDelete = (e) => {
    e.stopPropagation();

    if (!window.confirm("Delete this book from platform?")) return;

    deleteBook(book.id, currentUser);
    showToast("Book removed from platform", "error");
  };

  const handleNavigate = () => {
    navigate(`/app/book/${book.id}`);
  };

  const handleToggleSelect = (e) => {
    e.stopPropagation();
    setShowSelect((prev) => !prev);
  };

  const handleLike = (e) => {
    e.stopPropagation();

    let liked = userCollections.find(
      (c) => c.type === "liked"
    );

    if (!liked) {
      const newLiked = {
        name: "Liked Books",
        type: "liked",
      };

      createCollection(newLiked, currentUser);

      showToast("Liked playlist created", "success");
      return;
    }

    const exists = liked.books.find((b) => b.id === book.id);

    if (exists) {
      showToast("Already liked", "info");
      return;
    }

    addBookToCollection(liked.id, book);
    showToast("Added to liked books", "success");
  };

  const handleAddToCollection = (col, e) => {
    e.stopPropagation();

    const exists = col.books.find((b) => b.id === book.id);

    if (exists) {
      showToast("Already in playlist", "info");
      return;
    }

    addBookToCollection(col.id, book);
    showToast("Added to playlist", "success");

    setShowSelect(false);
  };

  return (
    <div
      onClick={handleNavigate}
      className="group cursor-pointer bg-white dark:bg-darkCard rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 p-3 relative"
    >

      {/* image */}
      <div className="relative h-56 overflow-hidden rounded-xl">

        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-fill group-hover:scale-105 transition duration-300"
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />

        {/* actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">

          <button
            onClick={handleLike}
            className="bg-white/90 dark:bg-darkCard/90 p-2 rounded-full text-gray-600 hover:text-primary"
          >
            <FaHeart size={12} />
          </button>

          <button
            onClick={handleToggleSelect}
            className="bg-white/90 dark:bg-darkCard/90 p-2 rounded-full text-gray-600 hover:text-primary"
          >
            <FaPlus size={12} />
          </button>

          {canDelete && (
            <button
              onClick={handleDelete}
              className="bg-white/90 dark:bg-darkCard/90 p-2 rounded-full text-gray-600 hover:text-red-500"
            >
              <FaTrash size={12} />
            </button>
          )}

        </div>

      </div>

      {/* dropdown */}
      {showSelect && (
        <div className="absolute top-14 right-2 bg-white dark:bg-darkCard rounded-xl p-2 space-y-1 shadow-lg w-fit min-w-40 z-50">

          {userCollections.length === 0 ? (
            <p className="text-xs text-gray-500 px-2">
              No playlists
            </p>
          ) : (
            userCollections.map((col) => (
              <button
                key={col.id}
                onClick={(e) => handleAddToCollection(col, e)}
                className="block w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-primary/10"
              >
                {col.name || "Untitled"}
              </button>
            ))
          )}

        </div>
      )}

      {/* content */}
      <div className="p-3 space-y-1">

        <p className="text-sm font-semibold line-clamp-2 text-gray-800 dark:text-white">
          {book.title}
        </p>

        <p className="text-xs text-gray-600">
          {book.author}
        </p>

        <div className="flex flex-wrap gap-1 mt-2">
          {book.genre.slice(0, 2).map((g, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full"
            >
              {g}
            </span>
          ))}
        </div>

      </div>

    </div>
  );
};

export default BookCard;