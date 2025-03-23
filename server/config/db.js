import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected".bgGreen.white);
  } catch (error) {
    console.log(`Error mongodb connection ${error}`.bgRed.white);
  }
};
