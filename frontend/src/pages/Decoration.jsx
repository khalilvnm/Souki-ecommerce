import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import ProductItem from '../components/ProductItem';

const Decoration = () => {
  const { allProducts, getAllProducts } = useContext(AppContext);
  const [decorationProducts, setDecorationProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      // Ensure products are loaded
      if (allProducts.length === 0) {
        await getAllProducts();
      }
      
      // Filter products where type exactly matches "decoration"
      const filtered = allProducts.filter(
        product => product.type?.toLowerCase() === "decoration"
      );
      
      setDecorationProducts(filtered);
    };

    loadProducts();
  }, [allProducts, getAllProducts]);

  return (
    <div className="py-10 px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <p className='text-xl font-semibold mb-5 ml-1'>Decorations Products</p>
        
        {decorationProducts.length === 0 ? (
          <div className='text-center py-10 text-gray-500'>
            No decoration products found. 
          </div>
        ) : (
          <div className='grid grid-cols-auto gap-x-5 gap-y-10'>
            {decorationProducts.map((product) => (
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

export default Decoration;