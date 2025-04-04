import UserModel from './../modules/userModel.js';

// ---------------- Add To CartItemsFashion ----------------- // 
const addToCartItemsFashion = async (req, res) => {
  try {
    const { userDetails, productId, size } = await req.body;
    // Get User
    const user = await UserModel.findById(userDetails.id);
    // Get cartItemsFashion
    let cartItemsFashionData = await user.cartDataFashion; // { a: { s:1 }, b: { s:2 } }
    if (cartItemsFashionData[productId]) {
      if (cartItemsFashionData[productId][size]) {
        cartItemsFashionData[productId][size] += 1;
      } else {
        cartItemsFashionData[productId][size] = 1;
      }
    } else {
      cartItemsFashionData[productId] = {};
      cartItemsFashionData[productId][size] = 1;
    }
    await UserModel.findByIdAndUpdate(userDetails.id, { cartDataFashion: cartItemsFashionData });
    return res.status(200).json({ success: true, user: user, message: "Product Added Successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error.message}` });
  }
};

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


// Get CartItems And CartItems For User
const getcartItems = async (req, res) => {
  try {
    const { userDetails } = await req.body;
    const user = await UserModel.findById(userDetails.id);
    const cartDataFashion = await user.cartDataFashion;
    const cartData = await user.cartData;

    return res.status(200).json({ success: true, cart: { cartDataFashion: cartDataFashion, cartData: cartData } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error.message}` });
  }
};

export { addToCartItemsFashion, addToCartItems, getcartItems };
