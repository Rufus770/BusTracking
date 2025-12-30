const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a new student
// @route   POST /api/auth/student/register
// @access  Public
const registerStudent = async (req, res) => {
    const { name, usn, phone, password } = req.body;

    try {
        const userExists = await User.findOne({ usn });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            usn,
            phone,
            password,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                usn: user.usn,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Auth student & get token
// @route   POST /api/auth/student/login
// @access  Public
const loginStudent = async (req, res) => {
    const { usn, password } = req.body;

    try {
        const user = await User.findOne({ usn });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                usn: user.usn,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid USN or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Auth driver & get token
// @route   POST /api/auth/driver/login
// @access  Public
const loginDriver = (req, res) => {
    const { username, password } = req.body;
    console.log('Driver login attempt:', { username, password });

    // Hardcoded driver credentials
    if (username === 'driver' && password === 'driver123') {
        // In a real app, you might want to generate a token for the driver too
        res.json({ 
            message: 'Driver authenticated successfully',
            token: jwt.sign({ id: 'driver_user' }, process.env.JWT_SECRET, { expiresIn: '1h' })
        });
    } else {
        res.status(401).json({ message: 'Invalid driver credentials' });
    }
};

module.exports = { registerStudent, loginStudent, loginDriver };
