import { dbName } from "../constants.js";
import mongoose from 'mongoose';

const dbConnect = async ()=>{
    try {
      const dbConnectionInstance =  await mongoose.connect(`${process.env.MONGODB_URL}/${dbName}`)
    } catch (error) {
        console.error(" MongoDB Connection Failed:", error.message);
        console.error("Full Error Details:", error);
        process.exit(1);
    }
}

export default dbConnect;