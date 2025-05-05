import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";


const Navbar = () => {
  const { token, backend_url, setToken } = useContext(AppContext);
  const [userImage, setUserImage] = useState(null);
  const [ setUser] = useState(null);
  const navigate = useNavigate();

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

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");
    setToken("");
    navigate("/");
  };
  
  return (
    <div className="py-5 w-full h-[70px] px-[40px] flex items-center bg-second border-b border-fourth justify-between">
      <div className="flex items-center gap-8">
        {/* Back Button */}
        <Link to={"/"}
          className="text-primary text-5xl hover:text-third transition-all items-center drop-shadow-lg"
          title="Retour à l'accueil"
        >
          <IoArrowBackCircle />
        </Link>
        {/* Logo */}
        <Link to={"/"} className="flex items-center text-3xl w-fit pb-1">
        <p className="text-third font-playfair font-bold text-[40px] leading-none drop-shadow-lg hover:text-primary group">
            SOU<span className="text-primary group-hover:text-third">K</span>I
        </p> 
        </Link>
      </div>

      {/* UserProfile */}
      <div className='relative group w-[40px] h-[40px] '>
        <img
              src={userImage}
              alt="user-profile"
              className="w-10 h-10 object-cover rounded-full border-2 border-primary cursor-pointer"
        />
        <div className="hidden font-inter font-medium group-hover:block absolute top-[100%] right-[-5px] bg-transition z-[3000] p-5 w-[230px]">
                    <div className="bg-third text-fifth flex flex-col items-start p-3 rounded-md gap-2">
                      <NavLink
                        to={"/my-profile"}
                        className="py-1 transition-all duration-300 hover:text-primary block w-full text-left"
                      >
                        Mon Profile
                      </NavLink>
                      <NavLink
                        to={"/my-orders"}
                        className="py-1 transition-all duration-300 hover:text-primary block w-full text-left"
                      >
                        Commandes
                      </NavLink>
                      <button
                        onClick={logoutHandler}
                        className="py-1 transition-all duration-300 hover:text-primary block w-full text-left"
                      >
                        Se deconnecter
                      </button>
                    </div>
                  </div>
      </div>
    </div>
  );
};

export default Navbar;