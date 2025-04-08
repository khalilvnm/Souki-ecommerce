import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { BsFillBoxFill } from "react-icons/bs";
import BackButton from "../components/BackButton";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { backend_url, token, currency } = useContext(AppContext);

  // Get Order
  const getOrders = async () => {
    try {
      const response = await axios.post(
        backend_url + "/api/order/orders-list",
        {},
        {
          headers: { authorization: "Bearer " + token },
        }
      );
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

  return (
    <div className="py-20 min-h-[70vh] px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="relative">
        <div className="absolute -top-12 -left-16">
          <BackButton />
        </div>
      </div>
      <p className="text-gray-800 text-2xl mb-10 font-semibold">My Orders</p>
      <div className="flex flex-col gap-5">
        {orders.map((order, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-md shadow-xl py-10 px-6 min-h-[150px] grid grid-cols-[0.5fr_2fr_1fr_1fr] gap-4 text-sm items-center"
          >
            {/* Box icon */}
            <div className="flex justify-center items-center">
              <BsFillBoxFill className="text-5xl text-primary" />
            </div>

            {/* Title & Quantity */}
            <div className="flex flex-col justify-center items-center text-[15px] font-semibold gap-1 text-gray-600">
              {order.items.map((item, index) => (
                <p key={index} className="text-center">
                  {item.title} x {item.quantity}
                </p>
              ))}
            </div>

            {/* Items Count & Amount */}
            <div className="flex flex-col justify-center items-center text-gray-700 font-medium">
              <p className="text-center">
                Items Count:{" "}
                <span className="text-gray-800 font-semibold text-base">
                  {order.items.length}
                </span>
              </p>
              <p className="text-center">
                Items Amount:{" "}
                <span className="text-gray-800 font-semibold text-base">
                  {order.amount}
                  {currency}
                </span>
              </p>
            </div>

            {/* Order Status */}
            <div className="flex justify-center items-center text-gray-700 font-semibold text-center">
              {order.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
