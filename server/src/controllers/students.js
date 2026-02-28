import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiErrors.js";
import { Student } from "../models/Student.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const registerStudent = asyncHandler(async (req, res) => {
  const { fullname, password, email } = req.body;

  //validation
  if (fullname === "" || password === "" || email === "") {
    throw new ApiError(400, "All Feilds are compulsory");
  }

  //check if user already exists
  const existedStudent = Student.findOne({
    $or: [{ username }, { email }],
  });

  if (existedStudent) {
    throw new ApiError(409, "User already Exists");
  }

  const profileLocalPath = req.files?.profilePicture?.[0]?.profileLocalPath;

  if (!profileLocalPath) {
    throw new ApiError(400, "Profile Picture is Required");
  }

  //after getting local path upload it on cloudinary
  const profilePicture = await uploadOnCloudinary(profileLocalPath);

  if (!profilePicture) {
    throw new ApiError(400, "Profile Picture is Required");
  }
});

export { registerStudent };
