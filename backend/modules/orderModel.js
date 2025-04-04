import mongoose from "mongoose";

// Order Schema
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  address: { type: Object, requried: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "Order Processing" },
  payment: { type: Boolean, default: false }
}, { minimize: false, timestamps: true });

// Order Model 
const OrderModel = mongoose.models.order || mongoose.model("Order", orderSchema);

export default OrderModel;