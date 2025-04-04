import express from "express";
import { addToCartItems, addToCartItemsFashion, getcartItems } from "../controllers/cartController.js";
import userAuth from './../middlewares/UserAuth.js';

const cartRouter = express.Router();

cartRouter.post("/add-fashion", userAuth, addToCartItemsFashion);

cartRouter.post("/add", userAuth, addToCartItems);

cartRouter.post("/get", userAuth, getcartItems);


export default cartRouter;