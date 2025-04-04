import hero_1 from "../assets/hero/hero-1.jpg";
import hero_2 from "../assets/hero/hero-2.jpg";
import hero_3 from "../assets/hero/hero-3.jpg";

export const hero_images = [
  hero_1, hero_2, hero_3
];

// Electronics Category 
import smart_phone from "../assets/electronics/category/smartphone.jpg";
import laptop from "../assets/electronics/category/laptop.jpg";
import headphone from "../assets/electronics/category/headphone.jpg";
import speaker from "../assets/electronics/category/speaker.jpg";
import camera from "../assets/electronics/category/camera.jpg";
import tevevision from "../assets/electronics/category/Television.jpg";
import smart_watch from "../assets/electronics/category/smartwatch.jpg";

export const electronics_category = [
  {
    id: "1",
    title: "Smart Phone",
    images: smart_phone
  },
  {
    id: "2",
    title: "Laptop",
    images: laptop
  },
  {
    id: "3",
    title: "Headphone",
    images: headphone
  },
  {
    id: "4",
    title: "Speaker",
    images: speaker
  },
  {
    id: "5",
    title: "Camera",
    images: camera
  },
  {
    id: "6",
    title: "Televisions",
    images: tevevision
  },
  {
    id: "7",
    title: "Smartwatch",
    images: smart_watch
  },
];

// Video Game Category 
import playstation from "../assets/video games/category/play-station.jpg";
import xbox from "../assets/video games/category/xbox.webp";

export const videoGameCategory = [
  {
    id: "1",
    title: "Play Station",
    images: playstation
  },
  {
    id: "2",
    title: "Xbox",
    images: xbox
  },
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

// Fashion Category
import men_Category from "../assets/fashion/category/men.jpg";
import women_Category from "../assets/fashion/category/women.png";
import kids_Category from "../assets/fashion/category/kids.png";

export const fashionCategory = [
  {
    id: "1",
    title: "Men",
    images: men_Category
  },
  {
    id: "2",
    title: "Women",
    images: women_Category
  },
  {
    id: "3",
    title: "Kids",
    images: kids_Category
  },
];

// Perfumes Category
import men_perfumes from "./perfum/category/men.jpg";
import women_perfumes from "./perfum/category/women.jpg";

export const perfumesCategory = [
  {
    id: "1",
    title: "For Him",
    images: men_perfumes
  },
  {
    id: "2",
    title: "For Her",
    images: women_perfumes
  },
];


// User Profile
import user_profile from "../assets/user-profile.png";
import upload_area from "../assets/upload_area.png";

export const assets = {
  user_profile,
  upload_area
};
