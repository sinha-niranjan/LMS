import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_CONNECT);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`);
  }
};

export default connectDB;
