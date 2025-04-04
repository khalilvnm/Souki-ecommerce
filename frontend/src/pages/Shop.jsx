import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import ProductItem from "../components/ProductItem";
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
              <input type="checkbox" value={"fashion"} id="fashion" className="cursor-pointer"
                onChange={(event) => { addType(event.target.value); }} />
              <label htmlFor="fashion" className="cursor-pointer">Fashion</label>
            </div>
            <div className="flex items-center gap-2 text-gray-800 cursor-pointer">
              <input type="checkbox" value={"electronics"} id="electronics" className="cursor-pointer"
                onChange={(event) => { addType(event.target.value); }} />
              <label htmlFor="electronics" className="cursor-pointer">Electronics</label>
            </div>
            <div className="flex items-center gap-2 text-gray-800 cursor-pointer">
              <input type="checkbox" value={"Vide games"} id="Vide games" className="cursor-pointer"
                onChange={(event) => { addType(event.target.value); }} />
              <label htmlFor="Vide games" className="cursor-pointer">Vide Games</label>
            </div>
            <div className="flex items-center gap-2 text-gray-800 cursor-pointer">
              <input type="checkbox" value={"perfumes"} id="perfumes" className="cursor-pointer"
                onChange={(event) => { addType(event.target.value); }} />
              <label htmlFor="perfumes" className="cursor-pointer">Perfumes</label>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div>
        <p className="text-2xl font-semibold text-gray-800 mb-4">All Products</p>
        <div className="w-full grid grid-cols-auto gap-4">
          {
            productsFiltering.map((product, index) => (
              <ProductItem key={index} id={product._id} title={product.title} description={product.description} images={product.images} price={product.price} discount={product.discount} />
            ))
          }
        </div>

      </div>
    </div >
  );
};

export default Shop;
