import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const PlaceOrder = () => {
  const {
    allProducts,
    cartItems,
    currency,
    backend_url,
    token
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
      className="py-10 min-h-[70vh] px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex items-start justify-between gap-5"
    >
      {/* infos Form */}
      <div className="w-full md:w-[60%]">
      <div className="relative -left-16">
        <BackButton />
      </div>
        <p className="text-xl font-semibold text-gray-800 mt-4">Informations</p>
      
        <div className="flex flex-col mt-7 gap-3 w-full">
          <div className="flex items-center justify-between gap-2">
            <input required type="text" placeholder="Nom et Prenom" className="block w-full border border-gray-300 rounded-md shadow-md py-2 px-3" name="nomprenom" onChange={onChangeHandler} />
          </div>
          <div className="flex items-center gap-2">
            <input required type="number" placeholder="Télephone" className="block w-full border border-gray-300 rounded-md shadow-md py-2 px-3" name="phone" onChange={onChangeHandler} />
          </div>
          <div className="flex items-center gap-2">
            <input required type="text" placeholder="Adresse" className="block w-full border border-gray-300 rounded-md shadow-md py-2 px-3" name="adresse" onChange={onChangeHandler} />
          </div>
        </div>
      </div>

      {/* Cart Summary */}
      <div className="w-full mt-16 md:w-[40%] ">
        <p className="text-xl font-semibold text-gray-800 mb-5">Total du panier</p>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <p className='text-gray-700 text-[15px]'>Total</p>
            <p>{collectProductsAmount()}{currency}</p>
          </div>
          <hr className='border-none h-[1px] w-full bg-gray-200' />
          <button type="submit" className='w-fit bg-black text-white py-1.5 text-[15px] mt-5 px-5 rounded-md'>Passer la Commande</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;