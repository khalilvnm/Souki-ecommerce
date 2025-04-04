import React from 'react';
import Navbar from '../../components/Dashboard/Navbar';
import Footer from '../../components/Dashboard/Footer';
import SideBar from '../../components/Dashboard/SideBar';
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="h-[100vh] max-h-[100vh]">
      <Navbar />

      <div className='flex items-start'>
        <div className='h-[calc(100vh-130px)] w-fit md:w-[280px]'>
          <SideBar />
        </div>

        <div className='h-[calc(100vh-130px)] overflow-y-scroll w-full'>
          <Outlet />
        </div>


      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
