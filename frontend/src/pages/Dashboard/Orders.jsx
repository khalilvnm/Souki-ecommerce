import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash } from 'react-icons/fa';
import { MdOutlineLocalShipping, MdDoneAll, MdCancel, MdPending, MdOutlineInventory } from 'react-icons/md';

const Orders = () => {
  const { backend_url, token } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [role, setRole] = useState('user');

  const fetchOrders = async () => {
      const userId = localStorage.getItem('userId');
      const isSeller = localStorage.getItem('isSeller') === 'true';
      const email = localStorage.getItem('email');
      const response = await axios.post(
        backend_url + "/api/order/orders-by-role",
        { userDetails: { id: userId }, isSeller, email },
        {
          headers: { authorization: "Bearer " + token }
        }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
        setRole(response.data.role);
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

  // Handle order status update
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `${backend_url}/api/order/update-status/${orderId}`,
        { 
          userDetails: { id: localStorage.getItem('userId') },
          status: newStatus 
        },
        {
          headers: { authorization: "Bearer " + token }
        }
      );

      if (response.data.success) {
        toast.success('Statut de la commande mis à jour avec succès');
        fetchOrders(); // Refresh orders list
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error(error.response?.data?.message || 'Échec de la mise à jour du statut');
    }
  };
  
  // Get status icon based on status
  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending':
        return <MdPending className="text-yellow-500" size={22} />;
      case 'processing':
        return <MdOutlineInventory className="text-blue-500" size={22} />;
      case 'shipped':
        return <MdOutlineLocalShipping className="text-purple-500" size={22} />;
      case 'delivered':
        return <MdDoneAll className="text-green-500" size={22} />;
      case 'cancelled':
        return <MdCancel className="text-red-500" size={22} />;
      default:
        return <MdPending className="text-yellow-500" size={22} />;
    }
  };
  
  // Get status text in French
  const getStatusText = (status) => {
    switch(status) {
      case 'pending':
        return 'En attente';
      case 'processing':
        return 'En traitement';
      case 'shipped':
        return 'Expédié';
      case 'delivered':
        return 'Livré';
      case 'cancelled':
        return 'Annulé';
      default:
        return 'En attente';
    }
  };

  const OrderCard = ({ order }) => {
    // Get current status or default to 'pending'
    const currentStatus = order.status || 'pending';
    
    return (
      <div key={order._id} className="border border-second bg-fifth text-third p-4 rounded-lg shadow relative">
        {role === 'admin' && (
          <button
            onClick={() => handleDeleteOrder(order._id)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors duration-300"
            title="Supprimer la commande"
          >
            <FaTrash size={18} />
          </button>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm sm:text-base">
          <div className="bg-fifth p-3 rounded-lg">
            <h3 className="font-semibold text-base sm:text-lg mb-2 text-primary">Détails de la commande</h3>
            <div className="space-y-1">
              <p className="break-all"><span className="font-semibold">Commande ID:</span> {order._id}</p>
              <p><span className="font-semibold">Montant total:</span> {order.amount} DZ</p>
              <p><span className="font-semibold">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
              
              {/* Status display */}
              <div className="mt-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Statut:</span>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(currentStatus)}
                    <span className="font-medium">{getStatusText(currentStatus)}</span>
                  </div>
                </div>
                
                {/* Status update controls for sellers and admins */}
                {(role === 'seller' || role === 'admin') && (
                  <div className="mt-3">
                    <p className="font-semibold mb-2">Mettre à jour le statut:</p>
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => handleStatusUpdate(order._id, 'processing')}
                        className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${currentStatus === 'processing' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700'}`}
                      >
                        <MdOutlineInventory size={14} />
                        En traitement
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(order._id, 'shipped')}
                        className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${currentStatus === 'shipped' ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-700'}`}
                      >
                        <MdOutlineLocalShipping size={14} />
                        Expédié
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(order._id, 'delivered')}
                        className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${currentStatus === 'delivered' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'}`}
                      >
                        <MdDoneAll size={14} />
                        Livré
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(order._id, 'cancelled')}
                        className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${currentStatus === 'cancelled' ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700'}`}
                      >
                        <MdCancel size={14} />
                        Annulé
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
                  {role === 'admin' && item.productOwnerId && (
                    <p className="text-xs text-gray-500 mt-1">Vendeur ID: {item.productOwnerId}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-third">
        {role === 'admin' ? "Tous les Commandes" : role === 'seller' ? "Commandes pour vos produits" : "Vos Commandes"}
      </h2>
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">
          {role === 'admin' ? "No orders in the system yet" : role === 'seller' ? "Aucune commande pour le moment" : "Vous n'avez passé aucune commande"}
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
