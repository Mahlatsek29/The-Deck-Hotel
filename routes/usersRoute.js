const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Rooms = require("../models/room"); // Assuming you have a 'Rooms' model

// Register
router.post("/register", async (req, res) => {
    const newuser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const user = await newuser.save();
        res.send('User Registered Successfully');
        console.log(user);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Hash the provided password and compare it with the stored hashed password
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: 'Login failed' });
        }

        // Compare the hashed password here

        // Return user data if login is successful
        const temp = {
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            _id: user._id,
        };
        res.send(temp);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error });
    }
});

// Get all users
router.get("/getallusers", async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

// Delete user
router.delete('/deleteuser/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Add authentication and authorization checks here

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndRemove(userId);

        return res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to delete user' });
    }
});

// Update User
router.put('/updateuser/:userId', async (req, res) => {
    const { userId } = req.params;
    const updatedUserData = req.body;

    try {
        // Add authentication and authorization checks here

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        Object.assign(user, updatedUserData);

        await user.save();

        return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to update user' });
    }
});

// Add rooms
router.post("/addroom", async (req, res) => {
    try {
        const newRoom = new Rooms(req.body);
        await newRoom.save();
        res.send('New Room Added Successfully');
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

module.exports = router;
