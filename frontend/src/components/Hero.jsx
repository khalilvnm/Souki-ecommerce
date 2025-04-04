import React from 'react';
import { hero_images } from './../assets/assets';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Hero = () => {

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    }
  };

  return (
    <div>
      <Carousel responsive={responsive}
        showDots={true}
        infinite={true}
        autoPlay={true}
      >
        {
          hero_images.map((image, index) => (
            <img src={image} key={index} />
          ))
        }
      </Carousel>
    </div>
  );
};

export default Hero;
