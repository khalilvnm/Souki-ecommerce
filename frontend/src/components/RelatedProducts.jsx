import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import ProductItem from './ProductItem';

const RelatedProducts = ({ type, singleProduct }) => {
  const { allProducts } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  console.log(type);
  /* Get Related Products BasedOn Category */
  const getRelatedProducts = () => {
    let productsData = [];
    allProducts.map((product) => {
      if (product.type === type) {
        productsData.push(product);
      }
    });
    setProducts(productsData);
  };

  useEffect(() => {
    getRelatedProducts();
  }, [type, singleProduct]);

  return (
    <div className='py-10'>
      <p className=' text-[25px] font-semibold font-inter drop-shadow-lg text-third'>Produits Similaires </p>
      <hr className='border-none h-[2px] w-full bg-third mb-6' />

      {/* Show Products */}
      <div className='grid grid-cols-auto gap-8'>
        {
          products.slice(0, 4).map((product, index) => (
            <ProductItem key={index} id={product._id} title={product.title} description={product.description} images={product.images} price={product.price} discount={product.discount} />
          ))
        }
      </div>
    </div>
  );
};

export default RelatedProducts;
