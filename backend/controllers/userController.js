// controllers/userController.js

const User = require("../models/user");


// @desc    Get logged-in user's profile
// @route   GET /api/user/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('User profile error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getUserProfile };
