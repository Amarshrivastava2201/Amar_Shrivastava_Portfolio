const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/user');
const connectDB = require('../config/db');

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await User.findOne({ email: 'amar.ssgi@gmail.com' });

    if (adminExists) {
      console.log('Admin already exists');
      process.exit();
    }

    const admin = new User({
      name: 'Amar Shrivastava',
      email: 'amar.ssgi@gmail.com',
      password: 'Amar12345'
    });

    await admin.save();

    console.log('Admin created successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();
