import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { allProducts, cartItemsFashion, cartItems, delivery_fees, currency,
    backend_url, token } = useContext(AppContext);
  const [productsOrder, setProductsOrder] = useState([]);
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    state: "",
    country: "",
    city: "",
    street: "",
    zipCode: "",
    phone: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    }
  }, [token]);


  // Collect Products Order
  const collectProductsOrder = () => {
    let productsData = [];
    // Collect From CartItemsFashion first {a: { s:1, m:1 }, b:{ s:1, m:1 }}
    allProducts.map((product) => {
      for (const items in cartItemsFashion) {
        for (const item in cartItemsFashion[items]) {
          if (product._id === items && cartItemsFashion[items][item] > 0) {
            productsData.push({
              ...product, size: item, quantity: cartItemsFashion[items][item]
            });
          }
        }
      }
    });
    // Collect From CartItems {a: 1, b:2, c:3}
    allProducts.map((product) => {
      for (const items in cartItems) {
        if (product._id === items) {
          productsData.push({
            ...product, quantity: cartItems[items]
          });
        }
      }
    });
    setProductsOrder(productsData);
  };

  // Collect Products Order Amount 
  const collectProductsAmount = () => {
    let productsAmount = 0;
    productsOrder.map((product) => {
      let productPrice = (product.price - (product.price * (product.discount / 100))).toFixed(2);
      productsAmount += productPrice * product.quantity;
    });
    return productsAmount;
  };

  // On Change Handler
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    collectProductsOrder();
  }, [allProducts, cartItemsFashion, cartItems]);

  // Add Order Handler
  const addOrderHandler = async (event) => {
    event.preventDefault();
    try {
      const orderDetails = {
        address: address,
        items: productsOrder,
        amount: collectProductsAmount() + 5
      };
      const response = await axios.post(backend_url + "/api/order/place-order", orderDetails, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        toast.success(response.data.message);
        window.location.replace("/my-orders");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <form onSubmit={addOrderHandler} className="py-10 min-h-[70vh] px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex items-start justify-between gap-5">
      {/* Left Side */}
      <div className="w-full md:w-[60%]">
        <p className="text-xl font-semibold text-gray-800 mb-5">Address</p>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center justify-between gap-2">
            <input required type="text" placeholder="FirstName" className="block w-full border border-gray-300 rounded-md shadow-md py-2 px-3" name="firstName" onChange={onChangeHandler} />
            <input required type="text" placeholder="LastName" className="block w-full border border-gray-300 rounded-md shadow-md py-2 px-3" name="lastName" onChange={onChangeHandler} />
          </div>
          <div className="flex items-center gap-2">
            <input required type="email" placeholder="email" className="block w-full border border-gray-300 rounded-md shadow-md py-2 px-3" name="email" onChange={onChangeHandler} />
            <input required type="text" placeholder="State" className="block w-full border border-gray-300 rounded-md shadow-md py-2 px-3" name="state" onChange={onChangeHandler} />
          </div>
          <div className="flex items-center gap-2">
            <input required type="text" placeholder="Country" className="block w-full border border-gray-300 rounded-md shadow-md py-2 px-3" name="country" onChange={onChangeHandler} />
            <input required type="text" placeholder="City" className="block w-full border border-gray-300 rounded-md shadow-md py-2 px-3" name="city" onChange={onChangeHandler} />
          </div>
          <div className="flex items-center gap-2">
            <input required type="text" placeholder="Street" className="block w-full border border-gray-300 rounded-md shadow-md py-2 px-3" name="street" onChange={onChangeHandler} />
            <input required type="number" placeholder="Zip Code" className="block w-full border border-gray-300 rounded-md shadow-md py-2 px-3" name="zipCode" onChange={onChangeHandler} />
          </div>
          <input required type="number" placeholder="Phone" className="block w-full border border-gray-300 rounded-md shadow-md py-2 px-3" name="phone" onChange={onChangeHandler} />
        </div>
      </div>
      {/* Right Side */}
      <div className="w-full  md:w-[40%]">
        <p className="text-xl font-semibold text-gray-800 mb-5">Cart Total</p>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <p className='text-gray-700 text-[15px]'>Subtotal</p>
            <p>{currency}{collectProductsAmount()}</p>
          </div>
          <hr className='border-none h-[1px] w-full bg-gray-200' />
          <div className='flex items-center justify-between'>
            <p className='text-gray-700 text-[15px]'>Delivery Fees</p>
            <p>{currency}{collectProductsAmount() > 0 ? delivery_fees : 0}</p>
          </div>
          <hr className='border-none h-[1px] w-full bg-gray-200' />
          <div className='flex items-center justify-between'>
            <p className='text-gray-700 text-[15px]'>Total</p>
            <p>{currency}{collectProductsAmount() > 0 ? collectProductsAmount() + delivery_fees : 0}</p>
          </div>
          <hr className='border-none h-[1px] w-full bg-gray-200' />
          <button type="submit" className='w-fit bg-black text-white py-1.5 text-[15px] mt-5 px-5 rounded-md'>Proceed To Checkout</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
