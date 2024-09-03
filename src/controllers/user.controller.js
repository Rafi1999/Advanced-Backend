import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const registerUser = asyncHandler(async (req, res) => {
    // get user details from front-end
    // validation - not empty
    // check if user exists already : email
    // check for images, check for avatar
    // upload them to cloudinary
    // create user object - create entry in db
    // remove password and refresh token from respone
    // check for user creation
    // send response to front-end

    const { fullName, email, username, password } = req.body
    console.log(fullName, email);
    if ([fullName, email, username, password].some((field) =>
        field?.trim() === ""
    )) {
        throw new ApiError(
            400,
            'Please fill in all fields'
        )
    }
    const exitstedUser = User.findOne({
        $or: [{ email }, { username }]
    })
    if (exitstedUser){
        throw new ApiError(
            409,
            'User with this email or username already exists'
        )
    }
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path
    if(!avatarLocalPath){
        throw new ApiError(
            400,
            'Please upload an avatar. It is required'
        )
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if(!avatar){
        throw new ApiError(
            500,
            'Avatar is required'
        )
    }
    const user = await User.create({
        fullName,
        email,
        username : username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })
    const createdUser = await User.findById(user._id).select(
        '-password -refreshToken'
    )
    if(!createdUser) {
        throw new ApiError(
            500,
            'User could not be created'
        )
    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )
});

export { registerUser };