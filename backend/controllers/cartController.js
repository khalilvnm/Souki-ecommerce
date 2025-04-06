import UserModel from './../modules/userModel.js';

// ---------------- Add To CartItems ----------------- // 
const addToCartItems = async (req, res) => {
  try {
    const { userDetails, productId } = await req.body;
    // Get User
    const user = await UserModel.findById(userDetails.id);
    let cartItemsData = await user.cartData; // {a:1, b:1}

    // Add To Cart Items
    if (cartItemsData[productId]) {
      cartItemsData[productId] += 1;
    } else {
      cartItemsData[productId] = 1;
    }
    await UserModel.findByIdAndUpdate(userDetails.id, { cartData: cartItemsData });
    return res.status(200).json({ success: true, user: user, message: "Product Added Successfully." });
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
