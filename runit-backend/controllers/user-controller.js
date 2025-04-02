const Club = require('../models/club');
const Run = require('../models/run');
const User = require('../models/user');
require('dotenv').config()
const s3 = require('../database/s3')
const { GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

exports.createUser = async (req, res) => {
    const { firstname, lastname, mail, password, description, phone, location, profil_picture } = req.body;

    // Input validation
    if (!firstname || !lastname || !mail || !password) {
        return res.status(400).json({ message: 'Required fields are missing' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ mail });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(process.env.PASSWORD_SALT || 10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            firstname: firstname,
            lastname: lastname,
            mail: mail,
            password: hashedPassword,
            description: description || '',
            phone: phone || '',
            location: location || '',
            profil_picture: profil_picture || './images/default_profil_picture.jpg',
        });

        // Save the user to the database
        await newUser.save();

        // Respond with the created user (excluding password)
        res.status(201).json({ message: 'User created successfully', user: { id: newUser._id, firstname, lastname, mail } });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, mail, password, description, phone, clubs, location, runs, profil_picture_url } = req.body;

    // Input validation
    if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    if (!firstname && !lastname && !mail && !password && !description && !phone && !clubs && !location && !runs) {
        return res.status(400).json({ message: 'At least one field must be provided for update' });
    }

    try {
        // Find the user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields if they are provided
        if (firstname) user.firstname = firstname;
        if (lastname) user.lastname = lastname;
        if (mail) user.mail = mail;
        if (description) user.description = description;
        if (phone) user.phone = phone;
        if (clubs) {
            // Remove the user from the old clubs
            await Club.updateMany(
                { _id: { $in: user.clubs } },
                { $pull: { members: user._id } }
            );

            // Add the user to the new clubs
            user.clubs = clubs;
            await Club.updateMany(
                { _id: { $in: clubs } },
                { $push: { members: user._id } }
            );
        }
        if (runs) {
            // Remove the user from the old runs
            await Run.updateMany(
                { _id: { $in: user.runs } },
                { $pull: { participants: user._id } }
            );

            // Add the user to the new runs
            user.runs = runs;
            await Run.updateMany(
                { _id: { $in: runs } },
                { $push: { participants: user._id } }
            );
        }
        if (location) user.location = location;

        // Hash the new password if it is provided
        if (password) user.password = password;

        // Save the updated user to the database
        await user.save();

        // Respond with the updated user (excluding password)
        res.status(200).json({
            message: 'User updated successfully',
            user: {
                id: user._id,
                lastname: user.lastname,
                firstname: user.firstname,
                email: user.mail,
                description: user.description,
                phone: user.phone,
                clubs: user.clubs,
                location: user.location
            },
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.loginUser = async (req, res) => {
    const { mail, password } = req.body;

    // Input validation
    if (!mail || !password) {
        console.log(mail, password)
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ mail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if password is correct
        const isMatch = password == user.password;
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Respond with the user and token
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.retrieveUser = async (req, res) => {
    const { id } = req.params;

    // Input validation
    if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        // Find the user by ID
        const user = await User.findById(id).select('-password').populate('clubs', "name members runs location logo");
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.profil_picture_url.url || !user.profil_picture_url.valid_until || user.profil_picture_url.valid_until < new Date()) {
            const command = new GetObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: user.profil_picture
            })
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            user.profil_picture_url.url = url;
            user.profil_picture_url.valid_until = new Date(Date.now() + 3600 * 1000);
        }

        // Respond with the retrieved user
        res.status(200).json(user);
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    // Input validation
    if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        // Find the user by ID and delete
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove the user from the clubs
        await Club.updateMany(
            { _id: { $in: user.clubs } },
            { $pull: { members: user._id } }
        );

        // Remove the user from the runs
        await Run.updateMany(
            { _id: { $in: user.runs } },
            { $pull: { participants: user._id } }
        );

        // TODO user deletion doesn't clean every club he is the owner and thus every linked runs

        // Respond with success message
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.listUsers = async (req, res) => {
    try {

        const { search } = req.query

        if (!search) {
            const users = await User.find().limit(10);
            return res.status(200).json(users);
        }

        const users = await User.find({
            $or: [
                { lastname: { $regex: search, $options: 'i' } },
                { firstname: { $regex: search, $options: 'i' } }
            ]
        }).limit(10);

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};