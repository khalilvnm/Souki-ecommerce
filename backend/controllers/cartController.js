import UserModel from './../modules/userModel.js';
import ProductModel from './../modules/productModel.js';

// ---------------- Add To CartItems ----------------- // 
const addToCartItems = async (req, res) => {
  try {
    const { userDetails, productId } = await req.body;
    
    // Get Product and check quantity
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Check if user is trying to add their own product
    if (product.userId.toString() === userDetails.id) {
      return res.status(400).json({ 
        success: false, 
        message: "You cannot add your own product to cart" 
      });
    }

    // Get User
    const user = await UserModel.findById(userDetails.id);
    let cartItemsData = await user.cartData; 

    // Check if adding this item would exceed available quantity
    const currentCartQuantity = cartItemsData[productId] || 0;
    if (currentCartQuantity + 1 > product.quantity) {
      return res.status(400).json({ 
        success: false, 
        message: `Only ${product.quantity} items available. You already have ${currentCartQuantity} in your cart.` 
      });
    }

    // Add To Cart Items
    if (cartItemsData[productId]) {
      cartItemsData[productId] += 1;
    } else {
      cartItemsData[productId] = 1;
    }
    await UserModel.findByIdAndUpdate(userDetails.id, { cartData: cartItemsData });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error.message}` });
  }
};

// Add to cartController.js
const removeFromCart = async (req, res) => {
  try {
    const { userDetails, productId } = req.body;
    const user = await UserModel.findById(userDetails.id);
    
    const cartData = user.cartData;
    delete cartData[productId];
    
    await UserModel.findByIdAndUpdate(userDetails.id, { cartData });
    
    return res.status(200).json({ 
      success: true, 
      message: "Product removed successfully" 
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      success: false, 
      message: `Internal Server Error => ${error.message}` 
    });
  }
};


// Get CartItems And CartItems For User
const getcartItems = async (req, res) => {
  try {
    const { userDetails } = await req.body;
    const user = await UserModel.findById(userDetails.id);
    const cartData = await user.cartData;

    return res.status(200).json({ success: true, cart: { cartData: cartData } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error.message}` });
  }
};

export { addToCartItems, getcartItems, removeFromCart };
