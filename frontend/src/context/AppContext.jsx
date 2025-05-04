import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

export const AppContext = createContext(null);

const AppContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");
  const currency = " DZD";
  const [allProducts, setAllProducts] = useState([]);
  const [allProductsDashboard, setAllProductsDashboard] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cart from localStorage if available
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });
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
    try {
      // First check if we can add the item
      const product = allProducts.find(p => p._id === productId);
      if (!product) {
        toast.error("Produit non trouvé");
        return;
      }

      const currentQuantity = cartItems[productId] || 0;
      if (currentQuantity + 1 > product.quantity) {
        toast.error(`seulement ${product.quantity} articles disponibles. Vous avez déjà ${currentQuantity} dans votre panier.`);
        return;
      }

      let cartData = structuredClone(cartItems);
      if (cartData[productId]) {
        cartData[productId] += 1;
      } else {
        cartData[productId] = 1;
      }
      
      if (token) {
        const response = await axios.post(backend_url + "/api/cart/add", { productId: productId }, {
          headers: { authorization: "Bearer " + token }
        });
        if (response.data.success) {
          setCartItems(cartData);
          localStorage.setItem("cartItems", JSON.stringify(cartData));
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } else {
        setCartItems(cartData);
        localStorage.setItem("cartItems", JSON.stringify(cartData));
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // remove To CartItmes
  const removeToCartItems = async (productId) => {
    try {
      const updatedCart = { ...cartItems };
  
      if (updatedCart[productId] > 1) {
        updatedCart[productId] -= 1;
      } else {
        delete updatedCart[productId];
      }
  
      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  
      if (token) {
        await axios.post(
          `${backend_url}/api/cart/remove`, 
          { productId },
          { headers: { authorization: "Bearer " + token } }
        );
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Échec de la mise à jour du panier");
    }
  };

  // Delete Product From Cart
  const deleteProductFromCart = async (productId) => {
    try {
      let productData = structuredClone(cartItems);
      delete productData[productId];
      
      if (token) {
        await axios.post(
          `${backend_url}/api/cart/remove`,
          { productId },
          { headers: { authorization: "Bearer " + token } }
        );
      }
      
      setCartItems(productData);
      localStorage.setItem("cartItems", JSON.stringify(productData));
      toast.success("Produit retiré du panier");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Impossible de supprimer le produit du panier");
    }
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
        // Get local cart data
        const localCart = JSON.parse(localStorage.getItem("cartItems") || "{}");
        // Merge backend cart with local cart
        const mergedCart = { ...localCart, ...response.data.cart.cartData };
        setCartItems(mergedCart);
        localStorage.setItem("cartItems", JSON.stringify(mergedCart));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
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
      // When logging in, get cart data from backend and merge with local cart
      getCartData();
      getOrdersDashboard();
    } else {
      // When logging out, keep the local cart but clear the backend cart
      const localCart = JSON.parse(localStorage.getItem("cartItems") || "{}");
      setCartItems(localCart);
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