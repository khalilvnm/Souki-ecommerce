import express from "express";
import userAuth from './../middlewares/UserAuth.js';
import { productsCount } from "../controllers/detailsController.js";

const detailsRouter = express.Router();

detailsRouter.post("/details", userAuth, productsCount);

export default detailsRouter;