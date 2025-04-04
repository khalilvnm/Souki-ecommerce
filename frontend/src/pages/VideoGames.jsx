import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import ProductItem from "../components/ProductItem";

const VideoGames = () => {
  const { allProducts } = useContext(AppContext);
  const [videoGamesProducts, setVideoGamesProducts] = useState([]);

  // جلب جميع منتجات الفيديو جيمز
  useEffect(() => {
    const videoGameProductsData = allProducts.filter((product) => product.type === "Video games");
    setVideoGamesProducts(videoGameProductsData);
  }, [allProducts]);

  return (
    <div className="py-10 px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <p className='text-xl font-semibold mb-5 ml-1'>Video Games Products</p>
      <div className="grid grid-cols-auto gap-5">
        {
          videoGamesProducts.map((product, index) => (
            <ProductItem key={index} id={product._id} title={product.title} description={product.description} price={product.price} discount={product.discount} images={product.images} />
          ))
        }
      </div>
    </div>
  );
};

export default VideoGames;
