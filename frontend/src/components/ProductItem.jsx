import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FaShoppingCart } from "react-icons/fa";

const ProductItem = ({ id, title, images, price, discount, userName }) => {
  const {
    calculateProductDiscount,
    currency,
    addToCartItems,
    cartItems,
    removeToCartItems,
  } = useContext(AppContext);

  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setInCart(!!cartItems[id]);
  }, [cartItems, id]);

  const toggleCart = () => {
    if (inCart) {
      removeToCartItems(id);
    } else {
      addToCartItems(id);
    }
  };

  return (
    <div className="bg-primary rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between min-h-[400px]">
      <div className="relative">
        <button
          onClick={toggleCart}
          className="absolute top-2 right-2 bg-fifth p-2 rounded-full shadow-sm hover:shadow transition"
          title={inCart ? "Retirer du panier" : "Ajouter au panier"}
        >
          <FaShoppingCart
            size={18}
            className={`transition-colors duration-300 ${
              inCart ? "text-red-600" : "text-primary hover:text-third"
            }`}
          />
        </button>

        <img
          src={images[0]}
          alt={title}
          className="w-full h-[300px] object-cover rounded-t-2xl"
        />
      </div>

      <div className="p-3 flex flex-col justify-between flex-grow">
        <div>
          <p className="text-lg text-[#101415] drop-shadow-lg font-semibold font-inter truncate mb-1">{title}</p>
          {userName && (
            <p className="text-md font-inter text-fifth mb-2 ">Vendu par : <span className="font-semibold text-third drop-shadow-lg">{userName}</span></p>
          )}
          <div className="mb-2">
            <div className="min-h-[60px]">
            {discount > 0 ? (
              <>
  <div className="flex items-center gap-2 mb-1">
    <span className="text-red-600 font-semibold">
      {discount}% Off
    </span>
    <span className="line-through text-sm text-gray-400">
      {price}{currency}
    </span>
  </div>
  <span className="font-semibold text-black block">
    {calculateProductDiscount(price, discount)}{currency}
  </span>
</>

) : (
  <>
    <div className="flex items-center gap-2 mb-2 h-[20px]">
    </div>
    <span className="font-semibold text-black block">
      {price}{currency}
    </span>
  </>
)}

</div>
          </div>
        </div>

        <Link
          to={`/single-product/${id}`}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="mt-2 text-center bg-black text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-gray-800 transition"
        >
          Voir le produit
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
