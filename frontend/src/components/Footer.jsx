import { NavLink } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import logo from '../assets/logo2.png';


const Footer = () => {
  return (
    <footer className="bg-second ">
      <div className="px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="flex flex-col sm:flex-row items-start gap-5 pt-10 pb-16">
        {/* Logo Side */}
        <div  className="w-[30%] pr-[5vw]">
          <img src={logo}/>
        </div>
        {/* Left Side */}
        <div className="w-full sm:w-[40%] ">
          <p className="text-3xl flex items-center font-playfair font-bold text-white mb-5 drop-shadow-lg">SOU<span className="text-primary ">K</span>I</p>
          <p className="text-fourth text-sm w-[80%]">Le premier site web en Algerie completement dedier aux vendeurs artisans et a la vente de produits artisanaux. 
          Souki propose un large choix dans le domaine de l'artisanat et ouvre de nouvelle possibilite aux artisans de vendre leurs produits en ligne.</p>
        </div>
        {/* Right Side */}
        <div className="w-full sm:w-[30%] flex sm:justify-center">
          <div>
            <p className="text-2xl font-playfair items-center font-bold text-white mb-5 drop-shadow-lg">Categories</p>
            <ul className="flex flex-col pl-1.5 gap-2">
              <NavLink to={"/vetement"} className="text-fourth transition-all duration-300 hover:text-third hover:underline">Vêtements</NavLink>
              <NavLink to={"/decoration"} className="text-fourth transition-all duration-300 hover:text-third hover:underline">Decoration</NavLink>
              <NavLink to={"/cuisine"} className="text-fourth transition-all duration-300 hover:text-third hover:underline">Cuisine</NavLink>
              <NavLink to={"/accessoire"} className="text-fourth transition-all duration-300 hover:text-third hover:underline">Accessoire</NavLink>
              <NavLink to={"/bijoux"} className="text-fourth transition-all duration-300 hover:text-third hover:underline">Bijoux</NavLink>
              <NavLink to={"/bain-beaute"} className="text-fourth transition-all duration-300 hover:text-third hover:underline">Bain et Beauté</NavLink>
            </ul>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full sm:w-[30%] flex sm:justify-center">
          <div>
            <p className="text-2xl font-playfair items-center font-bold text-white mb-5 drop-shadow-lg">Contacts</p>

            <div className="text-fourth pl-1.5 gap-2 mb-5">
            <div className="flex items-center gap-2">
              <FaPhoneAlt />
              <p>+213-511-223-344</p>
            </div>

            <div className="flex items-center gap-2">
              <FaEnvelope/>
              <p>Souki@artisanal.com</p>
            </div>
 
            <div className="flex items-center gap-2 whitespace-nowrap">
              <FaHouse/>
              <p>123, rue de la liberté, Alger</p>
            </div>
            </div>

            <div className="flex items-center justify-left pl-1.5 text-fourth gap-3 text-4xl">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="border border-fourth text-fourth hover:border-third hover:text-third rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" />
              </a>
              
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="border border-fourth text-fourth hover:border-third hover:text-third rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" />
              </a>

              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaXTwitter className="border border-fourth text-fourth hover:border-third hover:text-third rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" />
              </a>

              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="border border-fourth text-fourth hover:border-third hover:text-third rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" />
              </a>
            </div>
          </div>
        </div>
        
        {/* About Us */}
        <div className="w-full sm:w-[30%] flex sm:justify-center">
          <div>
            <p className="text-2xl font-playfair items-center font-bold text-white mb-5 drop-shadow-lg">En savoir plus</p>
            <ul className="flex flex-col pl-1.5 gap-2">
              <NavLink to={"/about-us"} className="text-fourth transition-all duration-300 hover:text-third hover:underline max-lg:text-sm">À propos</NavLink>
              <NavLink to={"/contact-us"} className="text-fourth transition-all duration-300 hover:text-third hover:underline max-lg:text-sm">Contactez-nous</NavLink>
            </ul>
          </div>
        </div>

      </div>
      </div>

      {/* Copy Right */}
      <div className="border-t border-fourth mx-[4vw] pt-3 pb-10 ">
        <p className="text-fourth text-[15px] text-center">All rights reserved Copyright &copy;2025 Designed By Hemmaz,Mansouri</p>
      </div>
    </footer>
  );
};

export default Footer;
