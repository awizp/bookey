import { FaUsers, FaArrowRight } from "react-icons/fa";

const ClubCard = ({ club, onClick }) => {

  const memberCount =
    club.memberCount ||
    club.members?.length ||
    (typeof club.members === "number" ? club.members : 0);

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer relative bg-white dark:bg-darkCard rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
    >

      {/* hover effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-primary/5 transition" />

      <div className="relative z-10 flex flex-col h-full">

        {/* top section */}
        <div className="flex items-center justify-between">

          {/* icon */}
          <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
            <FaUsers />
          </div>

          {/* genre */}
          <span className="text-[10px] px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300">
            {club.genre}
          </span>

        </div>

        {/* title */}
        <p className="mt-3 font-semibold text-sm line-clamp-2">
          {club.name}
        </p>

        {/* members */}
        <p className="text-xs mt-1 text-gray-500">
          {memberCount} members
        </p>

        {/* bottom */}
        <div className="flex items-center justify-between mt-auto pt-4">

          <button
            className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // prevent double click bubbling
              onClick();
            }}
          >
            View Club
          </button>

          <FaArrowRight className="text-gray-400 group-hover:text-primary transition" />

        </div>

      </div>
    </div>
  );
};

export default ClubCard;