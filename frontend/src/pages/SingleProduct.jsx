import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import RelatedProducts from '../components/RelatedProducts';
import axios from 'axios';
import 'react-multi-carousel/lib/styles.css';
import LoadingPage from './LoadingPage/LoadingPage';
import BackButton from '../components/BackButton';

const SingleProduct = () => {
  const { allProducts, currency, calculateProductDiscount,
    addToCartItems, backend_url } = useContext(AppContext);
  const { productId } = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

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
      
      <div className="absolute top-4 left-4 z-10">
        <BackButton />
      </div>

      {singleProduct ? (
        <>
          <div className='flex flex-col sm:flex-row items-start gap-10 sm:gap-20'>
            {/* Left Side */}
            <div className='w-full sm:w-[35%] flex items-start gap-5'>
              {/* Multi Images*/}
              <div className='flex flex-col gap-2 w-[15%] sm:h-[500px]'>
                {singleProduct.images.map((image, index) => (
                  <div className='flex items-end justify-center' key={index}>
                    <img 
                      src={image} 
                      alt='product-image' 
                      className='max-h-[100%] max-w-[100%] cursor-pointer' 
                      onClick={() => setMainImage(image)} 
                    />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className='w-full max-h-[500px] flex justify-center'>
                <img src={mainImage} alt='product-image' className='' />
              </div>
            </div>
            
            {/* Right Side */}
            <div className='w-full sm:w-[50%]'>
              <p className='text-3xl mb-2 font-inter font-bold text-third'>{singleProduct.title}</p>
              <p className=' w-[70%] font-medium font-inter text-second'>{singleProduct.description}</p>
              
              {/* Price Section */}
              <div> 
              <div className='mt-4 font-inter font-bold text-third'>Prix:</div>
                {singleProduct.discount > 0 ? (
                  <>
                    <div className='flex items-center gap-2 font-semibold'>
                      <p className='text-red-700 text-[25px]'>-{singleProduct.discount}%</p>
                      <p className='text-xl text-primary line-through'>
                      {singleProduct.price}{currency}
                      </p>
                      
                    </div>
                    <p className='text-[28px] font-inter font-bold text-second'>
                        {calculateProductDiscount(singleProduct.price, singleProduct.discount)}{currency}
                      </p>
                  </>
                ) : (
                  <p className='text-[28px] font-inter font-bold text-second'>
                    {singleProduct.price}{currency}
                  </p>
                )}
              </div>

              {/* Quantity Available */}
              <div className="mt-4">
                <p className="font-inter font-bold text-third">
                Quantité: <span className="text-second">{singleProduct.quantity}</span>
                </p>
              </div>

              <hr className='border-none h-[1px] w-full bg-gray-200 my-4' />
              
              {/* Product Details */}
              <div className='flex flex-col gap-1 text-primary font-semibold'>
                <p className='capitalize'>
                  <span className='font-inter font-bold text-third'>Categorie:</span> {singleProduct.type}
                </p>
                {/* {singleProduct.subCategory && (
                  <p className='capitalize'>
                    <span className='font-inter font-bold text-third'>SubCategory:</span> {singleProduct.subCategory}
                  </p>
                )} */}
                <p className='capitalize'>
                  <span className='font-inter font-bold text-third'>Vendu par:</span> {singleProduct.userId?.username || 'Unknown'}
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className='flex flex-col gap-3 mt-5'>
                <button 
                  onClick={() => addToCartItems(singleProduct._id)}
                  className='h-[42px] py-1.5 px-7 text-[15px] rounded-full  w-[180px] transition-all duration-300 mt-2 text-center bg-third text-fifth text-sm font-medium  hover:bg-second  drop-shadow-lg'
                >
                  Ajouter au Panier
                </button>
              </div>
            </div>
          </div>
          {/* Related Products */}
          <RelatedProducts type={singleProduct.type} singleProduct={singleProduct} />
        </>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
};

export default SingleProduct;