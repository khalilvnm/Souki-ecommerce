import React, { useContext, useEffect, useState } from 'react';
import { productResponsive } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductItem from '../components/ProductItem';

const Accessoire = () => {
  const { allProducts, getAllProducts } = useContext(AppContext);
  const [accessoireProducts, setAccessoireProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Ensure products are loaded
        if (allProducts.length === 0) {
          await getAllProducts();
        }

        // Filter products where type exactly matches "accessoire"
        const filtered = allProducts.filter(
          product => product.type?.toLowerCase() === "accessoire"
        );
        
        setAccessoireProducts(filtered);
      } catch (error) {
        console.error("Error loading accessoire products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [allProducts, getAllProducts]);

  return (
    <div className='py-10 flex flex-col px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <p className='text-xl font-semibold mb-5 ml-1'>Accessoire Products</p>
      {/* Show Accessoire Products */}
      <div>
        {loading ? (
          <div className="text-center py-10">Loading accessories...</div>
        ) : accessoireProducts.length === 0 ? (
          <div className='text-center py-10 text-gray-500'>
            No accessoire products found
          </div>
        ) : (
          <Carousel responsive={productResponsive}>
            {accessoireProducts.map((product) => (
              <div className='mr-3' key={product._id}>
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
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default Accessoire;