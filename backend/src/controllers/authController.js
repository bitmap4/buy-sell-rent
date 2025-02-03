const User = require('../models/User');
const jwt  = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, age, contactNumber, password } = req.body;
    const user = await User.create({
      firstName,
      lastName,
      email,
      age,
      contactNumber,
      password
    });
    res.status(201).json({ token: generateToken(user), user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ token: generateToken(user), user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCurrentUser = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) {
      // If password is updated, it will be re-hashed by pre-save hook in the User model.
    }
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};