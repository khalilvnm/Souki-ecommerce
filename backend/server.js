import express from "express";
import cors from "cors";
import connectCloudainry from "./config/cloudinary.js";
import connectDB from "./config/mongoose.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from './routes/orderRoute.js';
import detailsRouter from "./routes/detailsRoute.js";
import "dotenv/config";

// App
const app = express();
const port = process.env.PORT || "4000";

connectDB();
connectCloudainry();

// MidelWares
app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/details", detailsRouter);

app.get("/", async (req, res) => {
  return res.send("API Working.");
});

// Listen
app.listen(port, () => {
  console.log("Server Working");
});