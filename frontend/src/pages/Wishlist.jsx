import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { allProducts, wishlistItems, calculateProductDiscount, currency,
    addAndRemoveWishList } = useContext(AppContext);

  return (
    <>
      {
        wishlistItems.length > 0
          ?
          <div className='py-20 min-h-[70vh] px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
            <div className='grid grid-cols-auto gap-5'>
              {
                allProducts.map((product, index) => {
                  if (wishlistItems.includes(product._id)) {
                    return (
                      <div key={index} className="relative bg-white block border p-3 border-gray-200 rounded-xl shadow-lg">
                        <img src={product.images[0]} alt="product-image" className="h-[180px] mx-auto" />
                        <hr className="border-none h-[1px] w-full bg-gray-300 my-3" />
                        <div>
                          {/* <p className="text-[15px] text-nowrap text-ellipsis overflow-hidden font-medium text-gray-900">{title}</p> */}
                          <p className="text-nowrap text-ellipsis overflow-hidden text-sm">{product.description}</p>
                          <div>
                            <span className="text-red-700 font-semibold mr-3">-{product.discount} Off</span><span className="font-semibold">{currency}{calculateProductDiscount(product.price, product.discount)}</span>
                            <p className="line-through text-gray-600 font-semibold">{currency}{product.price}</p>
                          </div>
                        </div>
                        <Link to={`/single-product/${product._id}`} className="bg-black text-center text-white rounded-full block w-full text-[15px] border border-gray-300 mt-3 py-1 px-3">Quick Look</Link>
                        <p onClick={() => { addAndRemoveWishList(product._id); scrollTo(0, 0); }} className='absolute top-0 right-0 w-7 h-7 bg-gray-100 text-sm transition-all duration-300 hover:bg-red-800 cursor-pointer hover:text-white flex items-center justify-center rounded-full border border-gray-300 '>X</p>
                      </div>
                    );
                  }
                })
              }
            </div>
          </div>
          :
          <div className='py-20 min-h-[70vh] text-center'>
            <p className='text-3xl text-gray-800 font-semibold mb-5'>Your Wishlist Is Empty!</p>
            <Link to={"/"} className='w-fit bg-black text-white py-2 px-5 rounded-md'>Go To Shopping</Link>
          </div>
      }
    </>

  );
};

export default Wishlist;
