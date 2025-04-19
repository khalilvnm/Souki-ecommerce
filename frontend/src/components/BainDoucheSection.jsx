import { useContext, useEffect, useState } from 'react';
import { productResponsive } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductItem from './ProductItem';

const BainDoucheSection = () => {
  const { allProducts } = useContext(AppContext);
  const [baindoucheProducts, setbaindoucheProducts] = useState([]);

  useEffect(() => {
    // جلب جميع المنتجات التي تنتمي إلى الإلكترونيات فقط بدون تصنيفات فرعية
    setbaindoucheProducts(allProducts.filter((item) => item.type === "baindouche"));
  }, [allProducts]);

  return (
    <div className='py-10'>
      <p className='mb-3 text-3xl font-semibold text-gray-800'>Bain et Douche</p>
      <hr className='border-none h-[1px] w-full bg-gray-300 mb-10' />

      {/* Shop baindouche Products */}
      <div>
        <p className='mb-3 text-xl font-semibold text-gray-800'>Bain et Douche Products</p>
        <Carousel responsive={productResponsive}>
          {baindoucheProducts.map((product, index) => (
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

export default BainDoucheSection;
