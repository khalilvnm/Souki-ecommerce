import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash } from 'react-icons/fa';

const Orders = () => {
  const { backend_url, token } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchOrders = async () => {
    try {
      // First try to fetch all orders (admin view)
      const adminResponse = await axios.post(
        backend_url + "/api/order/list-dashboard",
        { userDetails: { id: localStorage.getItem('userId') } },
        {
          headers: { authorization: "Bearer " + token }
        }
      );
      
      if (adminResponse.data.success) {
        setOrders(adminResponse.data.orders);
        setIsAdmin(adminResponse.data.message === "Admin");
        return;
      }

      // If not admin, fetch seller-specific orders
      const sellerResponse = await axios.post(
        backend_url + "/api/order/product-owner-orders",
        { userDetails: { id: localStorage.getItem('userId') } },
        {
          headers: { authorization: "Bearer " + token }
        }
      );
      
      if (sellerResponse.data.success) {
        setOrders(sellerResponse.data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Échec de la récupération des commandes');
    }
  };

  useEffect(() => {
    fetchOrders();
    
    // Set up auto refresh every 30 seconds
    const refreshInterval = setInterval(() => {
      fetchOrders();
    }, 30000);

    // Cleanup on unmount
    return () => clearInterval(refreshInterval);
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
          toast.success('Commande supprimée avec succès');
          fetchOrders(); // Refresh orders list
        }
      } catch (error) {
        console.error('Error deleting order:', error);
        toast.error(error.response?.data?.message || 'Échec de la suppression de la commande');
      }
    }
  };

  const OrderCard = ({ order }) => (
    <div key={order._id} className="border border-second bg-fifth text-third p-4 rounded-lg shadow relative">
      <button
        onClick={() => handleDeleteOrder(order._id)}
        className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors duration-300"
        title="Supprimer la commande"
      >
        <FaTrash size={18} />
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm sm:text-base">
        <div className="bg-fifth p-3 rounded-lg">
          <h3 className="font-semibold text-base sm:text-lg mb-2 text-primary">Détails de la commande</h3>
          <div className="space-y-1">
            <p className="break-all"><span className="font-semibold">Commande ID:</span> {order._id}</p>
            <p><span className="font-semibold">Montant total:</span> {order.amount} DZ</p>
            <p><span className="font-semibold">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="bg-fifth p-3 rounded-lg">
          <h3 className="font-semibold text-base sm:text-lg mb-2 text-primary">Informations client</h3>
          <div className="space-y-1">
            <p><span className="font-semibold">Nom:</span> {order.infos?.nomprenom || 'N/A'}</p>
            <p><span className="font-semibold">Numero:</span> {order.infos?.phone || 'N/A'}</p>
            <p><span className="font-semibold">Addresse:</span> {order.infos?.adresse || 'N/A'}</p>
            {order.userId?.email && (
              <p><span className="font-semibold">Email:</span> {order.userId.email}</p>
            )}
          </div>
        </div>
        <div className="bg-fifth p-3 rounded-lg">
          <h3 className="font-semibold text-base sm:text-lg mb-2 text-primary">Ordered Products</h3>
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="bg-fifth p-2 rounded">
                <p className="font-medium text-sm sm:text-base pb-2">{item.productId?.title || 'Produit inconnu'}</p>
                <div className="text-sm grid grid-cols-2 gap-2 mt-1">
                  <p><span className="font-semibold">Quantité:</span> {item.quantity}</p>
                  <p><span className="font-semibold">Prix:</span> {item.price} DZ</p>
                </div>
                {isAdmin && item.productOwnerId && (
                  <p className="text-xs text-gray-500 mt-1">Vendeur ID: {item.productOwnerId}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-third">
        {isAdmin ? "Tous les Commandes" : "Commandes pour vos produits"}
      </h2>
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">
          {isAdmin ? "No orders in the system yet" : "Aucune commande pour le moment"}
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
