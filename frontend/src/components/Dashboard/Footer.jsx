import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='px-[3vw] flex-col sm:flex-row h-auto sm:h-[60px] bg-second border-t border-fourth flex items-center sm:justify-between gap-3 sm:gap-0 py-3 sm:py-0'>
      {/* Logo */}
      <div className="flex items-center text-fourth font-playfair font-bold text-[40px] leading-none drop-shadow-lg">
      SOU<span className="text-primary">K</span>I
      </div>
      {/* Copy Right */}
      <p className="text-fourth text-[15px] text-center">All rights reserved Copyright &copy;2025 Designed By Hemmaz,Mansouri</p>

      {/* Social Media */}
      <div className="flex items-center justify-left gap-3 text-4xl">
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook className="border border-fourth text-fourth hover:border-third hover:text-third rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" /></a>
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
  );
};

export default Footer;
