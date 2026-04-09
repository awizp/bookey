import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHeart, FaPlus } from "react-icons/fa";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";

import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";


const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showSelect, setShowSelect] = useState(false);

  const { books, collections, addBookToCollection } = useContext(DataContext);
  const { currentUser } = useContext(AuthContext);

  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="p-6">
        <p>Book not found</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden">

      <title>Book details | Bookey</title>

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* main content */}
      <div className="flex-1 flex flex-col">

        {/* navabr */}
        <AppNavbar setIsOpen={setIsOpen} />

        <div className="flex-1 overflow-y-auto bg-bgLight dark:bg-darkBg p-4">

          {/* back btn */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm mb-4 text-textSecondary font-semibold text-primary cursor-pointer"
          >
            <FaArrowLeft />
            Back
          </button>

          {/* container */}
          <div className="bg-white dark:bg-darkCard rounded-2xl p-4 md:p-6">

            <div className="flex flex-col md:flex-row items-start gap-16">

              <div className="w-fit">
                <div className="w-fit h-full overflow-hidden rounded-xl border-2 border-primary">
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

                <p className="text-textSecondary mt-1">
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
                    onClick={() => setShowSelect(!showSelect)}
                    className="flex items-center gap-2 justify-center bg-primary text-white px-4 py-2 rounded-xl cursor-pointer">
                    <FaPlus />
                    Add to Playlist
                  </button>

                  <button className="flex items-center gap-2 justify-center border px-4 py-2 rounded-xl cursor-pointer">
                    <FaHeart />
                    Like
                  </button>

                </div>

                {showSelect && (
                  <div className="mt-3 bg-white dark:bg-darkCard border-2 border-black/20 rounded-xl p-2 space-y-2 max-h-40 overflow-y-auto">

                    {collections.length === 0 ? (
                      <p className="text-xs text-gray-500 px-2">
                        No playlists available
                      </p>
                    ) : (
                      collections.map((col) => (
                        <button
                          key={col.id}
                          onClick={() => {
                            addBookToCollection(col.id, book);
                            setShowSelect(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary/10 text-sm"
                        >
                          {col.name}
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