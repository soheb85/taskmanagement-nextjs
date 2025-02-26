import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;


const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB already connected.");
      return;
    }

    await mongoose.connect(MONGODB_URI, {
      dbName: "taskmanagement", 
    });

    console.log("MongoDB connected to Atlas successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
