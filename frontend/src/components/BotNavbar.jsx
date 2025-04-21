import {useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiMenu3Fill } from "react-icons/ri";

const BotNavbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  return (
    <div className='fixed top-[80px] left-0 right-0 z-[999] botnavbar py-3 px-[3vw] sm:px-[3vw] md:px-[7vw] lg:px-[9vw] bg-primary'>
      <div className='hidden text-xl font-inter font-semibold md:flex max-lg:gap-x-1 text-third items-center gap-6 justify-center'>
      <NavLink to={"/"} className="drop-shadow-lg py-1 px-2 transition-all duration-300 hover:text-second hover:underline max-lg:text-sm">Accueil</NavLink>
        <NavLink to={"/shop"} className="drop-shadow-lg py-1 px-2 transition-all duration-300 hover:text-second hover:underline max-lg:text-sm">Magasin</NavLink>
        <NavLink to={"/vetement"} className="drop-shadow-lg py-1 px-2 transition-all duration-300 hover:text-second hover:underline max-lg:text-sm">Vêtements</NavLink>
        <NavLink to={"/decoration"} className="drop-shadow-lg py-1 px-2 transition-all duration-300 hover:text-second hover:underline max-lg:text-sm">Décoration</NavLink>
        <NavLink to={"/cuisine"} className="drop-shadow-lg py-1 px-2 transition-all duration-300 hover:text-second hover:underline max-lg:text-sm">Cuisine</NavLink>
        <NavLink to={"/accessoire"} className="drop-shadow-lg py-1 px-2 transition-all duration-300 hover:text-second hover:underline max-lg:text-sm">Accessoires</NavLink>
        <NavLink to={"/bijoux"} className="drop-shadow-lg py-1 px-2 transition-all duration-300 hover:text-second hover:underline max-lg:text-sm">Bijoux</NavLink>
        <NavLink to={"/bain-beaute"} className="drop-shadow-lg py-1 px-2 transition-all duration-300 hover:text-second hover:underline max-lg:text-sm">Bain et Beauté</NavLink>
        
        {/*<NavLink to={"/about-us"} className="py-1 px-2 transition-all duration-300 hover:text-second hover:underline max-lg:text-sm">About Us</NavLink>
        <NavLink to={"/contact-us"} className="py-1 px-2 transition-all duration-300 hover:text-second hover:underline max-lg:text-sm">Contact Us</NavLink>
        */}

        </div>
      {/* Responsive Screen */}
      <div className='flex md:hidden justify-end overflow-hidden'>
        <RiMenu3Fill className='text-white text-3xl cursor-pointer' onClick={() => { setShowNavbar((prev) => !prev); }} />
        <div className={`overflow-hidden botnavbar-responsive ${showNavbar ? "w-full" : "w-0"} pb-5 absolute top-[100%] py-3 right-0 transition-all duration-300 bg-second border-t border-gray-800 flex flex-col gap-2 z-[9000] text-gray-100`}>
          <NavLink to={"/"} className="py-3 px-2 transition-all duration-300 hover:underline" onClick={() => { setShowNavbar(false); scrollTo(0, 0); }}>Accueil</NavLink>
          <NavLink to={"/shop"} className="py-3 px-2 transition-all duration-300 hover:underline" onClick={() => { setShowNavbar(false); scrollTo(0, 0); }}>Magasin</NavLink>
          <NavLink to={"/vetement"} className="py-3 px-2 transition-all duration-300 hover:underline" onClick={() => { setShowNavbar(false); scrollTo(0, 0); }}>Vêtements</NavLink>
          <NavLink to={"/decoration"} className="py-3 px-2 transition-all duration-300  hover:underline" onClick={() => { setShowNavbar(false); scrollTo(0, 0); }}>Décoration</NavLink>
          <NavLink to={"/cuisine"} className="py-3 px-2 transition-all duration-300  hover:underline" onClick={() => { setShowNavbar(false); scrollTo(0, 0); }}>Cuisine</NavLink>
          <NavLink to={"/accessoire"} className="py-3 px-2 transition-all duration-300 hover:underline" onClick={() => { setShowNavbar(false); scrollTo(0, 0); }}>Accessoires</NavLink>
          <NavLink to={"/bijoux"} className="py-3 px-2 transition-all duration-300 hover:underline" onClick={() => { setShowNavbar(false); scrollTo(0, 0); }}>Bijoux</NavLink>
          <NavLink to={"/bain-beaute"} className="py-3 px-2 transition-all duration-300 hover:underline" onClick={() => { setShowNavbar(false); scrollTo(0, 0); }}>Bain et Beauté</NavLink>
          
          {/*<NavLink to={"/about-us"} className="py-3 px-2 transition-all duration-300 hover:underline" onClick={() => { setShowNavbar(false); scrollTo(0, 0); }}>About Us</NavLink>
          <NavLink to={"/contact-us"} className="py-3 px-2 transition-all duration-300 hover:underline" onClick={() => { setShowNavbar(false); scrollTo(0, 0); }}>Contact Us</NavLink>
          */}

          </div>
      </div>
    </div>
  );
};

export default BotNavbar;
