import mongoose from "mongoose";

// Order Schema
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  infos: { type: Object, requried: true },
  items: { 
    type: [{
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      productOwnerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    }], 
    required: true 
  },
  amount: { type: Number, required: true },
  status: { type: String, default: "Order Processing" },
}, { minimize: false, timestamps: true });

// Order Model 
const OrderModel = mongoose.models.order || mongoose.model("Order", orderSchema);

export default OrderModel;