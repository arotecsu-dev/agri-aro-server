import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL;

export const connectDatabase = async () => {
  try {
    await mongoose.connect(DATABASE_URL!);
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export const disconnectDatabase = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.error("MongoDB disconnection error:", error);
  }
};

export default mongoose;
