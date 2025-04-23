import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleList } from "react-icons/ci";
import { LiaUsersSolid } from "react-icons/lia";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaEnvelope } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { AppContext } from '../../context/AppContext';
import axios from 'axios';

const SideBar = () => {
  const { orderMessage, backend_url, token } = useContext(AppContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        // Get user details
        const response = await axios.post(
          backend_url + "/api/users/user",
          {},
          {
            headers: { authorization: "Bearer " + token },
          }
        );

        if (response.data.success) {
          setIsSeller(response.data.user.isSeller);
          
          // Check if admin
          if (orderMessage === "Admin") {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.error('Error checking user role:', error);
      }
    };

    checkUserRole();
  }, [backend_url, token, orderMessage]);

  return (
    <div className='sidebar h-full py-3 bg-white border-r border-gray-200'>
      <div className='links flex flex-col'>
        <NavLink to={"/dashboard"} className="flex items-center gap-3 py-3 border-b border-gray-300 px-[3vw] w-full" end={"/dashboard"}>
          <IoHomeOutline className="text-2xl text-gray-800 md:text-[22px]" />
          <p className="text-[15px] text-gray-700 font-medium hidden md:block">Tableau de bord</p>
        </NavLink>

        {(isAdmin || isSeller) && (
          <>
            <NavLink to={"/dashboard/add-product"} className="flex items-center gap-3 py-3 border-b border-gray-300 px-[3vw] w-full">
              <IoIosAddCircleOutline className="text-2xl text-gray-800 md:text-[22px]" />
              <p className="text-[15px] text-gray-700 font-medium hidden md:block">Ajouter Produit</p>
            </NavLink>

            <NavLink to={"/dashboard/products-list"} className="flex items-center gap-3 py-3 border-b border-gray-300 px-[3vw] w-full">
              <CiCircleList className="text-2xl text-gray-800 md:text-[22px]" />
              <p className="text-[15px] text-gray-700 font-medium hidden md:block">Liste des produits</p>
            </NavLink>

            <NavLink to={"/dashboard/orders"} className="flex items-center gap-3 py-3 w-full border-b border-gray-300 px-[3vw]">
              <IoCheckmarkCircleOutline className="text-2xl text-gray-800 md:text-[22px]" />
              <p className="text-[15px] text-gray-700 font-medium hidden md:block">Commandes</p>
            </NavLink>
          </>
        )}

        {isAdmin && (
          <>
            <NavLink to={"/dashboard/users"} className="flex items-center gap-3 py-3 w-full border-b border-gray-300 px-[3vw]">
              <LiaUsersSolid className="text-2xl text-gray-800 md:text-[22px]" />
              <p className="text-[15px] text-gray-700 font-medium hidden md:block">Utilisateurs</p>
            </NavLink>

            <NavLink to={"/dashboard/seller-applications"} className="flex items-center gap-3 py-3 w-full border-b border-gray-300 px-[3vw]">
              <FaStore className="text-2xl text-gray-800 md:text-[22px]" />
              <p className="text-[15px] text-gray-700 font-medium hidden md:block">Demandes de vendeur</p>
            </NavLink>

            <NavLink to={"/dashboard/messages"} className="flex items-center gap-3 py-3 w-full border-b border-gray-300 px-[3vw]">
              <FaEnvelope className="text-2xl text-gray-800 md:text-[22px]" />
              <p className="text-[15px] text-gray-700 font-medium hidden md:block">Messages</p>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default SideBar;
