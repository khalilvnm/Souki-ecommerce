import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import ProductItem from '../components/ProductItem';

const Electronics = () => {
  const { allProducts } = useContext(AppContext);
  const [filterEleProducts, setFilterEleProducts] = useState([]);

  useEffect(() => {
    // جلب جميع المنتجات التي تنتمي إلى الإلكترونيات فقط بدون تصنيفات فرعية
    const electronicsProducts = allProducts.filter((product) => product.type === "electronics");
    setFilterEleProducts(electronicsProducts);
  }, [allProducts]);

  return (
    <div className='my-10 flex-col sm:flex-row mx-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex gap-5 items-start'>
      {/* Right Side - عرض جميع المنتجات */}
      <div className='w-full'>
        <p className='text-xl font-semibold mb-5 ml-1'>Electronics Products</p>
        <div className='grid grid-cols-auto gap-x-5 gap-y-10'>
          {filterEleProducts.map((product, index) => (
            <ProductItem 
              key={index} 
              id={product._id} 
              title={product.title} 
              description={product.description} 
              price={product.price} 
              discount={product.discount} 
              images={product.images} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Electronics;
