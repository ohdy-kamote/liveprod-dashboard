import mongoose from "mongoose";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const connectMongoDB = async (retryCount = 0): Promise<void> => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("Connected to MongoDB successfully");
  } catch (error: any) {
    console.error("MongoDB connection error:", {
      message: error.message,
      code: error.code,
      retry: retryCount + 1,
      uri: process.env.MONGODB_URI?.replace(/\/\/[^:]+:[^@]+@/, "//[hidden]:[hidden]@")
    });

    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying connection in ${RETRY_DELAY}ms... (${retryCount + 1}/${MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return connectMongoDB(retryCount + 1);
    }
    
    throw new Error(`Failed to connect to MongoDB after ${MAX_RETRIES} attempts: ${error.message}`);
  }
}

export default connectMongoDB;
