import { NavLink } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-second px-[2vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="flex flex-col sm:flex-row items-start gap-5 pt-8 pb-14">
        {/* Left Side */}
        <div className="w-full sm:w-[40%] ">
          <p className="text-3xl flex items-center font-playfair font-bold text-white mb-5 drop-shadow-lg">SOU<span className="text-primary">K</span>I</p>
          <p className="text-gray-300 text-sm w-[80%]">Le premier site web en Algerie completement dedier aux vendeurs artisans et a la vente de produits artisanaux. 
          Souki propose un large choix dans le domaine de l'artisanat et ouvre de nouvelle possibilite aux artisans de vendre leurs produits en ligne.</p>
        </div>
        {/* Right Side */}
        <div className="w-full sm:w-[30%] flex sm:justify-center">
          <div>
            <p className="text-xl font-semibold text-gray-200 mb-5">Categories</p>
            <ul className="flex flex-col gap-2">
              <NavLink to={"/vetement"} className="text-gray-300 transition-all duration-300 hover:underline">Vetement</NavLink>
              <NavLink to={"/decoration"} className="text-gray-300 transition-all duration-300 hover:underline">Decoration</NavLink>
              <NavLink to={"/cuisine"} className="text-gray-300 transition-all duration-300 hover:underline">Cuisine</NavLink>
              <NavLink to={"/accessoire"} className="text-gray-300 transition-all duration-300 hover:underline">Accessoire</NavLink>
            </ul>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full sm:w-[30%] flex sm:justify-center">
          <div>
            <p className="text-xl font-semibold text-gray-200 mb-5">Contactez-nous</p>
            <div className="text-gray-300 text-sm mb-5">
              <p>+213-511-223-344</p>
              <p>Souki@artisanal.com</p>
            </div>

            <div className="flex items-center justify-left text-gray-300 gap-3 text-4xl">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="border border-gray-300 text-gray-300   rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" />
              </a>
              
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="border border-gray-300 text-gray-300 rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" />
              </a>

              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaXTwitter className="border border-gray-300 text-gray-300  rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" />
              </a>

              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="border border-gray-300 text-gray-300  rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copy Right */}
      <div className="border-t border-gray-300 py-4 text-center">
        <p className="text-gray-300 text-[15px]">All rights reserved Copyright &copy;2025 Designed By Hemmaz,Mansouri</p>
      </div>
    </footer>
  );
};

export default Footer;
