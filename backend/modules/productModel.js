import mongoose from 'mongoose';

// Product Schema
const productSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: Array, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  type: { type: String, required: true },
}, { minimize: false, timestamps: true });

// Product Model
const ProductModel = mongoose.models.product || mongoose.model("Product", productSchema);

export default ProductModel;