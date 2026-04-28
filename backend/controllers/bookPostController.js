import BookPost from "../models/BookPost.js";

// get posts by book ID
export const getPostsByBook = async (req, res) => {
    try {
        const { bookId } = req.params;

        const posts = await BookPost.find({ bookId })
            .sort({ createdAt: -1 });

        res.json(posts);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// create post
export const createPost = async (req, res) => {
    try {
        const { bookId } = req.params;
        const { content } = req.body;

        if (!content?.trim()) {
            return res.status(400).json({ message: "Content required" });
        }

        const newPost = await BookPost.create({
            bookId,
            content: content.trim(),
            createdBy: req.user._id,
            userName: req.user.name,
            authorRole: req.user.role,
        });

        res.status(201).json(newPost);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// delte post
export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await BookPost.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const user = req.user;

        const isAdmin = user.role === "admin";
        const isModerator = user.role === "moderator";
        const isAuthor = post.createdBy.toString() === user._id.toString();

        const authorRole = post.authorRole || "user";

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

        if (!canDelete) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await post.deleteOne();

        res.json({ message: "Post deleted" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};