import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js"

const app = express();
app.use(cors({
    origin:process.env.cors_ORIGIN,
    credentials: true
    //read the docs
}));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended: true, limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/users",userRouter);



export {app};