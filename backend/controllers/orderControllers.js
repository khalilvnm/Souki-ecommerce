import OrderModel from './../modules/orderModel.js';
import UserModel from './../modules/userModel.js';
import bcrypt from 'bcrypt';
import "dotenv/config";


// ------------ Add Order ------------ //
const placeOrder = async (req, res) => {
  try {
    const { userDetails, infos, items, amount } = await req.body;

    // Add New Order
    const newOrder = new OrderModel({
      userId: userDetails.id,
      infos: infos,
      items: items,
      amount: Number(amount)
    });
    const order = await newOrder.save();

    // Get User And Update User By MakeThe CartData Empty
    await UserModel.findByIdAndUpdate(userDetails.id, { cartData: {} });
    return res.status(200).json({ success: true, order: order, message: "Order Added Successfully." });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error.message}` });
  }
};

// Get Orders Base On User ID
const getOrdersForUsers = async (req, res) => {
  try {
    const { userDetails } = await req.body;
    const orders = await OrderModel.find({ userId: userDetails.id });
    return res.status(200).json({ success: true, orders: orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error.message}` });
  }
};

// Get Order Dashboard
const getOrdersDashboard = async (req, res) => {
  try {
    const { userDetails } = await req.body;
    const user = await UserModel.findById(userDetails.id);
    const comparePassword = await bcrypt.compare(process.env.ADMIN_PASSWORD, user.password);
    if (user && user.email === process.env.ADMIN_EMAIL && comparePassword) {
      const orders = await OrderModel.find({});
      return res.status(200).json({ success: true, orders: orders, message: "Admin" });
    } else {
      return res.status(200).json({ success: true, orders: [], message: "User" });
    }


  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Serevr Error => ${error}` });
  }
};



export {
  placeOrder,
  getOrdersForUsers,
  getOrdersDashboard,
};