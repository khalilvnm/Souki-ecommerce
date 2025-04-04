import { toast } from 'react-toastify';
import axios from "axios";
import { useContext, useEffect, useState } from 'react';
import { AppContext } from './../context/AppContext';
import LoadingPage from './LoadingPage/LoadingPage';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const [user, setUser] = useState(null);
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
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  // Logout Handler
  const logoutHandler = () => {
    window.localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="relative mt-10 py-20 min-h-[90vh] px-[3vw] sm:px-[5vw] md:px-[7vw] lg-px-[9vw]">
      {
        user
          ?
          <div className='w-full md:w-[600px] flex max-md:items-center flex-col md:flex-row items-start gap-3 md:gap-10 lg:w-[900px] mx-auto p-10 rounded-md bg-[#050a21]'>
            <img src={user.image} alt='user-image' className='w-20 md:w-40 p-1 bg-gray-500 border border-white outline-primary rounded-full' />
            <div className='w-full flex flex-col gap-3 mt-3'>
              <div className='flex items-center justify-between'>
                <p className='text-gray-100 mb-1'>Username: {user.username}</p>
                <p className='text-gray-100 mb-1'>Email: {user.email}</p>
              </div>

              <p className='text-gray-100 mb-1'>CreatedAt: {new Date(user.createdAt).toLocaleDateString()}</p>

              <button onClick={logoutHandler} className='text-white w-fit bg-[#006988] mt-5 py-1 px-5 rounded-md '>Logout</button>
            </div>
          </div>
          :
          <LoadingPage />
      }

    </div>
  );
};

export default MyProfile;
