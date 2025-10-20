import mongoose from "mongoose";

const connectMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("MongoDB connection failed:", error);
    throw error;
  }
}

export default connectMongoDB;
