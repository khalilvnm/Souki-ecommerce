import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import ProductItem from './ProductItem';

const SearchSection = ({ searchValue }) => {
  const { allProducts } = useContext(AppContext);
  const [productsSearch, setProductsSearch] = useState([]);

  // Get Products Search
  const getProductsSearch = () => {
    let productsData = allProducts.slice();
    if (searchValue) {
      productsData = productsData.filter((product) => product.title.toLowerCase().includes(searchValue.toLowerCase()));
    }
    if (searchValue) {
      productsData = productsData.filter((product) => product.type.toLowerCase().includes(searchValue.toLowerCase()));

    }
    setProductsSearch(productsData);
  };

  useEffect(() => {
    getProductsSearch();
  }, [searchValue]);

  console.log(productsSearch);
  return (
    <div className='search-section absolute py-10 overflow-y-scroll px-10 bg-white top-[100%] left-0 z-[2000] w-full h-[600px]'>
      <div className='grid grid-cols-auto gap-x-5 gap-y-10 '>
        {
          productsSearch.map((product, index) => (
            <ProductItem key={index} id={product._id} title={product.title} description={product.description} price={product.price} discount={product.discount} images={product.images} />
          ))
        }
      </div>
    </div>
  );
};

export default SearchSection;
