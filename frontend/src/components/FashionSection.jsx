import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './../context/AppContext';
import { productResponsive } from './../assets/assets';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductItem from './ProductItem';

const FashionSection = () => {
  const { allProducts } = useContext(AppContext);
  const [fashionProducts, setFashionProducts] = useState([]);

  useEffect(() => {
    const productsData = allProducts.filter((product) => product.type === "Fashion");
    setFashionProducts(productsData);
  }, [allProducts]);

  return (
    <div className='py-10'>
      <p className='mb-3 text-3xl font-semibold text-gray-800'>Fashion</p>
      <hr className='border-none h-[1px] w-full bg-gray-300 mb-10' />

      {/* عرض جميع منتجات الفاشن */}
      <div>
        <p className='mb-3 text-xl font-semibold text-gray-800'>Fashion Products</p>
        <Carousel responsive={productResponsive}>
          {
            fashionProducts.map((product, index) => (
              <div className='mr-3' key={index}>
                <ProductItem 
                  id={product._id} 
                  title={product.title} 
                  description={product.description} 
                  price={product.price} 
                  discount={product.discount} 
                  images={product.images} 
                  type={product.type} 
                  category={product.category} 
                />
              </div>
            ))
          }
        </Carousel>
      </div>
    </div>
  );
};

export default FashionSection;
