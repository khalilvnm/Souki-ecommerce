import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import ShopProductItem from "../components/ShopProductItem";
import { IoIosArrowForward } from "react-icons/io";

const Shop = () => {
  const { allProducts } = useContext(AppContext);
  const [types, setTypes] = useState([]);
  const [productsFiltering, setProductsFiltering] = useState([]);
  const [showFilters, setShowFilters] = useState(false);


  // Add Type
  const addType = (productType) => {
    if (types.includes(productType)) {
      setTypes(types.filter((item) => item !== productType));
    } else {
      setTypes((prev) => ([...prev, productType]));
    }
  };

  // ApplyFilter
  const applyProductFilter = () => {
    let productData = allProducts.slice();

    if (types.length > 0) {
      productData = productData.filter((product) => types.includes(product.type));
    }
    setProductsFiltering(productData);
  };

  useEffect(() => {
    applyProductFilter();
  }, [allProducts, types]);


  return (
    <div className='my-20 flex flex-col sm:flex-row gap-10 min-h-[70vh] px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      {/* Left Side */}
      <div className="w-full sm:w-[250px]">
        <div className="flex items-center text-xl font-semibold mb-4 cursor-pointer"
          onClick={() => { setShowFilters((prev) => !prev); }}>
          <p>Filters</p>
          <IoIosArrowForward className={`${showFilters ? "rotate-90" : ""} transition-all duration-300`} />
        </div>
        {/* Type */}
        <div className={`sm:block ${showFilters ? "block" : "hidden"} p-5 border border-gray-300 rounded-xl transition-all duration-300`}>
          <p className='mb-3 font-semibold'>Category</p>
          <div className="flex flex-col items-start justify-start gap-2">
            <div className="flex items-center gap-2 text-gray-800 cursor-pointer">
              <input type="checkbox" value={"vetement"} id="vetement" className="cursor-pointer"
                onChange={(event) => { addType(event.target.value); }} />
              <label htmlFor="vetement" className="cursor-pointer">Vetement</label>
            </div>
            <div className="flex items-center gap-2 text-gray-800 cursor-pointer">
              <input type="checkbox" value={"decoration"} id="decoration" className="cursor-pointer"
                onChange={(event) => { addType(event.target.value); }} />
              <label htmlFor="decoration" className="cursor-pointer">Decoration</label>
            </div>
            <div className="flex items-center gap-2 text-gray-800 cursor-pointer">
              <input type="checkbox" value={"Cuisine"} id="Cuisine" className="cursor-pointer"
                onChange={(event) => { addType(event.target.value); }} />
              <label htmlFor="Cuisine" className="cursor-pointer">Cuisine</label>
            </div>
            <div className="flex items-center gap-2 text-gray-800 cursor-pointer">
              <input type="checkbox" value={"accessoire"} id="accessoire" className="cursor-pointer"
                onChange={(event) => { addType(event.target.value); }} />
              <label htmlFor="accessoire" className="cursor-pointer">Accessoire</label>
            </div>
            <div className="flex items-center gap-2 text-gray-800 cursor-pointer">
              <input type="checkbox" value={"bijoux"} id="bijoux" className="cursor-pointer"
                onChange={(event) => { addType(event.target.value); }} />
              <label htmlFor="bijoux" className="cursor-pointer">Bijoux</label>
            </div>
            <div className="flex items-center gap-2 text-gray-800 cursor-pointer">
              <input type="checkbox" value={"bainbeaute"} id="bainbeaute" className="cursor-pointer"
                onChange={(event) => { addType(event.target.value); }} />
              <label htmlFor="bainbeaute" className="cursor-pointer">Bain et Beaute</label>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <p className="text-2xl font-semibold text-gray-800 mb-4">All Products</p>
        <div className="flex flex-col gap-4">
          {
            productsFiltering.map((product, index) => (
              <ShopProductItem 
                key={index} 
                id={product._id} 
                title={product.title} 
                description={product.description} 
                images={product.images} 
                price={product.price} 
                discount={product.discount}
                userName={product.userId?.username} 
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Shop;
