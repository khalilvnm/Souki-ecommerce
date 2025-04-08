import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";

const ProductItem = ({ id, title, images, price, discount }) => {
  const { calculateProductDiscount, currency, addToCartItems,cartItems , removeToCartItems} = useContext(AppContext);
  const [inCart, setInCart] = useState(false);
    // Check if product is already in cart
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
    <div className="bg-white block border p-3 border-gray-200 rounded-xl shadow-lg cursor-pointer transition-all duration-300">
      <div className="relative">
      {/* <div 
        onClick={() => {
          addToCartItems(id);
          setAddedToCart(true);
        }}
        className={`absolute flex items-center justify-center w-8 h-8 rounded-full cursor-pointer top-[-8px] right-[-8px]
          transition-all duration-300 border 
          ${addedToCart 
            ? "bg-black text-white border-black" 
            : "bg-transparent text-gray-500 border-gray-300 hover:bg-gray-100"
          }`}
        title="Ajouter au panier"
      >
        <FaShoppingCart size={14} />
      </div> */}
    <button
      onClick={toggleCart}
      className="absolute top-[-8px] right-[-8px] p-1 rounded-full transition-all"
      title={inCart ? "Remove from cart" : "Add to cart"}
    >
      <FaShoppingCart
        size={18}
        className={`transition-colors duration-300 ${
          inCart ? "text-red-600" : "text-primary hover:text-green-500"
        }`}
      />
    </button>


        <img src={images[0]} alt="product-image" className="h-[180px] mx-auto" />
        <hr className="border-none h-[1px] w-full bg-gray-300 my-3" />
        <div>
          <p className="text-nowrap text-ellipsis overflow-hidden text-sm">{title}</p>
          <div>
            {discount > 0 ? (
              <>
                <span className="text-red-700 font-semibold mr-3">{discount}% Off</span>
                <span className="font-semibold">
                  {calculateProductDiscount(price, discount)}{currency}
                </span>
                <p className="line-through text-gray-600 font-semibold">
                  {price}{currency}
                </p>
              </>
            ) : (
              <span className="font-semibold">{price}{currency}</span>
            )}
          </div>
        </div>
        <Link 
          to={`/single-product/${id}`} 
          onClick={() => { scrollTo(0, 0); }} 
          className="bg-black text-center text-white rounded-full block w-full text-[15px] border border-gray-300 mt-3 py-1 px-3"
        >
          Quick Look
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
