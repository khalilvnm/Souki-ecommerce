import { z } from "zod";
import bcrypt from "bcrypt";
import UserModel from './../modules/userModel.js';
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

const defaultImage = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

// ------------------- User Sign Up ------------------ //
const userSignUp = async (req, res) => {
  try {
    const data = await req.body;
    const imageFile = await req.file;
    const schema = z.object({
      username: z.string({ required_error: "username Is Required." }).min(2).max(100),
      email: z.string({ required_error: "Email Is Required." }).email({ message: "Please Inter A Valid Email." }),
      password: z.string({ required_error: "Password Is Required." }).min(6, { message: "Password Must Be At Least 6 Characters." }).max(200)
    });
    const validation = schema.safeParse(data);
    if (!validation.success) {
      return res.status(400).json({ success: false, message: validation.error.errors[0].message });
    }
    // Check If This Email Has Already Been Token
    const isEmailExists = await UserModel.findOne({ email: data.email });
    if (isEmailExists) {
      return res.status(400).json({ success: false, message: "Email Has Already Been Token." });
    }
    // Hashed Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    if (imageFile) {
      const result = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      const image_url = result.secure_url;
      const newUser = new UserModel({
        username: data.username,
        email: data.email,
        password: hashedPassword,
        image: image_url
      });
      const user = await newUser.save();
      // Generate Token
      const userJwtToken = {
        id: user._id,
        username: user.username,
        email: user.email
      };
      const token = jwt.sign(userJwtToken, process.env.JWT_SECRET_KEY);
      // Destructured User For Response WithOut Password
      const { password, ...other } = user._doc;
      return res.status(201).json({ success: true, user: { ...other, token: token } });
    } else {
      const newUser = new UserModel({
        username: data.username,
        email: data.email,
        password: hashedPassword,
        image: defaultImage
      });
      const user = await newUser.save();
      // Generate jwt
      const userJwtToken = {
        id: user._id,
        username: user.username,
        email: user.email
      };
      const token = jwt.sign(userJwtToken, process.env.JWT_SECRET_KEY);
      // Destructured User To Response Without Password
      const { password, ...other } = user._doc;
      return res.status(201).json({ success: true, user: { ...other, token: token } });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error.message}` });
  }
};


// ------------------- User Sign In ------------------ //
const userSignIn = async (req, res) => {

  try {
    const data = await req.body;

    const schema = z.object({
      email: z.string({ required_error: "Email Is Required" }).email({ message: "Please Write A Valid Email." }),
      password: z.string({ required_error: "Password Is Required." }).min(6, { message: "Password Must Be At Least 6 Characters." }).max(200)
    });

    const validation = schema.safeParse(data);

    if (!validation.success) {
      return res.status(400).json({ success: false, messsage: validation.error.errors[0].message });
    }
    // Check Email IsExists in DB
    const user = await UserModel.findOne({ email: data.email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Email Or Password Is Wrong." });
    }

    // CHeck Password Coming From User And PW In DB
    const compare = await bcrypt.compare(data.password, user.password);

    if (!compare) {
      return res.status(400).json({ success: false, message: "Email Or Password Is Wrong." });
    }

    // Generate Token
    const userJwtToken = {
      id: user._id,
      username: user.username,
      email: user.email,
      password: user.password
    };
    const token = jwt.sign(userJwtToken, process.env.JWT_SECRET_KEY);

    // Destructured User For Response Without Password
    const { password, ...other } = user._doc;

    return res.status(201).json({ success: true, user: { ...other, token: token } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error.message}` });
  }

};

// ------------------- Get Current User ------------------ //
const getUser = async (req, res) => {
  const { userDetails } = await req.body;
  const user = await UserModel.findById(userDetails.id);
  const { password, ...other } = user._doc;
  return res.status(200).json({ success: true, user: { ...other } });
};


// Get Users Based On User or Admin
const getUsersDashboard = async (req, res) => {
  const { userDetails } = await req.body;
  const user = await UserModel.findById(userDetails.id);

  const comparePassword = await bcrypt.compare(process.env.ADMIN_PASSWORD, user.password);

  if (user && comparePassword && process.env.ADMIN_EMAIL === user.email) {
    const users = await UserModel.find({});
    return res.status(200).json({ success: true, users: users });
  } else {
    const users = await UserModel.find({ _id: userDetails.id });
    return res.status(200).json({ success: true, users: users });
  }


};

