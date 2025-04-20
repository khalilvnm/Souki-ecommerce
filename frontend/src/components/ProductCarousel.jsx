import React, { useContext } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductItem from './ProductItem';
import { AppContext } from '../context/AppContext';

const ProductCarousel = () => {
  const { allProducts } = useContext(AppContext);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1280 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1
    }
  };

  if (!allProducts || allProducts.length === 0) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">All Products</h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="transform 300ms ease-in-out"
        transitionDuration={300}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType="desktop"
        dotListClass="custom-dot-list-style"
        itemClass="px-2"
      >
        {allProducts.map((product) => (
          <div key={product._id}>
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
  );
};

export default ProductCarousel; 