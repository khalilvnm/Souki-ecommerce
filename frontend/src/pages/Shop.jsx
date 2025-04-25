import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import ShopProductItem from "../components/ShopProductItem";
import { useSearchParams } from "react-router-dom";

const Shop = () => {
  const { allProducts, currency } = useContext(AppContext);
  const [types, setTypes] = useState([]);
  const [productsFiltering, setProductsFiltering] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('search');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  // Add Type
  const addType = (productType) => {
    if (types.includes(productType)) {
      setTypes(types.filter((item) => item !== productType));
    } else {
      setTypes((prev) => ([...prev, productType]));
    }
  };

  // Handle price range change
  const handlePriceChange = (type, value) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // ApplyFilter
  const applyProductFilter = () => {
    let productData = allProducts.slice();

    // Apply search filter if search value exists
    if (searchValue) {
      productData = productData.filter((product) =>
        product.title.toLowerCase().startsWith(searchValue.toLowerCase())
      );
    }

    // Apply type filter if types are selected
    if (types.length > 0) {
      productData = productData.filter((product) => types.includes(product.type));
    }

    // Apply price filter
    if (priceRange.min !== '' || priceRange.max !== '') {
      productData = productData.filter((product) => {
        const productPrice = product.price;
        const minPrice = priceRange.min === '' ? 0 : parseFloat(priceRange.min);
        const maxPrice = priceRange.max === '' ? Infinity : parseFloat(priceRange.max);
        return productPrice >= minPrice && productPrice <= maxPrice;
      });
    }

    setProductsFiltering(productData);
  };

  useEffect(() => {
    applyProductFilter();
  }, [allProducts, types, searchValue, priceRange]);

  return (
    <div className=' my-20 flex flex-col sm:flex-row gap-10 min-h-[70vh] px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      {/* Left Side */}
      <div className="w-full sm:w-[250px]">
        <div className="flex items-center text-2xl drop-shadow-lg font-bold mb-5 cursor-pointer text-third font-inter"
          onClick={() => { setShowFilters((prev) => !prev); }}>
          <p>Filtres</p>

         {/*<IoIosArrowForward className={`${showFilters ? "rotate-90" : ""} transition-all duration-300`} /> */}

        </div>
        <div className={`sm:block ${showFilters ? "block" : "hidden"} p-5 bg-primary rounded-xl transition-all duration-300 drop-shadow-lg`}>
          {/* Price Range Filter */}
          <div className="mb-6">
            <p className='mb-1 font-semibold font-inter text-third text-lg'>Prix (DZD)</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4 drop-shadow-lg">
                <input
                  type="number"
                  placeholder={`Min`}
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  className="w-full px-3 py-2 rounded-md font-inter text-third placeholder-primary focus:outline-none bg-fourth"
                />
                <input
                  type="number"
                  placeholder={`Max`}
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  className="w-full px-3 py-2 rounded-md font-inter placeholder-primary focus:outline-none text-third bg-fourth"
                />
              </div>
            </div>
          </div>
          
          {/* Type */}
          <p className='mb-2 font-semibold font-inter text-third text-lg'>Catégories</p>
          <div className="flex flex-col items-start justify-start text-fifth font-inter gap-2">
            <div className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" value={"Vêtements"} id="Vêtements" className="cursor-pointer accent-third"
                onChange={(event) => { addType(event.target.value); }} />
              <label htmlFor="Vêtements" className="cursor-pointer">Vêtements</label>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" value={"decoration"} id="decoration" className="cursor-pointer accent-third"
                onChange={(event) => { addType(event.target.value); }} />
              <label htmlFor="decoration" className="cursor-pointer">Décoration</label>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" value={"Cuisine"} id="Cuisine" className="cursor-pointer accent-third"
                onChange={(event) => { addType(event.target.value); }} />
              <label htmlFor="Cuisine" className="cursor-pointer">Cuisine</label>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" value={"accessoire"} id="accessoire" className="cursor-pointer accent-third"
                onChange={(event) => { addType(event.target.value); }} />
              <label htmlFor="accessoire" className="cursor-pointer">Accessoire</label>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" value={"bijoux"} id="bijoux" className="cursor-pointer accent-third"
                onChange={(event) => { addType(event.target.value); }} />
              <label htmlFor="bijoux" className="cursor-pointer">Bijoux</label>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" value={"bainbeaute"} id="bainbeaute" className="cursor-pointer accent-third"
                onChange={(event) => { addType(event.target.value); }} />
              <label htmlFor="bainbeaute" className="cursor-pointer">Bain et Beauté</label>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <p className="text-3xl font-bold font-inter text-third pb-1">
          {searchValue ? `Search Results for "${searchValue}"` : "Tous les produits"}
        </p>
        <div className="w-full h-[2px] bg-third mb-6 rounded-full" />
        <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
