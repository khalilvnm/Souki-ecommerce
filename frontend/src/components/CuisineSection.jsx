import { useContext, useEffect, useState } from 'react';
import { productResponsive } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductItem from './ProductItem';

const CuisineSection = () => {
  const { allProducts } = useContext(AppContext);
  const [cuisineProducts, setcuisineProducts] = useState([]);

  useEffect(() => {
    //njibo les produits ta3 type cuisine brk
    setcuisineProducts(allProducts.filter((item) => item.type === "Cuisine"));
  }, [allProducts]);

  return (
    <div className='py-10'>
      <p className='text-[25px] font-semibold font-inter drop-shadow-lg text-third'>Cuisine</p>
      <hr className='border-none h-[2px] w-full bg-third mb-6' />

      {/* Shop cuisine Products */}
      <div>
        <Carousel responsive={productResponsive} className="z-0">
          {cuisineProducts.map((product, index) => (
            <div className='mr-3' key={index}>
              <ProductItem 
                id={product._id} 
                title={product.title} 
                description={product.description} 
                price={product.price} 
                discount={product.discount} 
                images={product.images} 
                type={product.type} 
                userName={product.userId?.username}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CuisineSection;
