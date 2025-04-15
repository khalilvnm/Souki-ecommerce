import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { backend_url, token} = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [sellerOrders, setSellerOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch regular orders
        const response = await axios.post(
          backend_url + "/api/order/orders-list",
          { userDetails: { id: localStorage.getItem('userId') } },
          {
            headers: { authorization: "Bearer " + token }
          }
        );
        
        if (response.data.success) {
          setOrders(response.data.orders);
        }

        // Fetch seller orders
        const sellerResponse = await axios.post(
          backend_url + "/api/order/product-owner-orders",
          { userDetails: { id: localStorage.getItem('userId') } },
          {
            headers: { authorization: "Bearer " + token }
          }
        );
        
        if (sellerResponse.data.success) {
          setSellerOrders(sellerResponse.data.orders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, [backend_url, token]);

  return (
    <div className="p-4">
      {/* Regular Orders */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="border p-4 rounded-lg shadow">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Order ID</h3>
                    <p>{order._id}</p>
                    <p>Total Amount: {order.amount} DZ</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Your Info</h3>
                    <p>Name: {order.infos.nomprenom}</p>
                    <p>Phone: {order.infos.phone}</p>
                    <p>Address: {order.infos.adresse}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Ordered Products</h3>
                    {order.items.map((item, index) => (
                      <div key={index} className="bg-gray-50 p-2 rounded mb-2">
                        <p className="font-medium">{item.productId.title}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: {item.price} DZ</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Seller Orders */}
      {sellerOrders.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Orders for Your Products</h2>
          <div className="space-y-4">
            {sellerOrders.map((order) => (
              <div key={order._id} className="border p-4 rounded-lg shadow">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Order ID</h3>
                    <p>{order._id}</p>
                    <p>Total Amount: {order.amount} DZ</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Customer Info</h3>
                    <p>Name: {order.infos.nomprenom}</p>
                    <p>Phone: {order.infos.phone}</p>
                    <p>Address: {order.infos.adresse}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Ordered Products</h3>
                    {order.items.map((item, index) => (
                      <div key={index} className="bg-gray-50 p-2 rounded mb-2">
                        <p className="font-medium">{item.productId.title}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: {item.price} DZ</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
