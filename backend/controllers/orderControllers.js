import OrderModel from './../modules/orderModel.js';
import UserModel from './../modules/userModel.js';
import ProductModel from './../modules/productModel.js';
import bcrypt from 'bcrypt';
import "dotenv/config";


// ------------ Add Order ------------ //
const placeOrder = async (req, res) => {
  try {
    const { userDetails, infos, items, amount } = await req.body;

    // Get product owner information for each item and check quantities
    const itemsWithOwners = await Promise.all(items.map(async (item) => {
      const product = await ProductModel.findById(item.productId);
      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }
      
      // Check if user is trying to order their own product
      if (product.userId.toString() === userDetails.id) {
        throw new Error(`You cannot order your own product: ${product.title}`);
      }
      
      if (product.quantity < item.quantity) {
        throw new Error(`Not enough quantity available for product ${product.title}. Available: ${product.quantity}, Requested: ${item.quantity}`);
      }
      return {
        ...item,
        productOwnerId: product.userId
      };
    }));

    // Add New Order
    const newOrder = new OrderModel({
      userId: userDetails.id,
      infos: infos,
      items: itemsWithOwners,
      amount: Number(amount)
    });
    const order = await newOrder.save();

    // Update product quantities
    await Promise.all(items.map(async (item) => {
      await ProductModel.findByIdAndUpdate(
        item.productId,
        { $inc: { quantity: -item.quantity } }
      );
    }));

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
    const orders = await OrderModel.find({ userId: userDetails.id })
      .populate({
        path: 'items.productId',
        select: 'title price images'
      });
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
      // For admin, get all orders with populated details
      const orders = await OrderModel.find({})
        .populate({
          path: 'userId',
          model: 'User',
          select: 'name email'
        })
        .populate({
          path: 'items.productId',
          model: 'Product',
          select: 'title price images userId'
        })
        .sort({ createdAt: -1 }); // Most recent orders first

      return res.status(200).json({ success: true, orders: orders, message: "Admin" });
    } else {
      return res.status(200).json({ success: true, orders: [], message: "User" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error}` });
  }
};

// Get Orders for Product Owners
const getOrdersForProductOwners = async (req, res) => {
  try {
    const { userDetails } = await req.body;
    
    // Find all orders where any item belongs to this user
    const orders = await OrderModel.find({
      'items.productOwnerId': userDetails.id
    }).populate('items.productId', 'title price images');
    
    return res.status(200).json({ 
      success: true, 
      orders: orders 
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      success: false, 
      message: `Internal Server Error => ${error.message}` 
    });
  }
};

// Delete Order
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { userDetails } = req.body;

    // Find the order
    const order = await OrderModel.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    // Check if user is admin
    const user = await UserModel.findById(userDetails.id);
    const isAdmin = user && user.email === process.env.ADMIN_EMAIL && 
                   await bcrypt.compare(process.env.ADMIN_PASSWORD, user.password);

    // Check if user is authorized to delete (admin, buyer, or seller of any product in the order)
    const isAuthorized = 
      isAdmin || // Admin
      order.userId.toString() === userDetails.id || // Buyer
      order.items.some(item => item.productOwnerId.toString() === userDetails.id); // Seller

    if (!isAuthorized) {
      return res.status(403).json({ 
        success: false, 
        message: "Not authorized to delete this order" 
      });
    }

    // Delete the order
    await OrderModel.findByIdAndDelete(orderId);

    return res.status(200).json({ 
      success: true, 
      message: "Order deleted successfully" 
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      success: false, 
      message: `Internal Server Error => ${error.message}` 
    });
  }
};

export {
  placeOrder,
  getOrdersForUsers,
  getOrdersDashboard,
  getOrdersForProductOwners,
  deleteOrder,
};