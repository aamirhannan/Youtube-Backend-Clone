import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const registerUser = asyncHandler( async(req,res)=>{
    
    // step - 1 get user details from frontend

    const {fullName, email, username, password} = req.body
    
    // step - 2 Validation to check if all data is correct
    if(
        [fullName, email, username, password].some((field)=> field?.trim() === "")
    ){
        throw new ApiError(400, "All Field  are required")
    }

    if(!email.includes('@')){
        throw new ApiError(400, "Email Field  are required")
    }

    // step - 3 Check if user already exist (Email, username)
    const existedUser = await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409, 'user already exist')
    }

    // step - 4 Check if required image is there
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,'Avatar is required')
    }

    if(!coverImageLocalPath){
        throw new ApiError(400,'Cover Image is required')
    }


    // step - 5 Upload them to cloudinary if available
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if(!avatar){
        throw new ApiError(400,'Avatar is required')
    }

    // step - 6 Create User Object - create entry in Database
    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })
    
    // step - 7 remove refresh token and password
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    // step - 8 check for user creation
    if(!createdUser){
        throw new ApiError(500, "Error while registering user")
    }

    // step - 9 return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )

})

 
export {registerUser}



    // step - 1 get user details from frontend

    // step - 2 Validation to check if all data is correct

    // step - 3 Check if user already exist (Email, username)

    // step - 4 Check if required image is there

    // step - 5 Upload them to cloudinary if available

    // step - 6 Create User Object - create entry in Database

    // step - 7 remove refresh token and password

    // step - 8 check for user creation

    // step - 9 return response