import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'    

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath)=>{

    try {
        //check if path received id null
        if(!localFilePath) return null;
        
        // use cloudinary to upload file on cloud
        const response = await cloudinary.uploader.upload(localFilePath,{resource_type:'auto'})
        console.log("File uploaded successfully",response.url);
        // return the responce returned after successful upload of file
        return response;

    } catch (error) {
        //if it cause any error, the file that was uploaded to server must be deleted to keep the server clean
        fs.unlink(localFilePath)
        return null
    }
}

export {uploadOnCloudinary}
