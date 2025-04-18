import { useContext, useEffect } from "react";
import { AppContext } from './../../context/AppContext';
import axios from "axios";
import { toast } from "react-toastify";

const ProductsList = () => {
  const { token, allProductsDashboard, getAllProductsDashboard,
    currency, backend_url, getAllProducts } = useContext(AppContext);


  // Remove Product
  const removeProduct = async (productId) => {
    console.log(productId);
    try {
      const response = await axios.post(backend_url + "/api/product/delete", 
        { 
          productId: productId,
          userDetails: { id: localStorage.getItem('userId') }
        }, 
        {
          headers: { authorization: "Bearer " + token }
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getAllProducts();
        getAllProductsDashboard();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    getAllProductsDashboard();
  }, []);


  return (
    <div className="h-full w-full py-10 px-[3vw] overflow-y-scroll">
      {/* Head */}
      <div className="hidden sm:grid grid-cols-[0.5fr_1fr_2fr_1fr_1fr_1fr_1fr_0.5fr] border border-gray-200 rounded-md py-2 px-2 bg-gray-50 text-sm font-semibold mb-2">
        <p>#</p>
        <p>Image</p>
        <p>Title</p>
        <p>Price</p>
        <p>Type</p>
        <p>Quantity</p>
        <p className="text-center">Remove</p>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2">
        {
          allProductsDashboard.reverse().map((product, index) => (
            <div key={index} className="grid gap-3 sm:grid-cols-[0.5fr_1fr_2fr_1fr_1fr_1fr_1fr_0.5fr] items-center border border-gray-200 rounded-md py-2 px-2 bg-gray-50 text-sm font-semibold mb-2">
              <p>{index + 1}</p>
              <p><img src={product.images[0]} alt="product-image" className="w-20" /></p>
              <p>{product.title}</p>
              <p>{product.price}{currency}</p>
              <p>{product.type}</p>
              <p>{product.quantity}</p>
              <p onClick={() => { removeProduct(product._id); }} className="w-8 mx-auto h-8 bg-white cursor-pointer transition-all duration-300 hover:bg-red-700 hover:text-white border border-gray-300 rounded-full flex items-center justify-center">X</p>
            </div>
          ))
        }
      </div>

    </div>
  );
};

export default ProductsList;