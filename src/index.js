import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
    path:'./env',
})
connectDB()
.then( () => {
    app.listen(process.enc.PORT || 8000, () => {
        console.log(`server is running at ${process.env.PORT}`);
    })
})
.catch((err) =>{
    console.log("Mongodb connection failed");
})