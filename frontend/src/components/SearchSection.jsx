import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const SearchSection = ({ searchValue }) => {
  const { allProducts } = useContext(AppContext);
  const [productsSearch, setProductsSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get Products Search
  const getProductsSearch = () => {
    let productsData = allProducts.slice();
    if (searchValue) {
      // Show products where the title contains the search value (case insensitive)
      productsData = productsData.filter((product) => 
        product.title.toLowerCase().startsWith(searchValue.toLowerCase())
      );
      // Limit to 8 suggestions
      productsData = productsData.slice(0, 8);
    } else {
      productsData = [];
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
      <div className='search-section absolute py-5 px-10 bg-white top-[100%] left-0 z-[2000] w-full shadow-lg'>
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  // If there's no search value, don't show the section
  if (!searchValue) {
    return null;
  }

  return (
    <div className='search-section absolute py-3 px-5 bg-white top-[100%] left-0 z-[2000] w-full shadow-lg border border-gray-200'>
      <div className='flex flex-col'>
        {productsSearch.length === 0 ? (
          <div className="text-sm text-gray-500 py-2">
            No products found matching "{searchValue}"
          </div>
        ) : (
          <>
            {productsSearch.map((product) => (
              <Link 
                key={product._id}
                to={`/single-product/${product._id}`}
                className="py-2 px-3 hover:bg-gray-100 transition-colors duration-150 rounded-md flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={product.images[0]} 
                    alt={product.title} 
                    className="w-10 h-10 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-gray-800">{product.title}</p>
                    <p className="text-sm text-gray-500">{product.price} DZD</p>
                  </div>
                </div>
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  View →
                </span>
              </Link>
            ))}
            {productsSearch.length > 0 && (
              <Link 
                to={`/shop?search=${searchValue}`}
                className="text-center text-sm text-primary hover:underline py-2 mt-2 border-t"
              >
                View all results
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchSection;
