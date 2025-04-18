import React, { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import SearchSection from "./SearchSection";
import { FaShoppingBag } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { AppContext } from "../context/AppContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";


const TopNavbar = () => {
  const {
    calculateCartItemsCount,
    token,
    setToken,
    backend_url,
  } = useContext(AppContext);
  const [searchValue, setSearchValue] = useState("");
  const [userImage, setUserImage] = useState(null);

  const navigate = useNavigate();
  
  // Get User
  const getUser = async () => {
    const response = await axios.post(
      backend_url + "/api/users/user",
      {},
      {
        headers: { authorization: "Beaer " + token },
      }
    );
    if (response.data.success) {
      setUserImage(response.data.user.image);
    }
  };

  // logout Handler
  const logoutHandler = () => {
    window.localStorage.removeItem("token");
    setToken("");
    navigate("/signin");
  };

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  return (
    <div className="relative bg-second py-5 px-[50px]">
      <div className="flex items-center justify-between gap-10">
        {/* Logo */}
        <Link to={"/"} className="flex items-center text-3xl w-fit">
          <p className="text-third font-playfair font-bold text-[40px] leading-none drop-shadow-lg">
            SOU<span className="text-primary">K</span>I
          </p>
        </Link>
        {/* Search Bar */}
        <div className="hidden font-inter font-medium bg-[#dda25e93] sm:block w-full relative h-[40px] rounded-full border-2 border-third py-1.5 pl-5 pr-10">
          <input
            type="text"
            placeholder="Recherche... "
            className="w-full block outline-none bg-transparent text-[#683718] placeholder-[#683718]"
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
          />
          <button>
          <CiSearch className="absolute text-2xl right-[10px] top-[50%] -translate-y-[50%]" />
          </button>
        </div>
        {/* SignUp And Cart*/}
        <div className="w-fit flex items-center gap-4">
          {/* Switch Between Signup and User Profile */}
          {token ? (
            <div className="relative group w-[40px] h-[40px]">
            <img
              src={userImage}
              alt="user-profile"
              className="w-10 h-10 object-cover rounded-full border-2 border-primary cursor-pointer"
            />
              <div className="hidden  font-inter font-medium group-hover:block absolute top-[100%] right-[-5px] bg-transition  z-[3000] p-5 w-[230px]">
                <div className="bg-black text-white flex flex-col items-start p-3 border-2 border-primary rounded-md  gap-2 ">
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
                  <NavLink
                    to={"/dashboard"}
                    className="py-1 transition-all duration-300 hover:text-primary block w-full text-left"
                  >
                    Espace Vendeur
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
          ) : (
            <Link to={"/signin"}>

            <div className="font-inter font-medium bg-[#dda25e93] text-third pl-2.5 py-1.5 text-center items-center flex gap-2 w-[150px] border-2 border-third rounded-full transition-all duration-300 hover:bg-slate-500">            
              <IoPersonSharp />  
              <p>Se Connecter</p>
            </div>
            </Link>
          )}
                    {/* Cart */}
                    <div className="flex items-center gap-2">
            <Link to={"/cart"} className="relative cursor-pointer ">
              <FaShoppingBag className="text-2xl text-[#e1ad72] drop-shadow-lg" />
              <p className="absolute w-[16px] h-[16px] rounded-full bg-red-800 text-white text-sm font-medium flex items-center justify-center top-[-5px] right-[-5px]">
                {calculateCartItemsCount()}
              </p>
            </Link>
          </div>
        </div>
      </div>
      {searchValue && <SearchSection searchValue={searchValue} />}
    </div>
  );
};

export default TopNavbar;
