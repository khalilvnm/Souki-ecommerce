import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import ProductItem from '../components/ProductItem';

const Fashion = () => {
  const { allProducts } = useContext(AppContext);
  const [filterProducts, setFilterProducts] = useState([]);

  // جلب جميع المنتجات من نوع "fashion"
  useEffect(() => {
    setFilterProducts(allProducts.filter((product) => product.type === "fashion"));
  }, [allProducts]);

  return (
    <div className='py-10 flex flex-col px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <p className='text-xl font-semibold mb-5 ml-1'>Fashion Products</p>
      <div className='grid grid-cols-auto gap-x-5 gap-y-10'>
        {filterProducts.map((product, index) => (
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
  );
};

export default Fashion;
