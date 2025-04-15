import UserModel from '../modules/userModel.js';
import ProductModel from '../modules/productModel.js';
import OrderModel from '../modules/orderModel.js';
import MessageModel from '../modules/messageModel.js';
import bcrypt from 'bcrypt';
import "dotenv/config";

// Get Details
const getDetails = async (req, res) => {
  try {
    const { userDetails } = req.body;
    const user = await UserModel.findById(userDetails.id);
    const comparePassword = await bcrypt.compare(process.env.ADMIN_PASSWORD, user.password);

    if (user && user.email === process.env.ADMIN_EMAIL && comparePassword) {
      // Get Users Count
      const usersCount = await UserModel.countDocuments();
      // Get Products Count
      const productsCount = await ProductModel.countDocuments();
      // Get Orders Count
      const ordersCount = await OrderModel.countDocuments();
      // Get Messages Count
      const messagesCount = await MessageModel.countDocuments();

      return res.status(200).json({
        success: true,
        details: {
          usersCount,
          productsCount,
          ordersCount,
          messagesCount
        }
      });
    } else {
      // Get Products Count
      const productsCount = await ProductModel.countDocuments({ userId: userDetails.id });
      
      // Get user's orders (where they are the buyer)
      const userOrders = await OrderModel.find({ userId: userDetails.id });
      
      // Get orders where user is the seller of any product
      const sellerOrders = await OrderModel.find({ 'items.productOwnerId': userDetails.id });
      
      // Combine both types of orders and get unique order IDs
      const allOrders = [...userOrders, ...sellerOrders];
      const uniqueOrderIds = new Set(allOrders.map(order => order._id.toString()));

      return res.status(200).json({
        success: true,
        details: {
          productsCount,
          ordersCount: uniqueOrderIds.size
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error}` });
  }
};

export { getDetails };