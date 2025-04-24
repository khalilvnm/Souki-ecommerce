import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";

const ShopProductItem = ({ id, title, images, price, discount, userName }) => {
  const { calculateProductDiscount, currency, addToCartItems, cartItems, removeToCartItems } = useContext(AppContext);
  const [inCart, setInCart] = useState(false);
  
  useEffect(() => {
    setInCart(!!cartItems[id]); // true if exists
  }, [cartItems, id]);

  const toggleCart = () => {
    if (inCart) {
      removeToCartItems(id);
    } else {
      addToCartItems(id);
    }
  };

  return (
    <div className="bg-white flex border p-4 border-gray-200 rounded-xl shadow-lg transition-all duration-300">
      {/* Left side - Image */}
      <div className="w-[200px] flex-shrink-0 relative">
        <img src={images[0]} alt="product-image" className="h-[180px] w-[180px] object-contain" />
      </div>

      {/* Right side - Product Details */}
      <div className="flex-1 flex flex-col justify-between ml-6">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              <p className="text-sm text-gray-500 mt-1">Vendu par : {userName}</p>
            </div>
            <button
              onClick={toggleCart}
              className="p-2 rounded-full transition-all"
              title={inCart ? "Remove from cart" : "Add to cart"}
            >
              <FaShoppingCart
                size={20}
                className={`transition-colors duration-300 ${
                  inCart ? "text-red-600" : "text-primary hover:text-green-500"
                }`}
              />
            </button>
          </div>

          <div className="mt-4">
            {discount > 0 ? (
              <div className="flex items-center gap-3">
                <span className="text-red-700 font-semibold">{discount}% Off</span>
                <span className="text-xl font-semibold">
                  {calculateProductDiscount(price, discount)}{currency}
                </span>
                <span className="line-through text-gray-500">
                  {price}{currency}
                </span>
              </div>
            ) : (
              <span className="text-xl font-semibold">{price}{currency}</span>
            )}
          </div>
        </div>

        <Link 
          to={`/single-product/${id}`} 
          onClick={() => { scrollTo(0, 0); }} 
          className="bg-black text-center text-white rounded-full w-[150px] text-[15px] border border-gray-300 mt-4 py-2 px-4 hover:bg-gray-800 transition-colors"
        >
          Voir le produit
        </Link>
      </div>
    </div>
  );
};

export default ShopProductItem; 