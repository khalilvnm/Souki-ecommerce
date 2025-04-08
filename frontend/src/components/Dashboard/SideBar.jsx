import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleList } from "react-icons/ci";
import { LiaUsersSolid } from "react-icons/lia";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { AppContext } from '../../context/AppContext';

const SideBar = () => {
  const { orderMessage } = useContext(AppContext);

  return (
    <div className='sidebar h-full py-5 bg-white border-r border-gray-200'>
      <div className='links flex flex-col'>

        <NavLink to={"/dashboard"} className="flex items-center gap-4 py-3 border-b border-gray-300 px-[3vw]  w-full" end={"/dashboard"}>
          <IoHomeOutline className="text-2xl text-gray-800 md:text-[22px]" />
          <p className="text-[15px] text-gray-700 font-medium hidden md:block">DashBoard</p>
        </NavLink>

        <NavLink to={"/dashboard/add-product"} className="flex items-center gap-4 py-3 border-b border-gray-300 px-[3vw]  w-full">
          <IoIosAddCircleOutline className="text-2xl text-gray-800 md:text-[22px]" />
          <p className="text-[15px] text-gray-700 font-medium hidden md:block">Add Product</p>
        </NavLink>

        <NavLink to={"/dashboard/products-list"} className="flex items-center gap-4 py-3 border-b border-gray-300 px-[3vw]  w-full">
          <CiCircleList className="text-2xl text-gray-800 md:text-[22px]" />
          <p className="text-[15px] text-gray-700 font-medium hidden md:block">Products List</p>
        </NavLink>
        
        <NavLink to={"/dashboard/orders"} className="flex items-center gap-4 py-3 w-full border-b border-gray-300 px-[3vw]">
            <IoCheckmarkCircleOutline className="text-2xl text-gray-800 md:text-[22px]" />
            <p className="text-[15px] text-gray-700 font-medium hidden md:block">Orders</p>
          </NavLink>
        {
          orderMessage === "Admin" &&
          <NavLink to={"/dashboard/users"} className="flex items-center gap-4 py-3  w-full border-b border-gray-300 px-[3vw]">
          <LiaUsersSolid className="text-2xl text-gray-800 md:text-[22px]" />
          <p className="text-[15px] text-gray-700 font-medium hidden md:block">Users</p>
        </NavLink>
        }

      </div>
    </div>
  );
};

export default SideBar;
