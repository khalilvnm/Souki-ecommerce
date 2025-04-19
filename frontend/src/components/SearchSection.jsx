import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import ProductItem from './ProductItem';

const SearchSection = ({ searchValue }) => {
  const { allProducts } = useContext(AppContext);
  const [productsSearch, setProductsSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get Products Search
  const getProductsSearch = () => {
    let productsData = allProducts.slice();
    if (searchValue) {
      // Only show products where the title exactly matches the search value
      productsData = productsData.filter((product) => 
        product.title.toLowerCase() === searchValue.toLowerCase()
      );
    }
    setProductsSearch(productsData);
    setIsLoading(false);
  };

  useEffect(() => {
    if (allProducts.length > 0) {
      getProductsSearch();
    }
  }, [searchValue, allProducts]);

  if (isLoading) {
    return (
      <div className='search-section absolute py-10 px-10 bg-black top-[100%] left-0 z-[2000] w-full h-[600px] flex items-center justify-center'>
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className='search-section absolute py-10 overflow-y-scroll px-10 bg-white top-[100%] left-0 z-[2000] w-full h-[600px]'>
      <div className='grid grid-cols-auto gap-x-5 gap-y-10 '>
        {productsSearch.map((product, index) => (
          <ProductItem 
            key={index} 
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
    </div>
  );
};

export default SearchSection;
