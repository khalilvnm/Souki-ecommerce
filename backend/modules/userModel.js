import mongoose from "mongoose";


// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  cartData: { type: Object, default: {} }
}, { minimize: false, timestamps: true });

// User Model
const UserModel = mongoose.models.user || mongoose.model("User", userSchema);

export default UserModel;