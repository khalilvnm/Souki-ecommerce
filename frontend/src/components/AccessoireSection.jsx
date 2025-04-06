import React, { useContext, useEffect, useState } from 'react';
import { productResponsive } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductItem from './ProductItem';

const AccessoireSection = () => {
  const { allProducts } = useContext(AppContext);
  const [accessoireProducts, setAccessoireProducts] = useState([]);

  useEffect(() => {
    const productsData = allProducts.filter((product) => product.type === "accessoire");
    setAccessoireProducts(productsData);
  }, [allProducts]);

  return (
    <div className='py-10'>
      <p className='mb-3 text-3xl font-semibold text-gray-800'>Accessoire</p>
      <hr className='border-none h-[1px] w-full bg-gray-300 mb-10' />

      {/* Show Accessoire Products */}
      <div>
        <p className='mb-3 text-xl font-semibold text-gray-800'>Accessoire Products</p>
        <Carousel responsive={productResponsive}>
          {
            accessoireProducts.map((product, index) => (
              <div className='mr-3' key={index}>
                <ProductItem id={product._id} title={product.title} description={product.description} price={product.price} discount={product.discount} images={product.images} type={product.type} category={product.category} />
              </div>
            ))
          }
        </Carousel>
      </div>
    </div>
  );
};

export default AccessoireSection;
