import Club from "../models/Club.js";

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
        const { name, genre, description } = req.body;

        const newClub = await Club.create({
            name,
            genre,
            description,
            createdBy: req.user._id,
            members: [req.user._id], // creator is member
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

        const alreadyMember = club.members.includes(req.user._id);

        if (alreadyMember) {
            return res.status(400).json({ message: "Already joined" });
        }

        club.members.push(req.user._id);
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

        await club.save();

        res.json({ message: "Left club", club });
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