const User = require('../models/user');
const generateToken = require('../utils/generateToken');

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { loginAdmin };
