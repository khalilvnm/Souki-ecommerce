import { useContext, useEffect, useState } from "react";
import { AppContext } from './../../context/AppContext';
import axios from "axios";
import { toast } from "react-toastify";
import ModifyProduct from "./ModifyProduct";
import { GoXCircleFill } from "react-icons/go";

const ProductsList = () => {
  const { token, allProductsDashboard, getAllProductsDashboard,
    currency, backend_url, getAllProducts } = useContext(AppContext);
  const [selectedProductId, setSelectedProductId] = useState(null);

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
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getAllProductsDashboard();
  }, []);

  if (selectedProductId) {
    return (
      <ModifyProduct 
        productId={selectedProductId} 
        onClose={() => setSelectedProductId(null)} 
      />
    );
  }

  return (
    <div className="h-full w-full py-10 px-[3vw] overflow-y-scroll">
      {/* Head */}
      <div className="hidden sm:grid grid-cols-[0.5fr_1fr_2fr_1fr_1fr_1fr_1fr_1fr_0.5fr]  rounded-md py-2 px-2 border border-primary bg-fifth text-sm font-bold text-[#6E3919] mb-2">
        <p>#</p>
        <p>Image</p>
        <p>Titre</p>
        <p>Prix</p>
        <p>Categorie</p>
        <p>Quantité</p>
        <p>Vendu par</p>
        <p>Actions</p>
        <p className="text-center">Retirer</p>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2">
        {
          allProductsDashboard.reverse().map((product, index) => (
            <div key={index} className="grid gap-3 sm:grid-cols-[0.5fr_1fr_2fr_1fr_1fr_1fr_1fr_1fr_0.5fr] items-center border border-primary rounded-md py-2 px-2 bg-fifth text-sm font-semibold text-[#6E3919] mb-2 relative">
              {/* Action buttons for small screens */}
              <div className="absolute top-2 right-2 flex gap-2 sm:hidden">
                <button 
                  onClick={() => setSelectedProductId(product._id)}
                  className="w-fit block text-fifth bg-third py-1 px-3 rounded-md text-center hover:text-third hover:bg-primary text-sm font-semibold"
                >
                  Modifier
                </button>
                <GoXCircleFill
                  onClick={() => { removeProduct(product._id); }} 
                  className="w-8 h-8 bg-primary cursor-pointer transition-all duration-300 hover:bg-third hover:text-white rounded-full flex items-center justify-center font-bold"
                />
              </div>

              <p className="font-bold">{index + 1}</p>
              <p><img src={product.images[0]} alt="product-image" className="w-20" /></p>
              <p className="font-semibold text-base">{product.title}</p>
              <p className="font-semibold text-sm">{product.price}{currency}</p>
              <p className="font-medium text-sm">{product.type}</p>
              <p className="font-medium text-sm">{product.quantity}</p>
              <p className="font-medium text-sm">{product.userId?.username || 'Unknown'}</p>
              <p className="hidden sm:block">
                <button 
                  onClick={() => setSelectedProductId(product._id)}
                  className="w-fit block text-fifth bg-third py-1 px-3 rounded-md text-center hover:text-third hover:bg-primary text-sm font-semibold"
                >
                  Modifier
                </button>
              </p>
              <GoXCircleFill
                onClick={() => { removeProduct(product._id); }} 
                className="w-8 mx-auto h-8 bg-primary cursor-pointer transition-all duration-300 hover:bg-third hover:text-white rounded-full flex items-center justify-center font-bold hidden sm:flex"
              />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ProductsList;
