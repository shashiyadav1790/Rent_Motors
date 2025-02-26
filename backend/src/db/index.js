import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DB_URL  || 'mongodb+srv://shashiyadav1790:w8yAn1pKTSwGnuWE@rentmotors.lynt7.mongodb.net/?retryWrites=true&w=majority&appName=RentMotors'}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST:${connectionInstance.connection.host} `
    );
  } catch (error) {
    console.log("MONGODB connection error ", error);
    process.exit(1);
  }
};

export default connectDB;
