import express from "express";
import userAuth from './../middlewares/UserAuth.js';
import { getOrdersDashboard, getOrdersForUsers, orderPayment, placeOrder, updateOrderStatus, verifyOrderPayment } from "../controllers/orderControllers.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", userAuth, placeOrder);

orderRouter.post("/orders-list", userAuth, getOrdersForUsers);

orderRouter.post("/order-payment", orderPayment);

orderRouter.post("/order-verify", verifyOrderPayment);

orderRouter.post("/list-dashboard", userAuth, getOrdersDashboard);

orderRouter.post("/status-update", updateOrderStatus);

export default orderRouter;