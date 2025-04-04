import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { BsFillBoxFill } from "react-icons/bs";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { backend_url, token, currency } = useContext(AppContext);

  // Get Order 
  const getOrders = async () => {
    try {
      const response = await axios.post(backend_url + "/api/order/orders-list", {}, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);


  // Order Payment Handler
  const orderPaymentHandler = async (orderId, items) => {
    try {
      const response = await axios.post(backend_url + "/api/order/order-payment", {
        orderId: orderId,
        items: items
      });
      if (response.data.success) {
        window.location.replace(response.data.session_url);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <div className='py-20 min-h-[70vh] px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <p className='text-gray-800 text-2xl mb-10 font-semibold'>My Orders</p>
      <div className='flex flex-col gap-5'>
        {
          orders.map((order, index) => (
            <div key={index} className='border items-center border-gray-300 rounded-md shadow-xl py-5 px-2 grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr_1fr] gap-4 text-sm'>
              <div className='px-2'> <BsFillBoxFill className='text-5xl text-primary mx-auto' /> </div>
              {/* Title & Quantity */}
              <div className='flex flex-col text-[13px] font-semibold gap-1 text-gray-600'>
                {
                  order.items.map((item, index) => (
                    <p key={index}>{item.title} x {item.quantity}</p>
                  ))
                }
              </div>
              {/* Items Count & Amount */}
              <div className='text-gray-700 font-medium'>
                <p>Items Count: <span className='text-gray-800 font-semibold text-base'>{order.items.length}</span></p>
                <p>Items Amount: <span className='text-gray-800 font-semibold text-base'>{currency}{order.amount}</span></p>
              </div>
              {/* Order Payment */}
              <p className={`font-semibold text-center text-[15px] ${order.payment ? "text-green-800" : "text-red-800"}`}>{order.payment ? "Paid" : "Not Paid"}</p>
              {/* Order Status */}
              <p className='text-gray-700 font-semibold'>{order.status}</p>
              {/* Track Order */}
              <button onClick={() => { getOrders(); }} className='border border-gray-300  py-1.5 px-2 bg-gray-50 text-gray-800 rounded-md cursor-pointer transition-all duration-300 hover:bg-blue-100'>Track Order</button>
              {/* Payment */}
              <div className='flex flex-col gap-3'>
                <button className='w-full rounded-sm bg-primary text-white py-1.5 px-3 transition-all duration-all hover:bg-blue-900'>Pay Cash</button>
                <button onClick={() => { orderPaymentHandler(order._id, order.items); }} className='w-full rounded-sm bg-blue-700 text-white py-1.5 px-3 transition-all duration-all hover:bg-blue-900'>Pay Online</button>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  );
};

export default MyOrders;
