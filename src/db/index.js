import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const db = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log('DB connection established')
    } catch (error) {
        console.log('Database Connection Failed',error)
        throw error
    }
}

export default connectDB;