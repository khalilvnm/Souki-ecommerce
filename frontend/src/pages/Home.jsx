import React from 'react';
import Hero from '../components/Hero';
import CuisineSection from '../components/CuisineSection';
import VetementSection from '../components/VetementSection';
import AccessoireSection from '../components/AccessoireSection';
import DecorationSection from '../components/DecorationSection';



const Home = () => {
  return (
    <div className='py-10 px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw] '>
      <Hero />
      <DecorationSection />
      <CuisineSection />
      <VetementSection />
      <AccessoireSection />
    </div>
  );
};

export default Home;
