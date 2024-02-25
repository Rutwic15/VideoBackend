import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async(req,res) => {
    const {fullName, email, username, password} = req.body;
    console.log("email",email);

    if(
        [fullName,email,username,password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All Fields are required");
    }

    const existingUser = User.findOne({
        $or: [{username},{password}]
    })

    if(existingUser){
        throw ApiError(409,"User with Username or Email already exists");
    }

    //upload files to clodinary
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.path;

    if(!avatarLocalPath){
        throw ApiError(400, "Avatar is mandatory");
    }

    //upload to cloudinary
    const avatar = await uploadCloudinary(avatarLocalPath);
    const coverImage = await uploadCloudinary(coverImageLocalPath);

    if(!avatar){
        throw ApiError(400, "Avatar is mandatory");
    }

    //Create obj and insert data entry
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverimage: coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()

    })
    //Remove password and refresh token from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfully")
    )

})

export {registerUser}