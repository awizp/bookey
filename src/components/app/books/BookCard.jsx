import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const BookCard = ({ book }) => {

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/app/book/${book.id}`)}
      className="group cursor-pointer bg-white dark:bg-darkCard rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 p-2"
    >

      {/* book image */}
      <div className="relative h-56 overflow-hidden">
        <div className="w-full overflow-hidden rounded-xl">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
          />
        </div>

        {/* hover overlay */}
        <div className="absolute inset-0 bg-black/0 rounded-xl group-hover:bg-black/10 transition" />

        {/* click to book details */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 bg-white/90 dark:bg-darkCard/90 p-2 rounded-full text-gray-600 hover:text-primary transition"
        >
          <FaHeart size={12} />
        </button>
      </div>

      {/* content */}
      <div className="p-3">

        <p className="text-sm font-semibold line-clamp-2 text-textPrimary dark:text-white">
          {book.title}
        </p>

        <p className="text-xs text-textSecondary mt-1">
          {book.author}
        </p>

        {/* genre */}
        <div className="flex flex-wrap gap-1 mt-2">
          {book.genre.slice(0, 2).map((g, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-[2px] bg-primary/10 text-primary rounded-full"
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