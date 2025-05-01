import { FaHandHoldingHeart, FaUsers } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa6";
import logo from '../assets/logo2.png';

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* En-tête */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold drop-shadow-lg font-inter text-third mb-4">À propos de nous</h1>
        <p className="text-second font-inter text-lg">
          Découvrez l'artisanat d'exception, où tradition et savoir-faire moderne se rencontrent.
        </p>
      </div>

      {/* Notre histoire */}
      <div className="bg-primary p-8 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-8">
        <img
          src={logo}
          alt="Logo de la plateforme d'artisanat"
          className="rounded-lg pl-3 pr-4 bg-second drop-shadow-lg w-40 md:w-1/3"
        />
        <div>
          <h2 className="text-4xl font-extrabold drop-shadow-lg text-third font-inter mb-4 text-center">Notre histoire</h2>
          <p className="text-xl text-fifth font-inter font-bold leading-relaxed">
            Nous sommes nés d'une passion pour la beauté de l'artisanat, en mêlant techniques traditionnelles et créations contemporaines.
            Chaque pièce raconte une histoire unique, façonnée avec soin par des artisans qui mettent tout leur cœur dans leur travail.
          </p>
        </div>
      </div>

      {/* Vision et mission */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 bg-primary drop-shadow-lg rounded-xl text-center transform hover:scale-105 transition-all duration-300">
          <h2 className="text-3xl font-bold drop-shadow-lg text-third mb-3">Notre vision</h2>
          <p className="text-fifth font-inter font-semibold">
            Devenir la plateforme de référence pour les produits artisanaux, en valorisant les artisans et en préservant le patrimoine culturel.
          </p>
        </div>
        <div className="p-6 bg-primary shadow-md rounded-xl text-center transform hover:scale-105 transition-all duration-300">
          <h2 className="text-3xl font-bold drop-shadow-lg text-third mb-3">Notre mission</h2>
          <p className="text-fifth font-inter font-semibold">
            Offrir des produits faits main de qualité tout en garantissant un commerce équitable, durable et éthique.
          </p>
        </div>
      </div>

      {/* Pourquoi nous choisir ? */}
      <div className="mt-16">
        <h2 className="text-3xl font-extrabold text-third text-center font-inter drop-shadow-lg mb-6">Pourquoi nous choisir ?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="p-5 bg-primary rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
            <FaHandHoldingHeart className="text-third text-5xl mx-auto mb-2" />
            <h3 className="text-xl font-bold font-inter text-third mb-2 drop-shadow-lg">Créations uniques</h3>
            <p className="text-fifth font-inter font-semibold">Chaque produit est une œuvre d'art, fabriquée à la main avec amour et précision.</p>
          </div>
          <div className="p-5 bg-primary rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
            <FaUsers className="text-third text-5xl mx-auto mb-2" />
            <h3 className="text-xl font-bold font-inter text-third mb-2 drop-shadow-lg">Soutien aux artisans</h3>
            <p className="text-fifth font-inter font-semibold">Nous donnons aux artisans locaux une visibilité mondiale.</p>
          </div>
          <div className="p-5 bg-primary rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
            <FaHandshake className="text-third text-5xl mx-auto mb-2 " />
            <h3 className="text-xl font-bold font-inter text-third mb-2 drop-shadow-lg">Commerce équitable</h3>
            <p className="text-fifth font-inter font-semibold">Nous garantissons une rémunération juste et des conditions éthiques pour chaque artisan.</p>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-extrabold font-inter text-third text-center drop-shadow-lg">Contactez-nous</h2>
        <p className="text-second font-inter font-semibold mt-2">
          Pour toute demande, écrivez-nous à <span className="text-third font-bold">Souki@artisanal.com</span>
        </p>
        <button className="mt-4 bg-brown-700 text-white px-6 py-2 rounded-xl hover:bg-brown-800 transition">
          Nous contacter
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
