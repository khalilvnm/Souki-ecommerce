import express from "express";
import { deleteUserDashboard, getUser, getUsersDashboard, userSignIn, userSignUp, updateUsername, removeProfilePicture, updateProfilePicture, deleteAccount, becomeSeller, updateSellerStatus, getPendingSellers } from "../controllers/userController.js";
import upload from "../middlewares/multer.js";
import userAuth from "../middlewares/UserAuth.js";

const userRouter = express.Router();

userRouter.post("/signup", upload.single("image"), userSignUp);

userRouter.post("/signin", userSignIn);

userRouter.post("/user", userAuth, getUser);

userRouter.post("/users-dashboard", userAuth, getUsersDashboard);

userRouter.post("/delete-user-dashboard", userAuth, deleteUserDashboard);

userRouter.post("/delete-account", userAuth, deleteAccount);

userRouter.post("/update-username", userAuth, updateUsername);

userRouter.post("/update-profile-picture", userAuth, upload.single("image"), updateProfilePicture);

userRouter.post("/remove-profile-picture", userAuth, removeProfilePicture);

// Seller routes
userRouter.post("/become-seller", userAuth, becomeSeller);
userRouter.post("/update-seller-status", userAuth, updateSellerStatus);
userRouter.post("/pending-sellers", userAuth, getPendingSellers);

export default userRouter;