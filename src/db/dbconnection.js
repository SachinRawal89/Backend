import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)   // mongoose.connect ek return object deta hai jise ham variable mein store kar skte hain.
        console.log(connectionInstance);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection failed:", error);
        process.exit(1)   // process.exit method hai jo hame node provide krta hai
    }
}

export default connectDB;