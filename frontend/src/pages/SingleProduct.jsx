import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import RelatedProducts from '../components/RelatedProducts';
import axios from 'axios';
import 'react-multi-carousel/lib/styles.css';
import LoadingPage from './LoadingPage/LoadingPage';

const SingleProduct = () => {
  const { allProducts, currency, calculateProductDiscount,
    addToCartItemsVetement, addToCartItems, addAndRemoveWishList, wishlistItems, backend_url } = useContext(AppContext);
  const { productId } = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  // Collect Product Data
  const [productSize, setProductSize] = useState("");

  // Get Single Product
  const getSingleProduct = async () => {
    try {
      const response = await axios.post(backend_url + "/api/product/single-product", { productId: productId });
      if (response.data.success) {
        setSingleProduct(response.data.product);
        setMainImage(response.data.product.images[0]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };


  useEffect(() => {
    getSingleProduct();
  }, [allProducts, productId]);

  return (
    <div className='relative py-16 min-h-[70vh] px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      {
        singleProduct
          ?
          <>
            <div className='flex flex-col sm:flex-row items-start gap-10 sm:gap-20'>
              {/* Left Side */}
              <div className='w-full sm:w-[35%] flex items-start gap-5'>
                {/* Multi Images*/}
                  <div className='flex flex-col gap-2 w-[15%] sm:h-[500px]'>
                  {
                    singleProduct.images.map((image, index) => (
                      <div className='flex items-end justify-center' key={index}>
                        <img src={image} alt='product-image' key={index} className='max-h-[100%] max-w-[100%] cursor-pointer' onClick={() => { setMainImage(image); }} />
                      </div>
                    ))
                  }
                </div>

                {/* Main Image */}
                <div className='w-full max-h-[500px] flex justify-center'>
                  <img src={mainImage} alt='product-image' className='' />
                </div>
              </div>
              {/* Right Side */}
              <div className='w-full sm:w-[50%]'>
                <p className='text-xl text-gray-800 mb-2 font-semibold'>{singleProduct.title}</p>
                <p className='text-gray-600 w-[70%] font-medium'>{singleProduct.description}</p>
                {/* Price */}
                <div>
                  <div className='flex  items-center gap-2 font-semibold'>
                    <p className='text-red-700'>-{singleProduct.discount} Off</p>
                    <p className='text-2xl text-gray-700'>{currency}{calculateProductDiscount(singleProduct.price, singleProduct.discount)}</p>
                  </div>
                  <p className='text-xl text-gray-600 line-through'>{currency}{singleProduct.price}</p>
                </div>
                <hr className='border-none h-[1px] w-full bg-gray-200 my-4' />
                {/* Type  color  */}
                <div className='flex flex-col gap-1 text-gray-600 font-medium'>
                  <p className='capitalize'><span className='text-gray-900 capitalize'>Type:</span> {singleProduct.type}</p>                  {singleProduct.subCategory && <p className='capitalize'><span className='text-gray-900 capitalize'>SubCategory:</span> {singleProduct.subCategory}</p>}
                  <p className='capitalize'><span className='text-gray-900 capitalize'>Color:</span> {singleProduct.color}</p>
                </div>
                {/* If This Product Is Vetement We Shoud Add Sizes */}
                {
                  singleProduct.type === "vetement" ?
                    <div className='flex items-center gap-2 my-5'>
                      {
                        singleProduct.sizes.map((size, index) => (
                          <p key={index} className={`index  border border-gray-300 rounded-md py-2 px-3 cursor-pointer ${productSize === size ? "bg-black text-white" : ""}`} onClick={() => { setProductSize(size); }}>{size}</p>
                        ))
                      }
                    </div>
                    : null
                }
                {/* Add To Cart & Add To Wishlist */}
                <div className='flex flex-col gap-3 mt-5'>
                  <button onClick={() => {
                    if (singleProduct.type === "vetement") {
                      if (productSize) {
                        addToCartItemsVetement(singleProduct._id, productSize);
                      } else {
                        toast.info("Please Select Your Product Size.");
                      }
                    } else {
                      addToCartItems(singleProduct._id);
                    }
                  }} className='h-[42px] py-1.5 px-7 border border-gray-100 text-[15px] font-medium bg-black rounded-md text-white w-[180px] transition-all duration-300 hover:bg-[#454545]'>Add To Cart</button>
                  {
                    wishlistItems.includes(singleProduct._id)
                      ?
                      <button onClick={() => { addAndRemoveWishList(singleProduct._id); }} className='h-[42px] py-1.5 px-2 border border-gray-100 text-red-700 text-sm font-medium bg-gray-300 w-[180px] rounded-md transition-all duration-300 hover:bg-[#aaa]'>Remove From WishList</button>
                      :
                      <button onClick={() => { addAndRemoveWishList(singleProduct._id); }} className='h-[42px] py-1.5 px-7 border border-gray-100 text-[15px] font-medium bg-gray-300 w-[180px] rounded-md transition-all duration-300 hover:bg-[#aaa]'>Add To WishList</button>
                  }
                </div>
              </div>
            </div>
            {/* Related Products */}
            <RelatedProducts type={singleProduct.type} singleProduct={singleProduct} />
          </>
          : <LoadingPage />
      }
    </div>
  );
};

export default SingleProduct;
