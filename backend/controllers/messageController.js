import MessageModel from '../modules/messageModel.js';
import UserModel from '../modules/userModel.js';
import bcrypt from 'bcrypt';
import "dotenv/config";

// Send Message
const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    const newMessage = new MessageModel({
      name,
      email,
      message
    });

    await newMessage.save();
    
    return res.status(200).json({ 
      success: true, 
      message: "Message sent successfully" 
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      success: false, 
      message: `Internal Server Error => ${error.message}` 
    });
  }
};

// Get All Messages (Admin Only)
const getAllMessages = async (req, res) => {
  try {
    const { userDetails } = req.body;
    
    // Check if user is admin
    const user = await UserModel.findById(userDetails.id);
    const isAdmin = user && user.email === process.env.ADMIN_EMAIL && 
                   await bcrypt.compare(process.env.ADMIN_PASSWORD, user.password);

    if (!isAdmin) {
      return res.status(403).json({ 
        success: false, 
        message: "Not authorized to view messages" 
      });
    }

    const messages = await MessageModel.find({}).sort({ createdAt: -1 });
    
    return res.status(200).json({ 
      success: true, 
      messages: messages 
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      success: false, 
      message: `Internal Server Error => ${error.message}` 
    });
  }
};

// Mark Message as Read
const markMessageAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { userDetails } = req.body;
    
    // Check if user is admin
    const user = await UserModel.findById(userDetails.id);
    const isAdmin = user && user.email === process.env.ADMIN_EMAIL && 
                   await bcrypt.compare(process.env.ADMIN_PASSWORD, user.password);

    if (!isAdmin) {
      return res.status(403).json({ 
        success: false, 
        message: "Not authorized to update messages" 
      });
    }

    await MessageModel.findByIdAndUpdate(messageId, { status: "read" });
    
    return res.status(200).json({ 
      success: true, 
      message: "Message marked as read" 
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      success: false, 
      message: `Internal Server Error => ${error.message}` 
    });
  }
};

// Delete Message (Admin Only)
const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { userDetails } = req.body;
    
    // Check if user is admin
    const user = await UserModel.findById(userDetails.id);
    const isAdmin = user && user.email === process.env.ADMIN_EMAIL && 
                   await bcrypt.compare(process.env.ADMIN_PASSWORD, user.password);

    if (!isAdmin) {
      return res.status(403).json({ 
        success: false, 
        message: "Not authorized to delete messages" 
      });
    }

    await MessageModel.findByIdAndDelete(messageId);
    
    return res.status(200).json({ 
      success: true, 
      message: "Message deleted successfully" 
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
  sendMessage,
  getAllMessages,
  markMessageAsRead,
  deleteMessage
}; 