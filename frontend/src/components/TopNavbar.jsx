import React, { useContext, useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import SearchSection from "./SearchSection";
import { FaShoppingBag, FaStore } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { AppContext } from "../context/AppContext";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [sellerStatus, setSellerStatus] = useState(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const location = useLocation();
  const searchInputRef = useRef(null);

  const navigate = useNavigate();
  
  // Get User
  const getUser = async () => {
    const response = await axios.post(
      backend_url + "/api/users/user",
      {},
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    if (response.data.success) {
      setUserImage(response.data.user.image);
      setIsSeller(response.data.user.isSeller);
      setSellerStatus(response.data.user.sellerStatus);
      
      // Check if user is admin
      const adminResponse = await axios.post(
        backend_url + "/api/order/list-dashboard",
        { userDetails: { id: localStorage.getItem('userId') } },
        {
          headers: { authorization: "Bearer " + token }
        }
      );
      if (adminResponse.data.success && adminResponse.data.message === "Admin") {
        setIsAdmin(true);
      }
    }
  };

  // logout Handler
  const logoutHandler = () => {
    window.localStorage.removeItem("token");
    // Don't remove cartItems to persist cart across sessions
    // window.localStorage.removeItem("cartItems");
    window.localStorage.removeItem("userId");
    setToken("");
    setIsAdmin(false);
    setIsSeller(false);
    setSellerStatus(null);
    navigate("/signin");
  };

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  // Clear search when route changes
  useEffect(() => {
    setSearchValue("");
  }, [location.pathname]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[1000] bg-second py-5 sm:py-5 px-4 sm:px-[50px] shadow-xl">
      <div className="flex items-center justify-between gap-4 sm:gap-10">
        {/* Logo */}
        <Link to={"/"} className="flex items-center text-3xl w-fit transition-all duration-300">
          <p className="text-third font-playfair font-bold text-[32px] sm:text-[40px] leading-none drop-shadow-lg hover:text-primary group">
            SOU<span className="text-primary group-hover:text-third">K</span>I
          </p>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden sm:block group drop-shadow-lg font-inter font-medium bg-[#dda25e93] w-full relative h-[40px] rounded-full border-2 border-third py-1.5 pl-5 pr-10">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Recherche... "
            className="w-full block outline-none bg-transparent text-[#683718] placeholder-[#683718] focus:placeholder-[#f2c897] transition placeholder:transition-colors duration-300"
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchValue.trim()) {
                navigate(`/shop?search=${searchValue}`);
              }
            }}
          />
          <button type="button" 
          onClick={() => {
            if (searchValue.trim()) {
              navigate(`/shop?search=${searchValue}`);
            } else {
              searchInputRef.current?.focus();
            }
          }}
          className="hover:text-[#f2c897] text-third transition-transform duration-200">
            <FaSearch className="absolute text-xl right-[10px] top-[50%] -translate-y-1/2" />
          </button>
        </div>

        {/* SignUp And Cart*/}
        <div className="w-fit flex items-center gap-2 sm:gap-4">
          {/* Switch Between Signup and User Profile */}
          {token ? (
            <div className="flex items-center gap-4">
              {!isAdmin && !isSeller && sellerStatus !== 'pending' && (
                <Link to="/become-seller" className="hidden sm:flex font-inter font-medium bg-primary text-third w-[180px] h-[40px] text-center items-center justify-center gap-2 border-2 border-third rounded-full transition-all duration-300 hover:bg-[#c48f4d93]">
                  <span>Vendre avec Souki</span>
                </Link>
              )}
              {sellerStatus === 'pending' && (
                <div className="hidden sm:flex font-inter font-medium bg-[#e9c49c93] text-third w-[150px] h-[40px] text-center items-center justify-center gap-2 border-2 border-third rounded-full">
                  <span className="animate-pulse">Pending...</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                {/* Search Bar - Mobile */}
                <button 
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                  className="sm:hidden text-third hover:text-primary transition-colors duration-300"
                >
                  <FaSearch className="text-xl" />
                </button>

                <div className="relative group w-[40px] h-[40px]">
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
                      {(isAdmin || isSeller) && (
                        <NavLink
                          to={"/dashboard"}
                          className="py-1 transition-all duration-300 hover:text-primary block w-full text-left"
                        >
                          {isAdmin ? "Espace Admin" : "Espace Vendeur"}
                        </NavLink>
                      )}
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
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Search Bar - Mobile */}
              <button 
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="sm:hidden text-third hover:text-primary transition-colors duration-300"
              >
                <FaSearch className="text-xl" />
              </button>

              <Link to={"/signin"}>
                <div className="font-inter font-medium bg-[#dda25e93] text-third pl-2.5 py-1.5 text-center items-center flex gap-2 w-[150px] border-2 border-third rounded-full transition-all duration-300 drop-shadow-lg hover:bg-third hover:text-primary">            
                  <IoPersonSharp />  
                  <p>Se Connecter</p>
                </div>
              </Link>
            </div>
          )}

          {/* Cart */}
          <div className="flex items-center gap-2">
            <Link to={"/cart"} className="relative cursor-pointer">
              <FaShoppingBag className="text-2xl text-[#e1ad72] drop-shadow-lg transition-all duration-300 hover:text-third" />
              <p className="absolute w-[16px] h-[16px] rounded-full bg-red-800 text-white text-sm font-medium flex items-center justify-center top-[-5px] right-[-5px]">
                {calculateCartItemsCount()}
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {showMobileSearch && (
        <div className="sm:hidden absolute left-0 right-0 top-full bg-second px-4 py-3 border-t border-third">
          <div className="group drop-shadow-lg font-inter font-medium bg-[#dda25e93] w-full relative h-[40px] rounded-full border-2 border-third py-1.5 pl-5 pr-10">
            <input
              type="text"
              placeholder="Recherche... "
              className="w-full block outline-none bg-transparent text-[#683718] placeholder-[#683718] focus:placeholder-[#f2c897] transition placeholder:transition-colors duration-300"
              value={searchValue}
              onChange={(event) => {
                setSearchValue(event.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchValue.trim()) {
                  navigate(`/shop?search=${searchValue}`);
                  setShowMobileSearch(false);
                }
              }}
            />
            <button type="button" 
              onClick={() => {
                if (searchValue.trim()) {
                  navigate(`/shop?search=${searchValue}`);
                  setShowMobileSearch(false);
                }
              }}
              className="hover:text-[#f2c897] text-third transition-transform duration-200"
            >
              <FaSearch className="absolute text-xl right-[10px] top-[50%] -translate-y-1/2" />
            </button>
          </div>
        </div>
      )}

      {searchValue && <SearchSection searchValue={searchValue} />}
    </div>
  );
};

export default TopNavbar;
