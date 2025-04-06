import hero_1 from "../assets/hero/hero-1.jpg";
import hero_2 from "../assets/hero/hero-2.jpg";
import hero_3 from "../assets/hero/hero-3.jpg";

export const hero_images = [
  hero_1, hero_2, hero_3
];


export const categoryResponsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  }
};


export const productResponsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  }
};

import user_profile from "../assets/user-profile.png";
import upload_area from "../assets/upload_area.png";

export const assets = {
  user_profile,
  upload_area
};
