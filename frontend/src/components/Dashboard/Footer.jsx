import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='px-[3vw] h-[60px] bg-second border-t border-gray-200 flex items-center justify-between'>

      {/* Logo */}
      <div className="flex text-2xl font-semibold items-center gap-1 text-gray-700">
        <p>Sou<span className="text-primary">k</span>i</p>
      </div>

      {/* Copy Right */}
      <p className="text-white text-xs">All rights reserved Copyright &copy;2025 Designed By Mostafa Yassin.</p>

      {/* Social Media */}
      <div className="flex items-center justify-left text-gray-800 gap-3 text-2xl">
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook className="border border-gray-800 text-gray-800   rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" /></a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">  
        <FaInstagram className="border border-gray-800  text-gray-800  rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" />
      </a>
      <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
        <FaXTwitter className="border border-gray-800 text-gray-800  rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" />
      </a>
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">  
        <FaLinkedinIn className="border border-gray-800 text-gray-800  rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" />
      </a>
      </div>
    </div>
  );
};

export default Footer;
