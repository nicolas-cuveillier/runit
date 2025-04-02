const Club = require('../models/club');
const User = require('../models/user');
const Run = require('../models/run');
require('dotenv').config()
const s3 = require('../database/s3')
const { GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

exports.createClub = async (req, res) => {
    const { owner, name, description, location, logo, cover_picture, members, runs, admins, leaders } = req.body;

    // Input validation
    if (!owner || !name || !description || !location) {
        return res.status(400).json({ message: 'Owner, name, description, and location are required' });
    }

    try {
        // Create a new club
        const newClub = new Club({
            owner,
            name,
            description,
            location,
            logo: logo || '',
            cover_picture: cover_picture || [],
            members: members || [owner],
            runs: runs || [],
            admins: admins || [],
            leaders: leaders || []
        });

        // Save the club to the database
        const savedClub = await newClub.save();

        // Update the owner's clubs
        await User.findByIdAndUpdate(owner, { $push: { clubs: savedClub._id } });

        // Update the members' clubs
        await User.updateMany(
            { _id: { $in: members } },
            { $push: { clubs: savedClub._id } }
        );

        // Respond with the created club
        res.status(201).json({ message: 'Club created successfully', club: newClub });
    } catch (error) {
        console.error('Error creating club:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateClub = async (req, res) => {
    const { id } = req.params;
    const { owner, name, description, location, logo, cover_picture, members, runs, admins, leaders } = req.body;

    // Input validation
    if (!id) {
        return res.status(400).json({ message: 'Club ID is required' });
    }

    try {
        // Find the club by ID
        const club = await Club.findById(id);
        if (!club) {
            return res.status(404).json({ message: 'Club not found' });
        }

        // Update fields if they are provided
        if (owner && owner !== club.owner.toString()) {
            // Remove the club from the old owner
            await User.findByIdAndUpdate(club.owner, { $pull: { clubs: club._id } });
            // Add the club to the new owner
            club.owner = owner;
            await User.findByIdAndUpdate(owner, { $push: { clubs: club._id } });
        }
        if (name) club.name = name;
        if (description) club.description = description;
        if (location) club.location = location;
        if (logo) club.logo = logo;
        if (cover_picture) club.cover_picture = cover_picture;
        if (members) {
            // Remove the club from the old members
            await User.updateMany(
                { _id: { $in: club.members } },
                { $pull: { clubs: club._id } }
            );

            // Add the club to the new members
            club.members = members;
            await User.updateMany(
                { _id: { $in: members } },
                { $push: { clubs: club._id } }
            );
        }
        if (runs) club.runs = runs;
        if (admins) club.admins = admins;
        if (leaders) club.leaders = leaders;

        // Save the updated club to the database
        await club.save();

        // Respond with the updated club
        res.status(200).json({ message: 'Club updated successfully', club });
    } catch (error) {
        console.error('Error updating club:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.retrieveClub = async (req, res) => {
    const { id } = req.params;

    // Input validation
    if (!id) {
        return res.status(400).json({ message: 'Club ID is required' });
    }

    try {
        // Find the club by ID
        const club = await Club.findById(id)
            .populate('members', 'firstname lastname description profil_picture')
            .populate('admins', 'firstname lastname description profil_picture')
            .populate('leaders', 'firstname lastname description profil_picture')
            .populate('runs', 'title description start_date location recurrence distance original_run');
        if (!club) {
            return res.status(404).json({ message: 'Club not found' });
        }

        // Retrieve the logo and cover picture URLs)
        if (!club.logo_url || !club.logo_url.url || club.logo_url.valid_until < new Date()) {
            let command = new GetObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: club.logo
            })
            let url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            club.logo_url.url = url;
            club.logo_url.valid_until = new Date(Date.now() + 3600 * 1000);
        }

        if (!club.cover_picture_url || !club.cover_picture_url.url || club.cover_picture_url.valid_until < new Date()) {
            let command = new GetObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: club.cover_picture
            })
            url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            club.cover_picture_url.url = url;
            club.cover_picture_url.valid_until = new Date(Date.now() + 3600 * 1000);
        }

        await club.save();

        // Respond with the retrieved club
        res.status(200).json(club);
    } catch (error) {
        console.error('Error retrieving club:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteClub = async (req, res) => {
    const { id } = req.params;

    // Input validation
    if (!id) {
        return res.status(400).json({ message: 'Club ID is required' });
    }

    try {
        // Find the club by ID and delete it
        const club = await Club.findByIdAndDelete(id);
        if (!club) {
            return res.status(404).json({ message: 'Club not found' });
        }

        // Remove the club from the owner
        await User.findByIdAndUpdate(club.owner, { $pull: { clubs: club._id } });

        // Remove the club from the members
        await User.updateMany(
            { _id: { $in: club.members } },
            { $pull: { clubs: club._id } }
        );

        // Remove the club from the admins and leaders
        await User.updateMany(
            { _id: { $in: club.admins } },
            { $pull: { clubs: club._id } }
        );

        await User.updateMany(
            { _id: { $in: club.leaders } },
            { $pull: { clubs: club._id } }
        );

        // Remove all runs associated with this club
        await Run.deleteMany({ _id: { $in: club.runs } });

        // Respond with success message
        res.status(200).json({ message: 'Club deleted successfully' });
    } catch (error) {
        console.error('Error deleting club:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.listClubs = async (req, res) => {
    try {
        const { search } = req.query

        if (!search) {
            const clubs = await Club.find();
            return res.status(200).json(clubs);
        }

        const clubs = await Club.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } }
            ]
        });

        res.status(200).json(clubs);
    } catch (error) {
        console.error('Error fetching clubs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
