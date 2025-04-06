import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { productResponsive } from '../assets/assets';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductItem from './ProductItem';

const CuisineSection = () => {
  const { allProducts } = useContext(AppContext);
  const [cuisineProducts, setCuisineProducts] = useState([]);

  useEffect(() => {
    const productData = allProducts.filter((product) => product.type === "Cuisine");
    setCuisineProducts(productData);
  }, [allProducts]);

  return (
    <div className='py-10'>
      <p className='mb-3 text-3xl font-semibold text-gray-800'>Cuisine</p>
      <hr className='border-none h-[1px] w-full bg-gray-300 mb-10' />

      {/* عرض جميع المنتجات */}
      <div>
        <p className='mb-3 text-xl font-semibold text-gray-800'>Cuisine</p>
        <Carousel responsive={productResponsive}>
          {
            cuisineProducts.map((product, index) => (
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

export default CuisineSection;
