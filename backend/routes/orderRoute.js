import express from "express";
import userAuth from './../middlewares/UserAuth.js';
import { getOrdersDashboard, getOrdersForUsers, placeOrder, getOrdersForProductOwners, deleteOrder, getOrdersByRole, updateOrderStatus } from "../controllers/orderControllers.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", userAuth, placeOrder);

orderRouter.post("/orders-list", userAuth, getOrdersForUsers);

orderRouter.post("/list-dashboard", userAuth, getOrdersDashboard);

orderRouter.post("/product-owner-orders", userAuth, getOrdersForProductOwners);

orderRouter.post("/orders-by-role", userAuth, getOrdersByRole);

orderRouter.delete("/delete-order/:orderId", userAuth, deleteOrder);

orderRouter.put("/update-status/:orderId", userAuth, updateOrderStatus);

export default orderRouter;