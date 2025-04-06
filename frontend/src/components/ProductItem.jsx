import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FaStar } from "react-icons/fa";


const ProductItem = ({ id, description, images, price, discount}) => {
  const { calculateProductDiscount, currency, addAndRemoveWishList, wishlistItems } = useContext(AppContext);

  return (
    <div className="bg-white block border p-3 border-gray-200 rounded-xl shadow-lg cursor-pointer transition-all duration-300">
      <div className="relative">
        <div onClick={() => { addAndRemoveWishList(id); }}
          className={`absolute flex items-center justify-center w-6 h-6 cursor-pointer top-[-5px] right-[-5px] ${wishlistItems.includes(id) ? "text-red-700" : "text-gray-700"}`}> <FaStar /> </div>
        <img src={images[0]} alt="product-image" className="h-[180px] mx-auto" />
        <hr className="border-none h-[1px] w-full bg-gray-300 my-3" />
        <div>
          <p className="text-nowrap text-ellipsis overflow-hidden text-sm">{description}</p>
          <div>
            <span className="text-red-700 font-semibold mr-3">{discount} Off</span><span className="font-semibold">{currency}{calculateProductDiscount(price, discount)}</span>
            <p className="line-through text-gray-600 font-semibold">{currency}{price}</p>
          </div>
        </div>
        <Link to={`/single-product/${id}`} onClick={() => { scrollTo(0, 0); }} className="bg-black text-center text-white rounded-full block w-full text-[15px] border border-gray-300 mt-3 py-1 px-3">Quick Look</Link>
      </div>
    </div>
  );
};

export default ProductItem;
