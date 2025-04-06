import express from "express";
import { addToCartItems, getcartItems,removeFromCart } from "../controllers/cartController.js";
import userAuth from './../middlewares/UserAuth.js';

const cartRouter = express.Router();

cartRouter.post("/add", userAuth, addToCartItems);

cartRouter.post("/get", userAuth, getcartItems);

cartRouter.post("/remove", userAuth, removeFromCart);


export default cartRouter;