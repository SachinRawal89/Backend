import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.models.js";
import cloudinary from "../utils/cloudinary.js"
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    // vaidation - not empty
    // check if user aready exists: username, email
    // check for images, check for avatar
    // upload them on clouinary, avatar
    // create user object - create entry in db
    // remove password and refresh token fied from response
    // check for user creation
    // return res

    const {fullName, email, userName, password} = req.body
    console.log("email:", email);
    // validation
    //if (fullName === "") {
    //    throw new ApiError(400, "All fields are required")
    //}

    // another way of validation
    if ([fullName, email, userName, password].some( (field) => field?.trim() === "")) { //field?.trim() === "" => if field is empty then it will return true
        throw new ApiError(400, "All fields are required")
    }

    // is user already exist
    const existedUser = User.findOne({
        $or: [{ userName }, { email }]
    })

    if(existedUser) {
        throw new ApiError(409, "User with email or username already exist");
    }

    // Checking for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    // Upload on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required");
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        userName: userName.toLowerCase()
    })

    const createdUser = await user.findOne(user._id).select( // select() ka use ham password and refreshToken field ko htane ke iye kar rahe hai.
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // returning response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})

export default registerUser;