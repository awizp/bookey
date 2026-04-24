import { useContext } from "react";

import { DataContext } from "../../../context/DataContext";

const ModerationPanel = () => {

  const { users, blockUser, unblockUser } = useContext(DataContext);

  const handleBlock = (userId, duration) => {
    blockUser(userId, duration);
  };

  const handleUnblock = (userId) => {
    unblockUser(userId);
  };

  return (
    <div className="bg-white dark:bg-darkCard rounded-2xl p-5 space-y-4">

      <h2 className="text-lg font-semibold">
        User Moderation
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

        {users
          .filter((u) => u.role === "user")
          .map((user) => {

            const isBlocked =
              user.blockedUntil &&
              new Date().getTime() < user.blockedUntil;

            return (
              <div
                key={user.id}
                className="bg-bgLight dark:bg-darkBg p-4 rounded-xl space-y-2"
              >

                <p className="font-semibold text-sm">
                  {user.name}
                </p>

                <p className="text-xs text-gray-500">
                  @{user.username}
                </p>

                <p className="text-xs text-gray-400">
                  {isBlocked ? "Blocked" : "Active"}
                </p>

                <div className="flex gap-2 mt-2">

                  {!isBlocked ? (
                    <select
                      onChange={(e) =>
                        handleBlock(user.id, Number(e.target.value))
                      }
                      className="text-xs px-2 py-1 rounded-lg bg-white dark:bg-darkCard"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Block
                      </option>
                      <option value={8 * 60 * 60 * 1000}>
                        8 hours
                      </option>
                      <option value={12 * 60 * 60 * 1000}>
                        12 hours
                      </option>
                      <option value={24 * 60 * 60 * 1000}>
                        1 day
                      </option>
                    </select>
                  ) : (
                    <button
                      onClick={() => handleUnblock(user.id)}
                      className="text-xs px-3 py-1 bg-primary text-white rounded-lg"
                    >
                      Unblock
                    </button>
                  )}

                </div>

              </div>
            );
          })}

      </div>

    </div>
  );
};

export default ModerationPanel;