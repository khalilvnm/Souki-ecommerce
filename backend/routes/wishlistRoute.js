import express from "express";
import userAuth from './../middlewares/UserAuth.js';
import { addToWishlist, getWishlistItems } from "../controllers/wishlistController.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/add-remove", userAuth, addToWishlist);

wishlistRouter.post("/get", userAuth, getWishlistItems);


export default wishlistRouter;