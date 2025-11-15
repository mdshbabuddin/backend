import dotenv from "dotenv";
dotenv.config({ path: './.env' });

import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  // let safePath;
  try {
       if(!localFilePath) return null;
        // FIX 1: Convert Windows backslashes to forward slashes
    // Cloudinary often fails with "C:\path\to\file"
      //  const safePath = localFilePath.replace(/\\/g, "/");
       //upload the file on cloudinary
       const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto"
       })
       //file has been uploaded successfully
       //console.log("file is uploaded on cloudinary", response.url);
       fs.unlinkSync(localFilePath)
       return response;

  } catch (error) {
       if (safePath) {
         fs.unlinkSync(localFilePath);   // remove temporary file
       }
       console.log("CLOUDINARY UPLOAD ERROR:", error);
       return null;
  }
};



export {uploadOnCloudinary};