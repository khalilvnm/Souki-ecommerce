import {useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiMenu3Fill } from "react-icons/ri";

const BotNavbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  return (
    <div className='relative botnavbar py-3 px-[3vw] sm:px-[3vw] md:px-[7vw] lg:px-[9vw] bg-primary'>
      <div className='hidden md:flex max-lg:gap-x-1 text-gray-100 items-center gap-2 justify-center'>
        <NavLink to={"/"} className="py-1 px-2 transition-all duration-300 max-lg:text-sm">Home</NavLink>
        <NavLink to={"/shop"} className="py-1 px-2 transition-all duration-300 max-lg:text-sm">Shop</NavLink>
        <NavLink to={"/vetement"} className="py-1 px-2 transition-all duration-300 max-lg:text-sm">Vetement</NavLink>
        <NavLink to={"/decoration"} className="py-1 px-2 transition-all duration-300 max-lg:text-sm">Decoration</NavLink>
        <NavLink to={"/cuisine"} className="py-1 px-2 transition-all duration-300 max-lg:text-sm">Cuisine</NavLink>
        <NavLink to={"/accessoire"} className="py-1 px-2 transition-all duration-300 max-lg:text-sm">Accessoire</NavLink>
        <NavLink to={"/about-us"} className="py-1 px-2 transition-all duration-300 max-lg:text-sm">About Us</NavLink>
        <NavLink to={"/contact-us"} className="py-1 px-2 transition-all duration-300 max-lg:text-sm">Contact Us</NavLink>
      </div>
      {/* Add Responsive Screen */}
      <div className='flex md:hidden justify-end overflow-hidden'>
        <RiMenu3Fill className='text-white text-3xl cursor-pointer' onClick={() => { setShowNavbar((prev) => !prev); }} />
        {/* Links */}
        <div className={`overflow-hidden botnavbar-responsive ${showNavbar ? "w-full" : "w-0"} pb-5 absolute top-[100%] py-3 right-0 transition-all duration-300 bg-second border-t border-gray-800 flex flex-col gap-2 z-[9000] text-gray-100`}>
          <NavLink to={"/"} className="py-3 px-2 transition-all duration-300" onClick={() => { setShowNavbar(false); scrollTo(0, 0); }}>Home</NavLink>
          <NavLink to={"/shop"} className="py-3 px-2 transition-all duration-300" onClick={() => { setShowNavbar(false); scrollTo(0, 0); }}>Shop</NavLink>
          <NavLink to={"/vetement"} className="py-3 px-2 transition-all duration-300" onClick={() => { setShowNavbar(false); scrollTo(0, 0); }}>Vetement</NavLink>
          <NavLink to={"/decoration"} className="py-3 px-2 transition-all duration-300" onClick={() => { setShowNavbar(false); scrollTo(0, 0); }}>Decoration</NavLink>
          <NavLink to={"/cuisine"} className="py-3 px-2 transition-all duration-300" onClick={() => { setShowNavbar(false); scrollTo(0, 0); }}>Cuisine</NavLink>
          <NavLink to={"/accessoire"} className="py-3 px-2 transition-all duration-300" onClick={() => { setShowNavbar(false); scrollTo(0, 0); }}>Accessoire</NavLink>
          <NavLink to={"/about-us"} className="py-3 px-2 transition-all duration-300" onClick={() => { setShowNavbar(false); scrollTo(0, 0); }}>About Us</NavLink>
          <NavLink to={"/contact-us"} className="py-3 px-2 transition-all duration-300" onClick={() => { setShowNavbar(false); scrollTo(0, 0); }}>Contact Us</NavLink>
        </div>
      </div>
    </div>
  );
};

export default BotNavbar;
