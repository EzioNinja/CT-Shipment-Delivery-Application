const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const connectDB = async () => {
  const mongoURL = process.env.mongo_url;

  if (!mongoURL) {
    console.error('MongoDB URL is not defined in the environment variables.');
    process.exit(1); 
  }

  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true, 
    });
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
