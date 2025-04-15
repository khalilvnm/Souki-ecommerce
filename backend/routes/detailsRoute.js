import express from "express";
import userAuth from './../middlewares/UserAuth.js';
import { getDetails } from "../controllers/detailsController.js";

const detailsRouter = express.Router();

detailsRouter.post("/details", userAuth, getDetails);

export default detailsRouter;