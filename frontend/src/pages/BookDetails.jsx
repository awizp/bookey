import { useContext, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHeart, FaPlus, FaTrash } from "react-icons/fa";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";

import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showSelect, setShowSelect] = useState(false);

  const { books, collections, addBookToCollection, createLikedCollection, deleteBook } = useContext(DataContext);
  const { currentUser } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  const book = books.find((b) => b.id === id);
  const canDelete = ["admin", "moderator"].includes(currentUser.role);

  const userCollections = useMemo(() => {
    return collections.filter(
      (col) => col.userId === currentUser.id
    );
  }, [collections, currentUser]);

  if (!book) {
    return (
      <div className="p-6">
        <p>Book not found</p>
      </div>
    );
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleToggleSelect = () => {
    setShowSelect((prev) => !prev);
  };

  // add collection
  const handleAddToCollection = async (col) => {

    const exists = col.books.find((b) => b.id === book.id);

    if (exists) {
      showToast("Book already in playlist", "info");
      return;
    }

    try {
      await addBookToCollection(col.id, book);
      showToast("Added to playlist", "success");
      setShowSelect(false);
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  // liked collection
  const handleLike = async () => {

    let liked = userCollections.find(
      (c) => c.type === "liked"
    );

    try {
      if (!liked) {
        liked = await createLikedCollection(currentUser.id);
        showToast("Liked playlist created", "success");
      }

      const exists = liked.books.find((b) => b.id === book.id);

      if (exists) {
        showToast("Already liked", "info");
        return;
      }

      await addBookToCollection(liked.id, book);

      showToast("Added to liked books", "success");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  // delete book
  const handleDelete = async () => {

    if (!window.confirm("Delete this book from platform?")) return;

    try {
      await deleteBook(book.id, currentUser);
      showToast("Book removed from platform", "error");
      navigate("/app/library");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">

      <title>Book details | Bookey</title>

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col">

        <AppNavbar setIsOpen={setIsOpen} />

        <div className="flex-1 overflow-y-auto bg-bgLight dark:bg-darkBg p-4">

          {/* back btn */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm mb-4 font-semibold text-primary cursor-pointer"
          >
            <FaArrowLeft />
            Back
          </button>

          {/* container */}
          <div className="bg-white dark:bg-darkCard rounded-2xl p-4 md:p-6">

            <div className="flex flex-col md:flex-row items-start gap-16">

              <div className="w-fit">
                <div className="w-fit h-full overflow-hidden rounded-xl">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  {book.title}
                </h1>

                <p className="text-gray-600 mt-1">
                  by {book.author}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {book.genre.map((g, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                {/* synopsis */}
                <p className="mt-5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {book.description ||
                    "This book explores themes, ideas, and storytelling that engage readers deeply. A must-read for enthusiasts of this genre."}
                </p>

                {/* Add book */}
                <div className="flex gap-3 mt-6 flex-col xs:flex-row">

                  <button
                    onClick={handleToggleSelect}
                    className="flex items-center gap-2 justify-center bg-primary text-white px-4 py-2 rounded-xl cursor-pointer"
                  >
                    <FaPlus />
                    Add to Playlist
                  </button>

                  <button
                    onClick={handleLike}
                    className="flex items-center gap-2 justify-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl cursor-pointer"
                  >
                    <FaHeart />
                    Like
                  </button>

                  {canDelete && (
                    <button
                      onClick={handleDelete}
                      className="flex items-center gap-2 justify-center bg-red-500 text-white px-4 py-2 rounded-xl cursor-pointer"
                    >
                      <FaTrash />
                      Delete Book
                    </button>
                  )}

                </div>

                {showSelect && (
                  <div className="mt-3 bg-white dark:bg-darkCard rounded-xl p-2 space-y-2 max-h-40 overflow-y-auto w-fit min-w-45 shadow-lg">

                    {userCollections.length === 0 ? (
                      <p className="text-xs text-gray-500 px-2">
                        No playlists available
                      </p>
                    ) : (
                      userCollections.map((col) => (
                        <button
                          key={col.id}
                          onClick={() => handleAddToCollection(col)}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary/10 text-sm"
                        >
                          {col.name || "Untitled Playlist"}
                        </button>
                      ))
                    )}

                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
