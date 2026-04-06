import { FaHeart, FaPlus, FaArrowRight } from "react-icons/fa";

const CollectionCard = ({ type = "create", onClick }) => {

  const isLiked = type === "liked";

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer relative bg-white dark:bg-darkCard rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
    >

      {/* bg accent */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-primary/5 transition" />

      {/* content */}
      <div className="relative z-10 flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${isLiked ? "bg-primary/20 text-primary dark:bg-gray-800" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"}`}
        >
          {isLiked ? <FaHeart /> : <FaPlus />}
        </div>

        {/* content */}
        <div className="flex-1">
          <p className="font-semibold text-sm text-textPrimary dark:text-white">
            {isLiked ? "Liked Books" : "Create Playlist"}
          </p>

          <p className="text-xs text-textSecondary mt-1">
            {isLiked
              ? "Your favorite saved books"
              : "Build your own collection"}
          </p>
        </div>

        {/* arrow icon */}
        <FaArrowRight className="text-gray-400 dark:text-gray-200 group-hover:text-primary transition" />

      </div>
    </div>
  );
};

export default CollectionCard;