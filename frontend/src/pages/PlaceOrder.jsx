import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircle } from "react-icons/io5";

const PlaceOrder = () => {
  const {
    allProducts,
    cartItems,
    currency,
    backend_url,
    token,
    clearCart
  } = useContext(AppContext);

  const [productsOrder, setProductsOrder] = useState([]);
  const [infos, setInfos] = useState({
    nomprenom: "",
    phone: "",
    adresse: ""
  });

  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

  useEffect(() => {
    collectProductsOrder();
  }, [allProducts, cartItems]);

  // Collect Products Order
  const collectProductsOrder = () => {
    let productsData = [];
    allProducts.forEach((product) => {
      for (const items in cartItems) {
        if (product._id === items) {
          productsData.push({
            ...product,
            quantity: cartItems[items]
          });
        }
      }
    });
    setProductsOrder(productsData);
  };

  // Calculate total product amount
  const collectProductsAmount = () => {
    let productsAmount = 0;
    productsOrder.forEach((product) => {
      let productPrice = (
        product.price -
        product.price * (product.discount / 100)
      ).toFixed(2);
      productsAmount += productPrice * product.quantity;
    });
    return productsAmount;
  };

  // Input change handler
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setInfos((prev) => ({ ...prev, [name]: value }));
  };

  // Submit order
  const addOrderHandler = async (event) => {
    event.preventDefault();
    try {
      const orderDetails = {
        userDetails: { id: localStorage.getItem('userId') },
        infos: infos,
        items: productsOrder.map(item => ({
          productId: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        amount: collectProductsAmount()
      };
      const response = await axios.post(
        backend_url + "/api/order/place-order",
        orderDetails,
        {
          headers: { authorization: "Bearer " + token }
        }
      );
      if (response.data.success) {
        // Clear cart items after successful order
        clearCart();
        toast.success(response.data.message);
        window.location.replace("/my-orders");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (!token) return null; 

  return (
    <form
      onSubmit={addOrderHandler}
      className="py-6 min-h-[70vh] px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex items-start justify-between gap-5"
    >
      {/* infos Form */}
      <div className="w-full md:w-[60%]">
      <button onClick={() => window.history.back()}>
          <IoArrowBackCircle className="absolute top-auto left-5 z-10 hidden sm:block  text-primary text-5xl hover:text-third transition-all drop-shadow-lg" />
      </button>
        <p className="text-2xl pt-4 pb-2 font-extrabold text-third font-inter">Informations</p>
      
        <div className="flex flex-col mt-7 gap-3 w-full">
          <div className="flex items-center justify-between gap-2">
            <input required type="text" placeholder="Nom et Prenom" className="text-third bg-primary placeholder-third block w-full rounded-md drop-shadow-lg py-2 px-3 transform hover:scale-105 transition-all duration-300" name="nomprenom" onChange={onChangeHandler} />
          </div>
          <div className="flex items-center gap-2">
            <input required pattern="^0\d+$" maxlength="10" placeholder="Télephone" className="text-third bg-primary placeholder-third block w-full rounded-md drop-shadow-lg py-2 px-3 transform hover:scale-105 transition-all duration-300" name="phone" onChange={onChangeHandler} />
          </div>
          <div className="flex items-center gap-2">
            <input required type="text" placeholder="Adresse" className="text-third bg-primary placeholder-third block w-full rounded-md drop-shadow-lg py-2 px-3 transform hover:scale-105 transition-all duration-300" name="adresse" onChange={onChangeHandler} />
          </div>
        </div>
      </div>

      {/* Cart Summary */}
      <div className="w-full pl-4 pt-6 md:w-[40%] ">
        <p className="text-2xl pt-4 pb-2 font-extrabold text-third font-inter">Total du panier</p>
        <div className='flex flex-col gap-2 pt-4'>
          <div className='flex items-center justify-between'>
            <p className='font-medium font-inter text-third drop-shadow-lg text-[20px] ml-1'>Total</p>
            <p className="text-third drop-shadow-lg text-[20px]">{collectProductsAmount()}{currency}</p>
          </div>
          <hr className='border-none h-[2px] w-full bg-third' />
          <button type="submit" className='w-fit bg-third text-fifth py-1.5 text-[15px] mt-5 px-5 rounded-md hover:bg-primary hover:text-third transition-colors'>Passer la Commande</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;