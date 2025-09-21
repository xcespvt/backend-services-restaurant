import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGODB_URI, DB_NAME } = process.env;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in .env file");
  process.exit(1);
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME || undefined,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
    return mongoose.connection;
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export const testConnection = async () => {
  try {
    switch (mongoose.connection.readyState) {
      case 1: // connected
        console.log("✅ MongoDB connection is active");
        return true;
      case 2: // connecting
        console.log("⏳ MongoDB is still connecting...");
        return false;
      default: // disconnected or disconnecting
        console.log("⚠️  MongoDB is not connected. Attempting to reconnect...");
        await connectDB();
        return mongoose.connection.readyState === 1;
    }
  } catch (error) {
    console.error("❌ MongoDB testConnection error:", error.message);
    return false;
  }
};
