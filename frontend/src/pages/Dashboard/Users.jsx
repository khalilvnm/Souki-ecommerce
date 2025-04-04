import { useContext, useEffect, useState } from "react";
import { AppContext } from './../../context/AppContext';
import { toast } from "react-toastify";
import axios from "axios";

const Users = () => {
  const { backend_url, token } = useContext(AppContext);
  const [users, setUsers] = useState([]);

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
    }
  };

  // Delete User
  const deleteUserHandler = async (userId) => {
    try {
      const response = await axios.post(backend_url + "/api/users/delete", { userId: userId }, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        if (response.status === 201) {
          toast.info(response.data.message);
        } else {
          toast.info(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };


  useEffect(() => {
    getUsersDashboard();
  }, []);


  return (
    <div className="h-full w-full py-10 px-[3vw]">
      <div className="grid md:grid-cols-[1fr_1fr] gap-4">
        {
          users.map((user, index) => (
            <div className="relative pl-3 lg:pl-8 flex gap-3 bg-gray-50 py-5 pr-2 border border-gray-300 roumded-md items-center" key={index}>
              <p className="absolute top-0 left-0 bg-gray-900 py-2 px-3 rounded-br-3xl text-white">{index + 1}</p>
              <div className="w-[80px]">
                <img src={user.image} alt="user-image" className="w-[80px] p-1 bg-white border-2 border-primary rounded-full" />
              </div>
              <div className="mt-2 w-full">
                <p className="text-gray-700">Username: <span className="text-gray-900 font-medium">{user.username}</span></p>
                <p className="text-gray-700">Email: <span className="text-gray-900 font-medium">{user.email}</span></p>
                <button onClick={() => { deleteUserHandler(user._id); }} className="mt-2 text-[15px] bg-black text-white py-1 px-4 rounded-full">Remove</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Users;
