import { FaTrash } from "react-icons/fa";

const PostCard = ({ post, currentUser, onDelete }) => {

    const isAdmin = currentUser.role === "admin";
    const isModerator = currentUser.role === "moderator";
    const isAuthor = post.createdBy === currentUser.id;

    const authorRole = post.authorRole || "user";

    // delete post
    let canDelete = false;

    if (isAdmin) {
        canDelete = true;

    } else if (isModerator) {
        if (isAuthor) {
            canDelete = true;
        } else if (authorRole === "user") {
            canDelete = true;
        }

    } else if (isAuthor) {
        canDelete = true;
    }

    // role label
    const roleLabel = authorRole === "admin" ? "Admin" : authorRole === "moderator"
        ? "Moderator" : "User";

    return (
        <div
            className={`p-4 rounded-2xl shadow-sm space-y-3 transition bg-white dark:bg-darkCard`}
        >

            {/* header */}
            <div className="flex justify-between items-start">

                <div className="flex items-center gap-3">

                    {/* avatar */}
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-semibold">
                        {post.userName?.charAt(0).toUpperCase()}
                    </div>

                    {/* name and role */}
                    <div className="flex items-center gap-2 flex-wrap">

                        <p className="text-sm font-medium">
                            {post.userName}
                        </p>

                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            {roleLabel}
                        </span>

                    </div>

                </div>

                {/* delete posts */}
                {canDelete && (
                    <button
                        onClick={() => onDelete(post.id)}
                        className="text-red-500 text-xs cursor-pointer"
                    >
                        <FaTrash />
                    </button>
                )}

            </div>

            {/* content */}
            <p className="text-sm leading-relaxed">
                {post.content}
            </p>

            {/* footer */}
            <p className="text-[10px] text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
            </p>

        </div>
    );
};

export default PostCard;