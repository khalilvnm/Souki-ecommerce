import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FaShoppingCart } from "react-icons/fa";

const ShopProductItem = ({ id, title, images, price, discount, userName }) => {
  const { calculateProductDiscount, currency, addToCartItems, cartItems, removeToCartItems } = useContext(AppContext);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setInCart(!!cartItems[id]);
  }, [cartItems, id]);

  const toggleCart = () => {
    inCart ? removeToCartItems(id) : addToCartItems(id);
  };

  return (
    <div className="bg-primary rounded-2xl mb-2 hover:shadow-lg transition-all duration-300 flex flex-col h-full drop-shadow-lg justify-between min-h-[350px]">
      
      {/* Image */}
      <div className="relative">
        <img src={images[0]} alt="product" className="w-full h-[150px] sm:h-[200px] object-cover rounded-t-2xl" />
      </div>

      {/* Product Info */}
      <div className="p-3 flex flex-col justify-between flex-grow">
        <h3 className="text-base sm:text-lg text-[#101415] drop-shadow-lg font-bold font-inter truncate mb-1">{title}</h3>
        <p className="text-xs sm:text-sm font-inter text-fifth mb-2">
          Vendu par : <span className="font-semibold text-third drop-shadow-lg">{userName}</span>
        </p>

        {discount > 0 ? (
          <>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-red-600 font-semibold font-inter text-sm sm:text-base">-{discount}%</span>
            <span className="line-through text-second text-xs sm:text-sm">{price}{currency}</span>
          </div>
            <span className="font-bold text-third font-inter block text-sm sm:text-base">{calculateProductDiscount(price, discount)}{currency}</span>
          </>
        ) : (
          <>
          <div className="flex items-center gap-2 mb-2 h-[20px]">
          </div>
          <span className="font-bold text-third font-inter block text-sm sm:text-base">
            {price}{currency}
          </span>
        </>
        )}

        {/* See Product buttons */}
        <div className="flex justify-between items-center mt-auto pt-3">
          <Link
            to={`/single-product/${id}`}
            onClick={() => scrollTo(0, 0)}
            className="text-center bg-third text-primary text-xs sm:text-sm font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-full hover:bg-second transition drop-shadow-lg"
          >
            Voir le produit
          </Link>

          <button className="absolute top-2 right-2 bg-fifth p-1.5 sm:p-2 rounded-full shadow-sm hover:shadow transition"
          onClick={toggleCart} title={inCart ? "Retirer du panier" : "Ajouter au panier"}>
            <FaShoppingCart
              size={18}
              className={`transition-colors duration-300 ${inCart ? "text-red-600" : "text-second hover:text-third"}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopProductItem;
