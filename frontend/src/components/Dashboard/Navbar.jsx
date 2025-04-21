import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";


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
    <div className="py-5 w-full h-[70px] px-[40px] flex items-center bg-second border-b border-fourth justify-between">
      <div className="flex items-center gap-8">
        {/* Back Button */}
        <Link to={"/"}
          className="text-primary text-5xl hover:text-third transition-all items-center"
          title="Retour à l'accueil"
        >
          <IoArrowBackCircle />
        </Link>
        {/* Logo */}
        <Link to={"/"} className="flex items-center text-3xl w-fit pb-1">
          <p className="text-third text-center font-playfair font-bold text-[40px] leading-none drop-shadow-lg">
            SOU<span className="text-primary">K</span>I
          </p>
        </Link>
      </div>
      {/* UserProfile */}
      <div className='relative group w-[40px] h-[40px] '>
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