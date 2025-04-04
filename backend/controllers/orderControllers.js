import OrderModel from './../modules/orderModel.js';
import UserModel from './../modules/userModel.js';
import Stripe from "stripe";
import bcrypt from 'bcrypt';
import "dotenv/config";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ------------ Add Order ------------ //
const placeOrder = async (req, res) => {
  try {
    const { userDetails, address, items, amount } = await req.body;

    // Add New Order
    const newOrder = new OrderModel({
      userId: userDetails.id,
      address: address,
      items: items,
      amount: Number(amount)
    });
    const order = await newOrder.save();

    // Get User And Update User By MakeThe CartData Empty
    await UserModel.findByIdAndUpdate(userDetails.id, { cartData: {}, cartDataFashion: {} });
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

// Order Payment
const orderPayment = async (req, res) => {
  try {
    const frontendUrl = "https://inffinite-ecommerce-frontend.vercel.app";
    const { orderId, items } = await req.body;

    // Create Line Items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "USD",
        product_data: {
          name: item.title
        },
        unit_amount: Number((item.price - (item.price * (item.discount / 100))).toFixed(2)) * 100
      },
      quantity: item.quantity
    }));
    // Order Charges
    line_items.push({
      price_data: {
        currency: "USD",
        product_data: {
          name: "Delivery Charges"
        },
        unit_amount: 5 * 100
      },
      quantity: 1
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontendUrl}/verify?success=true&orderId=${orderId}`,
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${orderId}`
    });
    return res.status(200).json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error ${error.message}` });
  }
};


// Verify Order Payment
const verifyOrderPayment = async (req, res) => {
  try {
    const { success, orderId } = await req.body;
    // Get Order Id
    const order = await OrderModel.findById(orderId);
    if (success === "true") {
      await OrderModel.findByIdAndUpdate(orderId, { payment: true });
      return res.status(200).json({ success: true, message: "Your order has been paid successfully." });
    } else {
      await OrderModel.findByIdAndUpdate(orderId, { payment: order.payment });
      return res.status(200).json({ success: true, message: "Your order payment has been canceled." });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ sucess: false, message: `Inernal Server Error => ${error}` });
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

// Update Status
const updateOrderStatus = async (req, res) => {
  try {
    const { value, orderId } = await req.body;
    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order Not Found." });
    }
    if (value === "Order Delivered") {
      await OrderModel.findByIdAndUpdate(orderId, { status: value, payment: true });
    } else {
      await OrderModel.findByIdAndUpdate(orderId, { status: value });
    }
    return res.status(200).json({ success: true, message: "Order status updated Successfully." });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ success: false, message: `Internal Server Error => ${error}` });
  }
};


export {
  placeOrder,
  getOrdersForUsers,
  orderPayment,
  verifyOrderPayment,
  getOrdersDashboard,
  updateOrderStatus
};