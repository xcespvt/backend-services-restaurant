import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Database connection string
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env file');
  process.exit(1);
}

// MongoDB connection
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {

    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Test connection
export const testConnection = async () => {
  try {
    // Check if we're connected
    if (mongoose.connection.readyState === 1) {
      console.log('✅ MongoDB connection is active');
      return true;
    } else {
      console.log('⚠️  MongoDB is not connected. Attempting to connect...');
      return await connectDB();
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    return false;
  }
};