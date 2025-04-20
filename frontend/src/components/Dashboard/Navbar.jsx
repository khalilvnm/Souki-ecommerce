import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { Link } from "react-router-dom";


const Navbar = () => {
  const { token, backend_url } = useContext(AppContext);
  const [userImage, setUserImage] = useState(null);
  const [user, setUser] = useState(null);

  // Get User
  const getUser = async () => {
    const response = await axios.post(backend_url + "/api/users/user", {}, {
      headers: { authorization: "Beaer " + token }
    });
    if (response.data.success) {
      setUserImage(response.data.user.image);
      setUser(response.data.user);
    }
  };

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);
  return (
    <div className="py-5 w-full h-[70px] px-[3vw] flex items-center bg-second border-b border-gray-200 justify-between">
      {/* Logo */}
      <Link to={"/"} className="flex text-3xl font-semibold items-start gap-1 text-gray-700">
        <p className='text-white font-semibold'>Sou<span className='text-primary'>k</span>i</p>
      </Link>
      {/* UserProfile */}
      <div className='relative group w-[40px] h-[40px]'>
        <img
              src={user?.image}
              alt="user-profile"
              className="w-10 h-10 object-cover rounded-full border-2 border-primary cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;