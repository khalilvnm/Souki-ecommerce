import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import ProductItem from "../components/ProductItem";

const Cuisine = () => {
  const { allProducts, getAllProducts } = useContext(AppContext);
  const [cuisineProducts, setCuisineProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      if (allProducts.length === 0) {
        await getAllProducts();
      }

      const filtered = allProducts.filter(product => 
        product.type?.toLowerCase() === "cuisine"
      );
      
      setCuisineProducts(filtered);
    };

    loadProducts();
  }, [allProducts, getAllProducts]);

  return (
    <div className="py-10 px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <p className='text-xl font-semibold mb-5 ml-1'>Cuisine Products</p>
      
      {cuisineProducts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No cuisine products found
        </div>
      ) : (
        <div className="grid grid-cols-auto gap-5">
          {cuisineProducts.map((product) => (
            <ProductItem 
              key={product._id}
              id={product._id} 
              title={product.title} 
              description={product.description} 
              price={product.price} 
              discount={product.discount} 
              images={product.images} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cuisine;