// Delete User Admin Can Delete Any User But Can't Delete himself
const deleteUserDashboard = async (req, res) => {
  try {
    const { userDetails, userId } = await req.body;

    if (userDetails.id === userId) {
      return res.status(201).json({ success: true, message: "You Can't Delete Yourself." });
    } else {
      await UserModel.findByIdAndDelete(userId);
      return res.status(200).json({ success: true, message: "User Deleted Successfully" });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error}` });
  }
};

// Update Profile Picture
const updateProfilePicture = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    if (!req.file) {
      console.log("No file received");
      return res.status(400).json({ success: false, message: "No image file provided" });
    }

    let userDetails;
    try {
      userDetails = JSON.parse(req.body.userDetails);
      console.log("Parsed userDetails:", userDetails);
    } catch (error) {
      console.log("Error parsing userDetails:", error);
      return res.status(400).json({ success: false, message: "Invalid user details format" });
    }

    if (!userDetails || !userDetails.id) {
      console.log("Missing user ID in userDetails");
      return res.status(400).json({ success: false, message: "User details are required" });
    }

    try {
      console.log("Uploading to Cloudinary...");
      const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
      console.log("Cloudinary upload result:", result);
      const image_url = result.secure_url;

      const updatedUser = await UserModel.findByIdAndUpdate(
        userDetails.id,
        { image: image_url },
        { new: true }
      );

      if (!updatedUser) {
        console.log("User not found");
        return res.status(404).json({ success: false, message: "User not found" });
      }

      const { password, ...other } = updatedUser._doc;
      return res.status(200).json({ success: true, user: other });
    } catch (cloudinaryError) {
      console.error("Cloudinary error:", cloudinaryError);
      return res.status(500).json({ success: false, message: "Error uploading image to Cloudinary" });
    }
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error.message}` });
  }
};

// Update Username
const updateUsername = async (req, res) => {
  try {
    const { userDetails, username } = req.body;

    if (!username) {
      return res.status(400).json({ success: false, message: "Username is required" });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userDetails.id,
      { username },
      { new: true }
    );

    const { password, ...other } = updatedUser._doc;
    return res.status(200).json({ success: true, user: other });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error.message}` });
  }
};

// Delete Account
const deleteAccount = async (req, res) => {
  try {
    const { userDetails } = req.body;
    
    if (!userDetails || !userDetails.id) {
      return res.status(400).json({ success: false, message: "User details are required" });
    }

    const user = await UserModel.findByIdAndDelete(userDetails.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error.message}` });
  }
};

// Remove Profile Picture
const removeProfilePicture = async (req, res) => {
  try {
    const { userDetails } = req.body;

    if (!userDetails || !userDetails.id) {
      return res.status(400).json({ success: false, message: "User details are required" });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userDetails.id,
      { image: defaultImage },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { password, ...other } = updatedUser._doc;
    return res.status(200).json({ success: true, user: other });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error.message}` });
  }
};

// Become Seller
const becomeSeller = async (req, res) => {
  try {
    const { userDetails, phoneNumber, description, address } = req.body;

    // Validate required fields
    if (!phoneNumber || !description || !address) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Update user with seller information
    const updatedUser = await UserModel.findByIdAndUpdate(
      userDetails.id,
      {
        sellerStatus: 'pending',
        sellerInfo: {
          phoneNumber,
          description,
          address
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { password, ...other } = updatedUser._doc;
    return res.status(200).json({ success: true, user: other });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error.message}` });
  }
};

// Approve/Reject Seller
const updateSellerStatus = async (req, res) => {
  try {
    const { userDetails, userId, status } = req.body;

    // Check if user is admin
    const admin = await UserModel.findById(userDetails.id);
    const isAdmin = admin && 
      admin.email === process.env.ADMIN_EMAIL && 
      await bcrypt.compare(process.env.ADMIN_PASSWORD, admin.password);

    if (!isAdmin) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Update seller status
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        sellerStatus: status,
        isSeller: status === 'approved'
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { password, ...other } = updatedUser._doc;
    return res.status(200).json({ success: true, user: other });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error.message}` });
  }
};

// Get Pending Sellers
const getPendingSellers = async (req, res) => {
  try {
    const { userDetails } = req.body;

    // Check if user is admin
    const admin = await UserModel.findById(userDetails.id);
    const isAdmin = admin && 
      admin.email === process.env.ADMIN_EMAIL && 
      await bcrypt.compare(process.env.ADMIN_PASSWORD, admin.password);

    if (!isAdmin) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Get all pending sellers
    const pendingSellers = await UserModel.find({ sellerStatus: 'pending' });
    return res.status(200).json({ success: true, sellers: pendingSellers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error.message}` });
  }
};

// Remove Seller Privileges
const removeSellerPrivileges = async (req, res) => {
  try {
    const { userDetails, userId } = req.body;

    // Check if user is admin
    const admin = await UserModel.findById(userDetails.id);
    const isAdmin = admin && 
      admin.email === process.env.ADMIN_EMAIL && 
      await bcrypt.compare(process.env.ADMIN_PASSWORD, admin.password);

    if (!isAdmin) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Update user to remove seller privileges
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        isSeller: false,
        sellerStatus: null,
        sellerInfo: {
          phoneNumber: null,
          address: null,
          description: null
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { password, ...other } = updatedUser._doc;
    return res.status(200).json({ success: true, user: other });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error.message}` });
  }
};

export {
  userSignUp,
  userSignIn,
  getUser,
  getUsersDashboard,
  deleteUserDashboard,
  updateProfilePicture,
  updateUsername,
  deleteAccount,
  removeProfilePicture,
  becomeSeller,
  updateSellerStatus,
  getPendingSellers,
  removeSellerPrivileges
};