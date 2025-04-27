import { toast } from 'react-toastify';
import axios from "axios";
import { useContext, useEffect, useState } from 'react';
import { AppContext } from './../context/AppContext';
import LoadingPage from './LoadingPage/LoadingPage';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaEdit, FaTrash, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const { backend_url, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  // Get User
  const getUser = async () => {
    try {
      const response = await axios.post(backend_url + "/api/users/user", {}, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        setUser(response.data.user);
        setNewUsername(response.data.user.username);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  // Update Profile Picture
  const updateProfilePicture = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);
      formData.append("userDetails", JSON.stringify({ id: user._id }));

      const response = await axios.post(backend_url + "/api/users/update-profile-picture", formData, {
        headers: { 
          authorization: "Bearer " + token,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setUser(response.data.user);
        toast.success("Profile picture updated successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Update Username
  const updateUsername = async () => {
    try {
      const response = await axios.post(backend_url + "/api/users/update-username", 
        { 
          username: newUsername,
          userDetails: { id: user._id }
        },
        { headers: { authorization: "Bearer " + token } }
      );

      if (response.data.success) {
        setUser(response.data.user);
        setIsEditingUsername(false);
        toast.success("Username updated successfully");
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  // Delete Account
  const deleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        const response = await axios.post(backend_url + "/api/users/delete-account", {}, {
          headers: { authorization: "Bearer " + token }
        });

        if (response.data.success) {
          window.localStorage.removeItem("token");
          setToken("");
          navigate("/");
          toast.success("Account deleted successfully");
        }
      } catch (error) {
        toast.error(error.response.data.message || error.message);
      }
    }
  };

  // Logout Handler
  const logoutHandler = () => {
    window.localStorage.removeItem("token");  
    setToken("");
    navigate("/");
  };

  // Remove Profile Picture
  const removeProfilePicture = async () => {
    try {
      const response = await axios.post(
        backend_url + "/api/users/remove-profile-picture",
        { userDetails: { id: user._id } },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      if (response.data.success) {
        setUser(response.data.user);
        toast.success("Profile picture removed successfully");
      } 
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove profile picture");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 drop-shadow-lg">
      {user ? (
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-primary to-third h-32 relative">
              <div className="absolute -bottom-16 left-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg">
                    <img 
                      src={user?.image}
                      alt="user-profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 flex gap-2 bg-white p-2 rounded-full shadow-lg">
                    <label htmlFor="profile-picture" className="cursor-pointer text-primary hover:text-third transition-colors">
                      <FaCloudUploadAlt className="text-xl" />
                    </label>
                    <button 
                      onClick={removeProfilePicture}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <FaTrash className="text-xl" />
                    </button>
                  </div>
                  <input
                    type="file"
                    id="profile-picture"
                    accept="image/*"
                    className="hidden"
                    onChange={updateProfilePicture}
                  />
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="pt-20 pb-8 px-8">
              <div className="space-y-6">
                {/* Username Section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {isEditingUsername ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newUsername}
                          onChange={(e) => setNewUsername(e.target.value)}
                          className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                          onClick={updateUsername}
                          className="bg-primary text-white px-3 py-1 rounded-md hover:bg-third transition-colors"
                        >
                          Sauvegarder
                        </button>
                        <button
                          onClick={() => {
                            setIsEditingUsername(false);
                            setNewUsername(user.username);
                          }}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <IoMdClose className="text-xl" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold text-third">{user.username}</h2>
                        <button
                          onClick={() => setIsEditingUsername(true)}
                          className="text-primary hover:text-third transition-colors"
                        >
                          <FaEdit className="text-xl" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* User Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-third font-semibold">
                    <FaUserCircle className="text-xl text-third" />
                    <span className="font-medium">Email: </span>
                    <span className='text-gray-800'>{user.email}</span>
                  </div>
                  <div className="text-third">
                    Membre depuis {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button 
                    onClick={logoutHandler} 
                    className="flex items-center justify-center gap-2 bg-second text-fifth px-6 py-2 rounded-md hover:bg-third hover:text-primary transition-colors"
                  >
                    <FaSignOutAlt />
                    <span>Déconnexion</span>
                  </button>
                  <button 
                    onClick={deleteAccount} 
                    className="flex items-center justify-center gap-2 bg-red-200 text-red-600 px-6 py-2 rounded-md hover:bg-red-300 transition-colors"
                  >
                    <FaTrash />
                    <span>Supprimer le compte</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
};

export default MyProfile;
