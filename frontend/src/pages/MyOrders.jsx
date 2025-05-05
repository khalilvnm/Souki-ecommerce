import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { IoArrowBackCircle } from "react-icons/io5";
import { FaTrash } from 'react-icons/fa';
import { MdOutlineLocalShipping, MdDoneAll, MdCancel, MdPending, MdOutlineInventory } from 'react-icons/md';

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

  // Delete Order functionality removed - only admins can delete orders

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
    <div className="py-10 min-h-[70vh] px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
    <div className="flex items-center gap-3 mb-6">
    <button onClick={() => window.history.back()}>
    <IoArrowBackCircle className="absolute top-auto left-5 z-10 hidden sm:block  text-primary text-5xl hover:text-third transition-all drop-shadow-lg" />
    </button></div> 
    <p className="text-2xl pb-2 font-extrabold text-third font-inter">Mes commandes</p>

      
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center pt-5">Aucune commande pour le moment</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
              // Get current status or default to 'pending'
              const currentStatus = order.status || 'pending';
              
              return (
                <div key={order._id} className="relative bg-primary p-4 rounded-lg transform hover:scale-105 transition-all duration-300">
                {/* Delete button removed - only admins can delete orders */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <h3 className="font-bold font-inter text-third drop-shadow-lg text-xl mb-2 ">Commande ID</h3>
                    <p className="text-fifth drop-shadow-lg font-inter  ">{order._id}</p>
                    <p className="pt-3 text-third font-inter font-bold text-xl drop-shadow-lg">Total: <span className="text-fourth font-medium">{order.amount} DZD</span></p>
                    
                    {/* Order Status Display */}
                    <div className="mt-3 flex flex-col items-center justify-center">
                      <p className="text-third font-inter font-bold text-lg drop-shadow-lg">Statut:</p>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        {getStatusIcon(currentStatus)}
                        <span className="text-fifth font-medium">{getStatusText(currentStatus)}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold font-inter text-third drop-shadow-lg text-xl mb-2 ">Votre Information</h3>
                    <p className="text-third font-inter font-bold drop-shadow-lg">Nom: <span className="text-fifth font-medium">{order.infos?.nomprenom || 'N/A'}</span></p>
                    <p className="text-third font-inter font-bold drop-shadow-lg">Numero: <span className="text-fifth font-medium">{order.infos?.phone || 'N/A'}</span></p>
                    <p className="text-third font-inter font-bold drop-shadow-lg">Addresse: <span className="text-fifth font-medium">{order.infos?.adresse || 'N/A'}</span></p>
                  </div>
                  <div>
                    <h3 className="font-bold text-third font-inter text-lg mb-2">Produits commandés</h3>
                    {(order.items || []).map((item, index) => (
                      <div key={index} className="pb-2 px-2 rounded mb-1 ">
                      <p className="font-medium text-third font-inter mb-1 drop-shadow-lg">{item.productId?.title || 'Unknown Product'}</p>
                      <p className="text-third font-inter font-bold drop-shadow-lg">Quantité: <span className="text-fifth font-medium">{item.quantity || 0}</span></p>
                      <p className="text-third font-inter font-bold drop-shadow-lg">Prix: <span className="text-fifth font-medium">{item.price || 0} DZD</span></p>
                    </div>
                    ))}
                  </div>
                </div>
              </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
