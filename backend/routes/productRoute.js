import express from "express";
import { addProductHandler, deleteProduct, getProductsListDashboard, getProductsListFrontend, getSingleProduct } from "../controllers/productController.js";
import upload from './../middlewares/multer.js';
import userAuth from './../middlewares/UserAuth.js';

const productRouter = express.Router();

productRouter.post("/add", upload.fields([{ name: 'image1', maxCount: 1 }, { name: "image2", maxCount: 1 }, { name: "image3", maxCount: 1 }, { name: "image4", maxCount: 1 }]), userAuth, addProductHandler);
productRouter.post("/list-dashboard", userAuth, getProductsListDashboard);
productRouter.get("/list-frontend", getProductsListFrontend);

productRouter.post("/delete", userAuth, deleteProduct);
productRouter.post("/single-product", getSingleProduct);

export default productRouter;