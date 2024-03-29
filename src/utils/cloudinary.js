import dotenv from "dotenv";
import {v2 as cloudinary} from "cloudinary";
import fs from "fs"; //file system
dotenv.config({
    path:'./env',
})

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null;
        //upload the file to cloudinary
        const resource = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        //File has been uploaded successfully
        console.log("file is uploaded to cloudinary",resource.url);
        return response;
    }
    catch(error){
        fs.unlink(localFilePath);
        //remove the locally saved temporary file as the upload got failed
        return null;
    }
}

export {uploadCloudinary};