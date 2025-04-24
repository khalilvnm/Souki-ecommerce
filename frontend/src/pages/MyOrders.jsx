import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import BackButton from "../components/BackButton";
import { FaTrash } from 'react-icons/fa';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { backend_url, token } = useContext(AppContext);

  // Get Orders
  const getOrders = async () => {
    try {
      const response = await axios.post(
        backend_url + "/api/order/orders-list",
        { userDetails: { id: localStorage.getItem('userId') } },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      if (response.data.success) {
        // Transform the data to ensure all required fields exist
        const transformedOrders = response.data.orders.map(order => ({
          ...order,
          infos: order.infos || { nomprenom: '', phone: '', adresse: '' },
          items: (order.items || []).map(item => ({
            ...item,
            productId: item.productId || { title: 'Unknown Product' }
          }))
        }));
        setOrders(transformedOrders);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Delete Order
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
          getOrders(); // Refresh orders list
        }
      } catch (error) {
        console.error('Error deleting order:', error);
        toast.error(error.response?.data?.message || 'Failed to delete order');
      }
    }
  };

  // Initial load and auto refresh
  useEffect(() => {
    getOrders(); // Initial load

    // Set up auto refresh every 30 seconds
    const refreshInterval = setInterval(() => {
      getOrders();
    }, 30000);

    // Cleanup on unmount
    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div className="py-20 min-h-[70vh] px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="relative">
        <div className="absolute -top-12 -left-16">
          <BackButton />
        </div>
      </div>
      <p className="text-gray-800 text-2xl mb-10 font-semibold">Mes commandes</p>
      
      {orders.length === 0 ? (
        <p className="text-gray-500">Aucune commande pour le moment</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded-lg shadow relative">
              <button
                onClick={() => handleDeleteOrder(order._id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                title="Supprimer la commande"
              >
                <FaTrash />
              </button>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Commande ID</h3>
                  <p>{order._id}</p>
                  <p>Total Amount: {order.amount} DZ</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Votre Information</h3>
                  <p>Nom: {order.infos?.nomprenom || 'N/A'}</p>
                  <p>Numero: {order.infos?.phone || 'N/A'}</p>
                  <p>Addresse: {order.infos?.adresse || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Produits commandés</h3>
                  {(order.items || []).map((item, index) => (
                    <div key={index} className="bg-gray-50 p-2 rounded mb-2">
                      <p className="font-medium">{item.productId?.title || 'Unknown Product'}</p>
                      <p>Quantité: {item.quantity || 0}</p>
                      <p>Prix: {item.price || 0} DZ</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
