import mongoose from 'mongoose';

// Product Schema
const productSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  images: { type: Array, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: false, default: 0 },
  type: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
}, { minimize: false, timestamps: true });

// Product Model
const ProductModel = mongoose.models.product || mongoose.model("Product", productSchema);

export default ProductModel;