import express from "express";
import { deleteUserDashboard, getUser, getUsersDashboard, userSignIn, userSignUp } from "../controllers/userController.js";
import upload from "../middlewares/multer.js";
import userAuth from "../middlewares/UserAuth.js";

const userRouter = express.Router();

userRouter.post("/signup", upload.single("image"), userSignUp);

userRouter.post("/signin", userSignIn);

userRouter.post("/user", userAuth, getUser);

userRouter.post("/users-dashboard", userAuth, getUsersDashboard);

userRouter.post("/delete", userAuth, deleteUserDashboard);


export default userRouter;