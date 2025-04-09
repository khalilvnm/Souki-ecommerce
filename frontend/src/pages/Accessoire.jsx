import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import 'react-multi-carousel/lib/styles.css';
import ProductItem from '../components/ProductItem';

const Accessoire = () => {
  const { allProducts, getAllProducts } = useContext(AppContext);
  const [accessoireProducts, setAccessoireProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {

        // Ensure products are loaded
        if (allProducts.length === 0) {
          await getAllProducts();
        }

        // Filter products where type exactly matches "accessoire"
        const filtered = allProducts.filter(
          product => product.type?.toLowerCase() === "accessoire"
        );
        
        setAccessoireProducts(filtered);
      
    };

    loadProducts();
  }, [allProducts, getAllProducts]);

  return (
    <div className="py-10 px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <p className='text-xl font-semibold mb-5 ml-1'>Accessoire Products</p>
      
      {accessoireProducts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No accessoire products found
        </div>
      ) : (
        <div className="grid grid-cols-auto gap-5">
          {accessoireProducts.map((product) => (
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

export default Accessoire;