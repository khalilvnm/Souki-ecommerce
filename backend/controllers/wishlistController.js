import UserModel from './../modules/userModel.js';

// Add To Wishlist
const addToWishlist = async (req, res) => {
  try {
    const { userDetails, productId } = await req.body;
    // Get User 
    const user = await UserModel.findById(userDetails.id);
    let wishlistData = await user.wishlistData;

    // Add Items To WishList
    if (wishlistData.includes(productId)) {
      wishlistData = wishlistData.filter((item) => item !== productId);
      await UserModel.findByIdAndUpdate(userDetails.id, { wishlistData: wishlistData });
      return res.status(200).json({ success: true, user: user, message: "Product Removed From Your Wishlist." });
    } else {
      wishlistData.push(productId);
      await UserModel.findByIdAndUpdate(userDetails.id, { wishlistData: wishlistData });
      return res.status(200).json({ success: true, user: user, message: "Product Addded Wishlist Successfully." });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error.message}` });
  }
};

// Get Wishlist Items
const getWishlistItems = async (req, res) => {
  try {
    const { userDetails } = await req.body;
    const user = await UserModel.findById(userDetails.id);
    const wishlistItems = await user.wishlistData;
    return res.status(200).json({ success: true, wishlistData: wishlistItems });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error.message}` });
  }
};

export { addToWishlist, getWishlistItems };