const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET;

// Create a new user
const createUser = async (req, res) => {
  const { name, email, bio, profile_image, pen_name, role, status, blogs, password } = req.body;

  try {
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10); // Generate custom salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash password with custom salt

    const newUser = new User({
      name,
      email,
      bio,
      profile_image,
      pen_name,
      role,
      status,
      blogs,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user' });
  }
};


// Get all users
const getAllUsers = async (req, res) => {
  const role ="writer";

  try {
    const users = await User.find({ role });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error getting users' });
  }

};
//active user
const getAllActiveWriters = async (req, res) => {
  const role = "writer";
  const status = "active";

  try {
    const activeWriters = await User.find({ role, status });
    res.json(activeWriters);
  } catch (error) {
    res.status(500).json({ message: 'Error getting active writers' });
  }
};

// Get a specific user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};


const addBlogToUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const blogId = req.body.blogId;

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { blogs: blogId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error adding blog to user' });
  }
};


// Update user's status to active or inactive
const updateUserStatus = async (req, res) => {
  try {
    const userId = req.params.userId;
    const newStatus = req.body.status;

    const user = await User.findByIdAndUpdate(
      userId,
      { status: newStatus },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user status' });
  }
};


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  addBlogToUser,
  updateUserStatus,
  getAllActiveWriters
};
