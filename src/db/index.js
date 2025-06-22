import mongoose from "mongoose";
import { db_name } from "../../constants.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${db_name}`);
    console.log(`✅ MongoDB connected to database: ${db_name}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
