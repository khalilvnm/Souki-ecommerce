import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './../context/AppContext';
import { productResponsive } from '../assets/assets';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductItem from './ProductItem';

const VideoGameSection = () => {
  const { allProducts } = useContext(AppContext);
  const [videoGamesProducts, setVideoGamesProducts] = useState([]);

  useEffect(() => {
    const productData = allProducts.filter((product) => product.type === "Video games");
    setVideoGamesProducts(productData);
  }, [allProducts]);

  return (
    <div className='py-10'>
      <p className='mb-3 text-3xl font-semibold text-gray-800'>Video Games</p>
      <hr className='border-none h-[1px] w-full bg-gray-300 mb-10' />

      {/* عرض جميع المنتجات */}
      <div>
        <p className='mb-3 text-xl font-semibold text-gray-800'>Video Games</p>
        <Carousel responsive={productResponsive}>
          {
            videoGamesProducts.map((product, index) => (
              <div className='mr-3' key={index}>
                <ProductItem id={product._id} title={product.title} description={product.description} price={product.price} discount={product.discount} images={product.images} />
              </div>
            ))
          }
        </Carousel>
      </div>
    </div>
  );
};

export default VideoGameSection;
