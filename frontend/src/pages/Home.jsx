import React from 'react';
import Hero from '../components/Hero';
import CuisineSection from '../components/CuisineSection';
import VetementSection from '../components/VetementSection';
import AccessoireSection from '../components/AccessoireSection';
import DecorationSection from '../components/DecorationSection';



const Home = () => {
  return (
    <div className='w-full'>
    <Hero />
      <div className='py-[18px] px-[48px]'>
      <DecorationSection />
      <CuisineSection />
      <VetementSection />
      <AccessoireSection />
      </div>
    </div>
  );
};

export default Home;
