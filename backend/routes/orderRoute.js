import express from "express";
import userAuth from './../middlewares/UserAuth.js';
import { getOrdersDashboard, getOrdersForUsers, placeOrder } from "../controllers/orderControllers.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", userAuth, placeOrder);

orderRouter.post("/orders-list", userAuth, getOrdersForUsers);

orderRouter.post("/list-dashboard", userAuth, getOrdersDashboard);

export default orderRouter;