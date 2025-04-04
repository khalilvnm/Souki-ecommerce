import { useContext, useEffect, useState } from 'react';
import { productResponsive } from './../assets/assets';
import { AppContext } from '../context/AppContext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductItem from './ProductItem';

const ElectronicsSection = () => {
  const { allProducts } = useContext(AppContext);
  const [electronicsProducts, setElectronicsProducts] = useState([]);

  useEffect(() => {
    // جلب جميع المنتجات التي تنتمي إلى الإلكترونيات فقط بدون تصنيفات فرعية
    setElectronicsProducts(allProducts.filter((item) => item.type === "electronics"));
  }, [allProducts]);

  return (
    <div className='py-10'>
      <p className='mb-3 text-3xl font-semibold text-gray-800'>Electronics</p>
      <hr className='border-none h-[1px] w-full bg-gray-300 mb-10' />

      {/* Shop Electronics Products */}
      <div>
        <p className='mb-3 text-xl font-semibold text-gray-800'>Electronics Products</p>
        <Carousel responsive={productResponsive}>
          {electronicsProducts.map((product, index) => (
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

export default ElectronicsSection;
