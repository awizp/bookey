import { FaUsers, FaArrowRight } from "react-icons/fa";

const ClubCard = ({ club, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer relative bg-white dark:bg-darkCard rounded-2xl dark:border-borderDark p-4 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
    >

      {/* hover effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-primary/5 transition" />

      <div className="relative z-10">
        <div className="flex items-center justify-between">

          {/* icon */}
          <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
            <FaUsers />
          </div>

          {/* genre badge */}
          <span className="text-[10px] px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300">
            {club.genre}
          </span>

        </div>

        {/* title */}
        <p className="mt-3 font-semibold text-sm">
          {club.name}
        </p>

        {/* members */}
        <p className="text-xs mt-1">
          {club.members} members
        </p>

        {/* action btn */}
        <div className="flex items-center justify-between mt-4">

          <button className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
            View Club
          </button>

          <FaArrowRight className="text-gray-400 group-hover:text-primary transition" />

        </div>

      </div>
    </div>
  );
};

export default ClubCard;