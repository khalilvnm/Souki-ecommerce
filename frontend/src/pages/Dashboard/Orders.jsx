import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { ordersDashboard, currency, backend_url, token, getOrdersDashboard } = useContext(AppContext);

  // Update Order Status
  const updateOrderStatus = async (event, orderId) => {
    const value = event.target.value;
    try {
      const response = await axios.post(backend_url + "/api/order/status-update", { value: value, orderId: orderId }, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        toast.success(response.data.message);
        getOrdersDashboard();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  return ordersDashboard.length > 0 && (
    <div className="py-5 px-[3vw] flex flex-col gap-5">
      {
        ordersDashboard.map((order, index) => (
          <div key={index} className="grid md:grid-cols-[0.5fr_2fr_2fr_1fr_1fr_1fr] gap-3 border border-gray-200 shadow-md py-5 px-3 items-center text-sm font-medium text-gray-800">
            {/* Index */}
            <p className="text-center font-semibold hidden md:block">{index + 1}</p>
            {/* Product details */}
            <div>
              {
                order.items.map((item, index) => (
                  <p key={index}>{item.title} x{item.quantity}</p>
                ))
              }
            </div>
            {/* User details */}
            <div>
              <p>Username: {order.address.firstName + " " + order.address.lastName} </p>
              <p>Address: </p>
              <p>Country: {order.address.country} - City: {order.address.city}</p>
              <p>Street: {order.address.street}</p>
              <p>phone: {order.address.phone}</p>
            </div>
            {/* Product Count & Amount */}
            <div>
              <p>Items Count: {order.items.length}</p>
              <p>Items Amount: <span className="text-primary font-semibold">{currency}{order.amount}</span></p>
            </div>
            {/* Order Payment */}
            <p>Payment: <span className={`font-semibold ${order.payment ? "text-green-700" : "text-red-700"}`}>{order.payment ? "Paid" : "Not Paid"}</span> </p>
            {/* Order Status */}
            <select value={order.status} onChange={(event) => { updateOrderStatus(event, order._id); }}
              className="border border-gray-400  py-1.5 px-3 shadow-sm rounded-sm cursor-pointer outline-none w-fit">
              <option value={"Order Processing"}>Order Processing</option>
              <option value={"Order Shipped"}>Order Shipped</option>
              <option value={"Out For Delivery"}>Out For Delivery</option>
              <option value={"Order Delivered"}>Order Delivered</option>
            </select>
          </div>
        ))
      }
    </div>
  );
};

export default Orders;
