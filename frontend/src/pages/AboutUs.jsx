import { FaHandHoldingHeart, FaUsers, FaHandshake } from "react-icons/fa";
import logo from '../assets/LOGO.png';


const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold font-inter text-third mb-4">À propos de nous</h1>

        <p className="text-second font-inter text-lg">
        Découvrez l'artisanat d'exception, où tradition et savoir-faire moderne se rencontrent.
        </p>
      </div>

    {/* Our Story Section */}
<div className="bg-primary  p-8 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-8">
  <img
    src={logo}
    alt="Artisanat"
    className="rounded-lg pl-3 pr-4 bg-second drop-shadow-lg w-40 md:w-1/3 "
  />
 <div>
    <h2 className="text-4xl font-extrabold text-third font-inter mb-4 text-center">Notre histoire</h2>
    <p className="text-xl text-fifth font-inter font-bold leading-relaxed">
      Nous sommes nés d'une passion pour la beauté de l'artisanat, en mêlant techniques traditionnelles et créations contemporaines.
      Chaque pièce raconte une histoire unique, façonnée avec soin par des artisans qui mettent tout leur cœur dans leur travail.
    </p>
 </div>
</div>


      {/* Vision & Mission Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 bg-white shadow-md rounded-xl text-center">
          <h2 className="text-2xl font-semibold text-brown-700 mb-3">Our Vision</h2>
          <p className="text-gray-600">
            To become the leading platform for handcrafted goods, empowering artisans and preserving cultural heritage.
          </p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-xl text-center">
          <h2 className="text-2xl font-semibold text-brown-700 mb-3">Our Mission</h2>
          <p className="text-gray-600">
            Delivering premium handmade products while ensuring fair trade, sustainability, and exceptional craftsmanship.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-semibold text-brown-700 text-center mb-6">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-brown-100 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
            <FaHandHoldingHeart className="text-brown-700 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-brown-700">Unique Creations</h3>
            <p className="text-gray-600">Every product is a masterpiece, handcrafted with love and precision.</p>
          </div>
          <div className="p-6 bg-brown-100 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
            <FaUsers className="text-brown-700 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-brown-700">Supporting Artisans</h3>
            <p className="text-gray-600">We empower local artisans by providing a global platform.</p>
          </div>
          <div className="p-6 bg-brown-100 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
            <FaHandshake className="text-brown-700 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-brown-700">Fair Trade</h3>
            <p className="text-gray-600">We ensure ethical sourcing and fair wages for artisans.</p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-semibold text-brown-700">Get in Touch</h2>
        <p className="text-gray-600 mt-2">For inquiries, reach us at <span className="text-brown-700 font-semibold">Souki@artisanal.com</span></p>
      </div>
    </div>
  );
};

export default AboutUs;
