import { useContext, useEffect, useState } from 'react';
import { productResponsive } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductItem from './ProductItem';

const VetementSection = () => {
  const { allProducts } = useContext(AppContext);
  const [vetementProducts, setvetementProducts] = useState([]);

  useEffect(() => {
    //njibo les produits ta3 type vetemnt brk
    setvetementProducts(allProducts.filter((item) => item.type === "vetement"));
  }, [allProducts]);

  return (
    <div className='py-10'>
      <p className='mb-3 text-3xl font-semibold text-gray-800'>vetement</p>
      <hr className='border-none h-[1px] w-full bg-gray-300 mb-10' />

      {/* Shop vetement Products */}
      <div>
        <p className='mb-3 text-xl font-semibold text-gray-800'>vetement Products</p>
        <Carousel responsive={productResponsive}>
          {vetementProducts.map((product, index) => (
            <div className='mr-3' key={index}>
              <ProductItem 
                id={product._id} 
                title={product.title} 
                description={product.description} 
                price={product.price} 
                discount={product.discount} 
                images={product.images} 
                type={product.type} 
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default VetementSection;
