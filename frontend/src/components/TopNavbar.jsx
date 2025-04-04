import React, { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import SearchSection from "./SearchSection";
import { FaRegStar } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { AppContext } from "../context/AppContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const TopNavbar = () => {
  const {
    calculateCartItemsCount,
    token,
    setToken,
    backend_url,
    wishlistItems,
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
    <div className="relative bg-second py-5 px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw] border-b border-gray-300">
      <div className="flex items-center justify-between gap-10">
        {/* Logo */}

        <Link to={"/"} className="flex items-center text-3xl w-fit">
          <p className="text-white font-semibold">
            Sou<span className="text-primary">k</span>i
          </p>
        </Link>
        {/* Search Bar */}
        <div className="hidden bg-white sm:block w-full relative h-[40px] rounded-full border border-black py-2 pl-5 pr-10">
          <input
            type="text"
            placeholder="Search By Title "
            className="w-full block outline-none"
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
          />
          <CiSearch className="absolute text-2xl right-[10px] top-[50%] -translate-y-[50%]" />
        </div>
        {/* SignUp An Cart And Wishlist */}
        <div className="w-fit flex items-center gap-4">
          {/* Cart And Wishlist */}
          <div className="flex items-center gap-2">
            <Link to={"/cart"} className="relative cursor-pointer">
              <FiShoppingBag className="text-2xl text-primary" />
              <p className="absolute w-[16px] h-[16px] rounded-full bg-red-800 text-white text-sm font-medium flex items-center justify-center top-[-5px] right-[-5px]">
                {calculateCartItemsCount()}
              </p>
            </Link>
            <Link to={"/wishlist"} className="relative cursor-pointer">
              <FaRegStar className="text-2xl text-primary" />
              <p className="absolute w-[16px] h-[16px] rounded-full bg-red-800 text-white text-sm font-medium flex items-center justify-center top-[-5px] right-[-5px]">
                {wishlistItems?.length || 0}
              </p>
            </Link>
          </div>
          {/* Switch Between Signup and User Profile */}
          {token ? (
            <div className="relative group w-[40px] h-[40px]">
              <img
                src={userImage}
                alt="user-profile"
                className="max-w-[100%] rounded-full border-2 border-primary cursor-pointer"
              />
              <div className="hidden group-hover:block absolute top-[100%] right-[-5px] bg-transition  z-[3000] p-5 w-[230px]">
                <div className="bg-black text-white flex flex-col items-start p-3 border-2 border-primary rounded-md  gap-2 ">
                  <NavLink
                    to={"/my-profile"}
                    className="py-1 transition-all duration-300 hover:text-primary block w-full text-left"
                  >
                    My Profile
                  </NavLink>
                  <NavLink
                    to={"/my-orders"}
                    className="py-1 transition-all duration-300 hover:text-primary block w-full text-left"
                  >
                    Orders
                  </NavLink>
                  <button
                    onClick={logoutHandler}
                    className="py-1 transition-all duration-300 hover:text-primary block w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to={"/signup"}
              className="bg-primary text-white py-2 px-5 w-[100px] rounded-full transition-all duration-300 hover:bg-blue-900"
            >
              Sign Up
            </Link>
          )}
        </div>
      </div>
      {searchValue && <SearchSection searchValue={searchValue} />}
    </div>
  );
};

export default TopNavbar;
