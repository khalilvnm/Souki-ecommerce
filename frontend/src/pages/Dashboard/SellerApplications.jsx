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
        // Refresh the list
        fetchPendingSellers();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update seller status');
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Seller Applications</h2>
      
      {sellers.length === 0 ? (
        <p>No pending seller applications</p>
      ) : (
        <div className="grid gap-4">
          {sellers.map((seller) => (
            <div key={seller._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={seller.image}
                  alt={seller.username}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold">{seller.username}</h3>
                  <p className="text-gray-600">{seller.email}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Shop Information</h4>
                <p><span className="font-medium">Shop Name:</span> {seller.sellerInfo.shopName}</p>
                <p><span className="font-medium">Phone:</span> {seller.sellerInfo.phoneNumber}</p>
                <p><span className="font-medium">Address:</span> {seller.sellerInfo.address}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusUpdate(seller._id, 'approved')}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusUpdate(seller._id, 'rejected')}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Reject
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