import { useContext, useEffect, useState } from 'react';
import { productResponsive } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductItem from './ProductItem';

const BijouxSection = () => {
  const { allProducts } = useContext(AppContext);
  const [bijouxProducts, setbijouxProducts] = useState([]);

  useEffect(() => {
    setbijouxProducts(allProducts.filter((item) => item.type === "bijoux"));
  }, [allProducts]);

  return (
    <div className='py-10'>
      <p className='text-[25px] font-semibold font-inter drop-shadow-lg text-third'>Bijoux</p>
      <hr className='border-none h-[2px] w-full bg-third mb-6' />

      {/* Shop bijoux Products */}
      <div>
        <Carousel responsive={productResponsive} className="z-0">
          {bijouxProducts.map((product, index) => (
            <div className='mr-3' key={index}>
              <ProductItem 
          id={product._id}
          title={product.title}
          images={product.images}
          price={product.price}
          discount={product.discount}
          userName={product.userId?.username}
        />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default BijouxSection;
