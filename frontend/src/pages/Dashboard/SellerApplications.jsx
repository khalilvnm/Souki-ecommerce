import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';

const SellerApplications = () => {
  const { backend_url, token } = useContext(AppContext);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPendingSellers();
  }, []);

  const fetchPendingSellers = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${backend_url}/api/users/pending-sellers`,
        { userDetails: { id: localStorage.getItem('userId') } },
        {
          headers: { authorization: "Bearer " + token }
        }
      );

      if (response.data.success) {
        setSellers(response.data.sellers);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch seller applications');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (userId, status) => {
    try {
      const response = await axios.post(
        `${backend_url}/api/users/update-seller-status`,
        {
          userDetails: { id: localStorage.getItem('userId') },
          userId,
          status
        },
        {
          headers: { authorization: "Bearer " + token }
        }
      );

      if (response.data.success) {
        fetchPendingSellers();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update seller status');
    }
  };

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center h-[70vh]">
        <p className="text-[#6E3919] font-semibold text-xl">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 flex justify-center items-center h-[70vh]">
        <p className="text-red-500 font-semibold text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-[#6E3919] text-center mb-10">Demandes de vendeur</h2>
      
      {sellers.length === 0 ? (
        <div className="flex justify-center items-center ">
          <p className="text-gray-500 text-center">Aucune demande de vendeur en attente</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {sellers.map((seller) => (
            <div key={seller._id} className="bg-fifth p-6 rounded-lg shadow">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={seller.image}
                  alt={seller.username}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-[#6E3919]">{seller.username}</h3>
                  <p className="text-gray-600">{seller.email}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-[#6E3919] mb-2">Informations sur la boutique</h4>
                <p><span className="font-medium text-[#6E3919]">Numéro:</span> {seller.sellerInfo.phoneNumber}</p>
                <p><span className="font-medium text-[#6E3919]">Adresse:</span> {seller.sellerInfo.address}</p>
                <p><span className="font-medium text-[#6E3919]">Description:</span> {seller.sellerInfo.description}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleStatusUpdate(seller._id, 'approved')}
                  className="px-6 py-2 bg-[#6E3919] text-fifth rounded hover:bg-primary hover:text-third hover:opacity-90 transition-all"
                >
                  Accepter
                </button>
                <button
                  onClick={() => handleStatusUpdate(seller._id, 'rejected')}
                  className="px-6 py-2 bg-red-600 text-white hover:bg-red-300 hover:text-red-700 rounded hover:opacity-90 transition-all"
                >
                  Rejeter
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerApplications;
