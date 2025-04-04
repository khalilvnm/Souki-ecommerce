import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

export const AppContext = createContext(null);

const AppContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");
  const currency = "$";
  const delivery_fees = 5;
  const [allProducts, setAllProducts] = useState([]);
  const [allProductsDashboard, setAllProductsDashboard] = useState([]);
  const [cartItemsFashion, setCartItemsFashion] = useState({});// {a:3,  b:{} }
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

  // Calculate Average Users Ratings
  const calculateAverageRatings = (product) => {
    let ratesCount = 0;
    if (product.userRatings && product.userRatings.length > 0) {
      product.userRatings.map((item) => {
        ratesCount += item.ratings;
      });
      return (ratesCount / product.userRatings.length).toFixed(0);
    } else {
      return 0;
    }
  };

  // Add To Cart Items Fashion
  const addToCartItemsFashion = async (productId, size) => {
    let cartData = structuredClone(cartItemsFashion);
    if (cartData[productId]) { // { a: {s:1} }
      if (cartData[productId][size]) {
        cartData[productId][size] += 1;
      } else {
        cartData[productId][size] = 1;
      }
    } else {
      cartData[productId] = {};
      cartData[productId][size] = 1;
    }
    setCartItemsFashion(cartData);
    if (token) {
      const response = await axios.post(backend_url + "/api/cart/add-fashion", { productId: productId, size: size }, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        console.log(response);
        toast.success(response.data.message);
      } else {
        console.log(response);
        toast.error(response.response.data.message || response.message);
      }
    }
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

  // Remove To Cart Items Fashion
  const removeToCartItemsFashion = (productId, size) => {
    let cartData = structuredClone(cartItemsFashion);
    if (cartData[productId][size] > 0) {
      cartData[productId][size] -= 1;
    }
    setCartItemsFashion(cartData);
  };


  // Remove To CartItmes
  const removeToCartItems = (productId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[productId] > 0) {
      cartData[productId] -= 1;
    }
    setCartItems(cartData);
  };

  // Delete Product From Cart
  const deleteProductFashionFromCart = (productId, size) => {
    let productDataFashion = structuredClone(cartItemsFashion);
    // { a: {s:1, m:1} }
    delete productDataFashion[productId][size];
    setCartItemsFashion(productDataFashion);
  };

  const deleteProductFromCart = (productId) => {
    let productData = structuredClone(cartItems);
    delete productData[productId];
    setCartItems(productData);
  };

  // Calculte Cart Items count
  const calculateCartItemsCount = () => {
    let cartCount = 0;
    // CartItems Fashiom;
    for (const items in cartItemsFashion) { // {a: {s:1, m:1}, b:{s:1,m:3}}
      for (const item in cartItemsFashion[items]) {
        cartCount += cartItemsFashion[items][item];
      }
    }
    // Cart Items;
    for (const items in cartItems) { // {a:1, b:1}
      cartCount += cartItems[items];
    }
    return cartCount;
  };

  // Get Cart Data For Fashion And Normal Items
  const getCartData = async () => {
    try {
      const response = await axios.post(backend_url + "/api/cart/get", {}, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        setCartItemsFashion(response.data.cart.cartDataFashion);
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
    // getWishlistItems(); //Fetch wishlist even if user is not logged in
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
    calculateAverageRatings: calculateAverageRatings,
    addToCartItemsFashion: addToCartItemsFashion,
    addToCartItems: addToCartItems,
    cartItemsFashion: cartItemsFashion,
    cartItems: cartItems,
    calculateCartItemsCount: calculateCartItemsCount,
    removeToCartItemsFashion: removeToCartItemsFashion,
    removeToCartItems: removeToCartItems,
    deleteProductFashionFromCart: deleteProductFashionFromCart,
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