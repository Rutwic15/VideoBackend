import  mongoose  from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n Mongodb connected !! DB:host ${connectionInstance.connection.host}`)
    }
    catch(error){
        console.log("Mongodb Connection error",error);
        Process.exit(1);
    }
}

export default connectDB;