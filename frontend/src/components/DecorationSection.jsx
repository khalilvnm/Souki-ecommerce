import { useContext, useEffect, useState } from 'react';
import { productResponsive } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';

const DecorationSection = () => {
  const { allProducts } = useContext(AppContext);
  const [decorationProducts, setdecorationProducts] = useState([]);

  useEffect(() => {
    setdecorationProducts(allProducts.filter((item) => item.type === "decoration"));
  }, [allProducts]);

  return (
    <div className='py-10'>
      <p className=' text-[25px] font-semibold font-inter drop-shadow-lg text-third'>Décoration</p>
      <hr className='border-none h-[2px] w-full bg-third mb-6' />

      {/* Shop decoration Products */}
      <div>
        <Carousel responsive={productResponsive} className="z-0">
          {decorationProducts.slice(0, 5).map((product, index) => (
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
        <div className="flex justify-end mt-4">
          <Link to="/decoration" className="bg-third text-fifth font-semibold py-2 px-6 rounded-full hover:bg-second transition-all duration-300 shadow-md">
            Voir tout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DecorationSection;
