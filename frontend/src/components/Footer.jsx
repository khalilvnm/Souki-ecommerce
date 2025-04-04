
import { NavLink } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-second px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="flex flex-col sm:flex-row items-start gap-5 pt-16 pb-10">
        {/* Left Side */}
        <div className="w-full sm:w-[40%] ">
          <p className="text-3xl flex items-center gap-1 font-semibold text-gray-200 mb-5">Sou<span className="text-primary">k</span>i</p>
          <p className="text-gray-300 text-sm w-[80%]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
        </div>
        {/* Right Side */}
        <div className="w-full sm:w-[30%] flex sm:justify-center">
          <div>
            <p className="text-xl font-semibold text-gray-200 mb-5">Company</p>
            <ul className="flex flex-col gap-2">
              <NavLink to={"/"} className="text-gray-300 transition-all duration-300 hover:underline">Home</NavLink>
              <NavLink to={"/fashion"} className="text-gray-300 transition-all duration-300 hover:underline">Fashion</NavLink>
              <NavLink to={"/electronics"} className="text-gray-300 transition-all duration-300 hover:underline">Electronics</NavLink>
              <NavLink to={"/video-games"} className="text-gray-300 transition-all duration-300 hover:underline">Video Games</NavLink>
              <NavLink to={"/perfumes"} className="text-gray-300 transition-all duration-300 hover:underline">Perfumes</NavLink>
              <NavLink to={"/contact-us"} className="text-gray-300 transition-all duration-300 hover:underline">Contact Us</NavLink>
            </ul>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full sm:w-[30%] flex sm:justify-center">
          <div>
            <p className="text-xl font-semibold text-gray-200 mb-5">Get In Touch</p>
            <div className="text-gray-300 text-sm mb-5">
              <p>+213-558-981-691</p>
              <p>hemmaz.djilalikhalil@gmail.com</p>
            </div>
            <div className="flex items-center justify-left text-gray-300 gap-3 text-4xl">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="border border-gray-300 text-gray-300   rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" />
              </a>
              
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="border border-gray-300 text-gray-300 rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" />
              </a>
              <FaXTwitter className="border border-gray-300 text-gray-300  rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" />
              <FaLinkedinIn className="border border-gray-300 text-gray-300  rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" />
            </div>
          </div>
        </div>
      </div>

      {/* Copy Right */}
      <div className="border-t border-gray-600 py-3 text-center">
        <p className="text-gray-300 text-[15px]">All rights reserved Copyright &copy;2025 Designed By Mostafa Yassin</p>
      </div>
    </footer>
  );
};

export default Footer;
