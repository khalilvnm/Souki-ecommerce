import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash } from 'react-icons/fa';

const Orders = () => {
  const { backend_url, token } = useContext(AppContext);
  const [sellerOrders, setSellerOrders] = useState([]);

  const fetchOrders = async () => {
    try {
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

  useEffect(() => {
    fetchOrders();
  }, [backend_url, token]);

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        const response = await axios.delete(
          `${backend_url}/api/order/delete-order/${orderId}`,
          {
            headers: { authorization: "Bearer " + token },
            data: { userDetails: { id: localStorage.getItem('userId') } }
          }
        );

        if (response.data.success) {
          toast.success('Order deleted successfully');
          fetchOrders(); // Refresh orders list
        }
      } catch (error) {
        console.error('Error deleting order:', error);
        toast.error(error.response?.data?.message || 'Failed to delete order');
      }
    }
  };

  const OrderCard = ({ order }) => (
    <div key={order._id} className="border p-4 rounded-lg shadow relative">
      <button
        onClick={() => handleDeleteOrder(order._id)}
        className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors duration-300"
        title="Delete Order"
      >
        <FaTrash size={18} />
      </button>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <h3 className="font-semibold text-lg mb-2">Order Details</h3>
          <p>Order ID: {order._id}</p>
          <p>Total Amount: {order.amount} DZ</p>
          <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Customer Info</h3>
          <p>Name: {order.infos?.nomprenom || 'N/A'}</p>
          <p>Phone: {order.infos?.phone || 'N/A'}</p>
          <p>Address: {order.infos?.adresse || 'N/A'}</p>
          {order.userId?.email && (
            <p>Email: {order.userId.email}</p>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Ordered Products</h3>
          {order.items.map((item, index) => (
            <div key={index} className="bg-gray-50 p-2 rounded mb-2">
              <p className="font-medium">{item.productId?.title || 'Unknown Product'}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: {item.price} DZ</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Orders for Your Products</h2>
      {sellerOrders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders for your products yet</p>
      ) : (
        <div className="space-y-4">
          {sellerOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
