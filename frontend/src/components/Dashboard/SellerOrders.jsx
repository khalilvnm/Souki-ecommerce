import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const SellerOrders = () => {
  const { backend_url, token } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(
          backend_url + "/api/order/product-owner-orders",
          { userDetails: { id: localStorage.getItem('userId') } },
          {
            headers: { authorization: "Bearer " + token }
          }
        );
        
        if (response.data.success) {
          setOrders(response.data.orders);
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
      <h2 className="text-2xl font-bold mb-4">Commandes pour vos produits</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">Aucune commande pour le moment</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">Commande ID: {order._id}</p>
                  <p>Statu: {order.status}</p>
                  <p>Montant total: {order.amount} DZ</p>
                </div>
                <div>
                  <p className="font-semibold">Informations client:</p>
                  <p>Nom: {order.infos.nomprenom}</p>
                  <p>Numero: {order.infos.phone}</p>
                  <p>Addresse: {order.infos.adresse}</p>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Produits commandés:</h3>
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-2 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">{item.productId.title}</p>
                      <p>Quantité: {item.quantity}</p>
                      <p>Prix: {item.price} DZ</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerOrders; 