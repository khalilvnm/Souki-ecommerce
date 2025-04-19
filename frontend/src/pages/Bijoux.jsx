import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import ProductItem from '../components/ProductItem';

const Bijoux = () => {
  const { allProducts, getAllProducts } = useContext(AppContext);
  const [bijouxProducts, setBijouxProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      // Ensure products are loaded
      if (allProducts.length === 0) {
        await getAllProducts();
      }
      
      // Filter products where type exactly matches "bijoux"
      const filtered = allProducts.filter(
        product => product.type?.toLowerCase() === "bijoux"
      );
      
      setBijouxProducts(filtered);
    };

    loadProducts();
  }, [allProducts, getAllProducts]);

  return (
    <div className="py-10 px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <p className='text-xl font-semibold mb-5 ml-1'>Bijoux Products</p>
        
        {bijouxProducts.length === 0 ? (
          <div className='text-center py-10 text-gray-500'>
            No bijoux products found. 
          </div>
        ) : (
          <div className='grid grid-cols-auto gap-x-5 gap-y-10'>
            {bijouxProducts.map((product) => (
              <ProductItem 
                key={product._id}
                id={product._id} 
                title={product.title} 
                description={product.description} 
                price={product.price} 
                discount={product.discount} 
                images={product.images}
                userName={product.userId?.username}
              />
            ))}
          </div>
        )}
      </div>
  );
};

export default Bijoux;