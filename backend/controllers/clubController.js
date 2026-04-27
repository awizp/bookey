import Club from "../models/Club.js";
import User from "../models/User.js";

// get all clubs
export const getClubs = async (req, res) => {
    try {
        const clubs = await Club.find().populate("createdBy", "name");
        res.json(clubs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get single club
export const getClubById = async (req, res) => {
    try {
        const club = await Club.findById(req.params.id)
            .populate("createdBy", "name")
            .populate("members", "name");

        if (!club) {
            return res.status(404).json({ message: "Club not found" });
        }

        res.json(club);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// create club
export const createClub = async (req, res) => {
    try {
        const { legacyId, name, genre, description } = req.body;

        const newClub = await Club.create({
            legacyId,
            name,
            genre: genre || "general",
            description,
            createdBy: req.user._id,
            members: [req.user._id],
            memberCount: 1,
            posts: [],
        });

        res.status(201).json(newClub);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// join club
export const joinClub = async (req, res) => {
    try {
        const club = await Club.findById(req.params.id);

        if (!club) {
            return res.status(404).json({ message: "Club not found" });
        }

        const alreadyMember = club.members.some(
            (id) => id.toString() === req.user._id.toString()
        );

        if (alreadyMember) {
            return res.status(400).json({ message: "Already joined" });
        }

        club.members.push(req.user._id);
        club.memberCount = Math.max(club.memberCount || 0, club.members.length - 1) + 1;

        await club.save();

        res.json({ message: "Joined club", club });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// leave club
export const leaveClub = async (req, res) => {
    try {
        const club = await Club.findById(req.params.id);

        if (!club) {
            return res.status(404).json({ message: "Club not found" });
        }

        club.members = club.members.filter(
            (id) => id.toString() !== req.user._id.toString()
        );

        club.memberCount = Math.max(club.members.length, (club.memberCount || 1) - 1);

        await club.save();

        res.json({ message: "Left club", club });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// add post in club
export const addPost = async (req, res) => {
    try {
        const { content, type } = req.body;

        const club = await Club.findById(req.params.id);

        if (!club) {
            return res.status(404).json({ message: "Club not found" });
        }

        const isMember = club.members.some(
            (id) => id.toString() === req.user._id.toString()
        );

        if (!isMember) {
            return res.status(403).json({ message: "Join the club to post" });
        }

        club.posts.unshift({
            content,
            type: type || "text",
            createdBy: req.user._id,
            userName: req.user.name,
            authorRole: req.user.role,
            createdAt: new Date(),
        });

        await club.save();

        res.status(201).json(club);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete post
export const deletePost = async (req, res) => {
    try {
        const club = await Club.findById(req.params.id);

        if (!club) {
            return res.status(404).json({ message: "Club not found" });
        }

        const post = club.posts.id(req.params.postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const currentUser = req.user;

        const isAdmin = currentUser.role === "admin";
        const isModerator = currentUser.role === "moderator";
        const isAuthor =
            post.createdBy?.toString() === currentUser._id.toString();

        // author post role
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

        post.deleteOne();
        await club.save();

        res.json(club);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete club
export const deleteClub = async (req, res) => {
    try {
        const club = await Club.findById(req.params.id);

        if (!club) {
            return res.status(404).json({ message: "Club not found" });
        }

        const isAdmin = req.user.role === "admin";
        const isModerator = req.user.role === "moderator";
        const isOwner = club.createdBy.toString() === req.user._id.toString();

        if (!isAdmin && !isModerator && !isOwner) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await club.deleteOne();

        res.json({ message: "Club deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};