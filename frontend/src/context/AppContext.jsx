import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

export const AppContext = createContext(null);

const AppContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");
  const currency = "Dz";
  const delivery_fees = 5;
  const [allProducts, setAllProducts] = useState([]);
  const [allProductsDashboard, setAllProductsDashboard] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [wishlistItems, setWishListItems] = useState([]);
  const [ordersDashboard, setOrdersDashboard] = useState([]);
  const [orderMessage, setOrderMessage] = useState("");

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  // Get All Products for FrontEnd
  const getAllProducts = async () => {
    try {
      const response = await axios.get(backend_url + "/api/product/list-frontend");
      if (response.data.success) {
        setAllProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  // Get All Products for DashBoard Based On User Or Admin
  const getAllProductsDashboard = async () => {
    try {
      const response = await axios.post(backend_url + "/api/product/list-dashboard", {}, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        setAllProductsDashboard(response.data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  // Fn To Calculate Product Discount
  const calculateProductDiscount = (price, discount) => {
    const finallyPrice = (price - (price * discount / 100)).toFixed(2);
    return finallyPrice;
  };

  // Add To CartItmes
  const addToCartItems = async (productId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[productId]) {
      cartData[productId] += 1;
    } else {
      cartData[productId] = 1;
    }
    setCartItems(cartData);
    if (token) {
      const response = await axios.post(backend_url + "/api/cart/add", { productId: productId }, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        console.log(response);
        toast.error(response.response.data.message || response.message);
      }
    }
  };


  const removeToCartItems = async (productId) => {
    try {
      // Create copy of current cart
      const updatedCart = {...cartItems};
      
      // Remove the product
      delete updatedCart[productId];
      
      // Update local state immediately
      setCartItems(updatedCart);
      
      // Sync with backend if logged in
      if (token) {
        await axios.post(
          `${backend_url}/api/cart/remove`, 
          { productId },
          { headers: { authorization: "Bearer " + token } }
        );
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to remove item");
    }
  };

  // Delete Product From Cart

  const deleteProductFromCart = (productId) => {
    let productData = structuredClone(cartItems);
    delete productData[productId];
    setCartItems(productData);
  };

  // Calculte Cart Items count
  const calculateCartItemsCount = () => {
    let cartCount = 0;
    // Cart Items;
    for (const items in cartItems) { // {a:1, b:1}
      cartCount += cartItems[items];
    }
    return cartCount;
  };

  // Get Cart Data 
  const getCartData = async () => {
    try {
      const response = await axios.post(backend_url + "/api/cart/get", {}, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        setCartItems(response.data.cart.cartData);
      }
    } catch (error) {
      console.log(error);
      // eslint-disable-next-line no-undef
      return toast.error(error.response.data.message || response.message);
    }
  };

  // Add To Wishlist
  const addAndRemoveWishList = async (productId) => {
    let wishListData = wishlistItems.slice(); // []
    if (wishListData.includes(productId)) {
      wishListData = wishListData.filter((item) => item !== productId);
    } else {
      wishListData.push(productId);
    }
    setWishListItems(wishListData);

    if (token) {
      const response = await axios.post(backend_url + "/api/wishlist/add-remove", { productId: productId }, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        console.log(response);
        toast.error(response.response.data.message || response.message);
      }
    }
  };

  // Get Wishlist Items
  const getWishlistItems = async () => {
    try {
      const response = await axios.post(backend_url + "/api/wishlist/get", {}, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        setWishListItems(response.data.wishlistData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  // Get Orders Dashboard
  const getOrdersDashboard = async () => {
    try {
      const response = await axios.post(backend_url + "/api/order/list-dashboard", {}, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        setOrdersDashboard(response.data.orders);
        setOrderMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getCartData();
      getWishlistItems();
      getOrdersDashboard();
    }
  }, [token]);


  useEffect(() => {
    getAllProducts();
  }, []);

  const value = {
    allProducts: allProducts,
    getAllProducts: getAllProducts,
    allProductsDashboard: allProductsDashboard,
    getAllProductsDashboard: getAllProductsDashboard,
    token: token,
    setToken: setToken,
    backend_url: backend_url,
    calculateProductDiscount: calculateProductDiscount,
    currency: currency,
    addToCartItems: addToCartItems,
    cartItems: cartItems,
    calculateCartItemsCount: calculateCartItemsCount,
    removeToCartItems: removeToCartItems,
    deleteProductFromCart: deleteProductFromCart,
    delivery_fees: delivery_fees,
    addAndRemoveWishList: addAndRemoveWishList,
    wishlistItems: wishlistItems || [],
    getOrdersDashboard: getOrdersDashboard,
    ordersDashboard: ordersDashboard,
    orderMessage: orderMessage
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};


export default AppContextProvider;