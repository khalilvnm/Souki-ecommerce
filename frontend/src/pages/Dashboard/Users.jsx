import { useContext, useEffect, useState } from "react";
import { AppContext } from './../../context/AppContext';
import { toast } from "react-toastify";
import axios from "axios";
import { FaTrash, FaUserMinus } from "react-icons/fa";

const Users = () => {
  const { backend_url, token } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get Users Dashboard
  const getUsersDashboard = async () => {
    try {
      const response = await axios.post(backend_url + "/api/users/users-dashboard", {}, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete User
  const deleteUserHandler = async (userId) => {
    try {
      const response = await axios.post(backend_url + "/api/users/delete-user-dashboard", { userId: userId }, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        if (response.status === 201) {
          toast.info(response.data.message);
        } else {
          toast.info(response.data.message);
          getUsersDashboard(); // Refresh the users list after successful deletion
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  const handleRemoveSeller = async (userId) => {
    try {
      const response = await axios.post(
        backend_url + "/api/users/remove-seller",
        { 
          userDetails: { id: localStorage.getItem('userId') },
          userId 
        },
        {
          headers: { authorization: "Bearer " + token }
        }
      );
      if (response.data.success) {
        toast.success('Seller privileges removed successfully');
        getUsersDashboard();
      }
    } catch (error) {
      console.error('Error removing seller privileges:', error);
      toast.error(error.response?.data?.message || 'Failed to remove seller privileges');
    }
  };

  useEffect(() => {
    getUsersDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center h-[70vh]">
        <p className="text-[#6E3919] font-semibold text-xl">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-[#6E3919] text-center mb-10">Utilisateurs</h2>
      
      {users.length === 0 ? (
        <div className="flex justify-center items-center">
          <p className="text-gray-500 text-center">Aucun utilisateur trouvé</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {users.map((user) => (
            <div key={user._id} className="bg-fifth p-6 rounded-lg shadow">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={user.image}
                  alt={user.username}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-[#6E3919]">{user.username}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  {user.isSeller && (
                    <span className="inline-block px-2 py-1 text-sm bg-[#6E3919] text-white rounded">
                      Vendeur
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex gap-3">
                {user.isSeller && (
                  <button
                    onClick={() => handleRemoveSeller(user._id)}
                    className="px-6 py-2 bg-red-600 text-white hover:bg-red-300 hover:text-red-700 rounded hover:opacity-90 transition-all flex items-center gap-2"
                  >
                    <FaUserMinus /> Retirer les privilèges de vendeur
                  </button>
                )}
                <button
                  onClick={() => deleteUserHandler(user._id)}
                  className="px-6 py-2 bg-red-600 text-white hover:bg-red-300 hover:text-red-700 rounded hover:opacity-90 transition-all flex items-center gap-2"
                >
                  <FaTrash /> Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
