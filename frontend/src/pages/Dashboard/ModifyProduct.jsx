import { useContext, useState, useEffect } from 'react';
import { assets } from './../../assets/assets';
import { toast } from 'react-toastify';
import { AppContext } from './../../context/AppContext';
import axios from "axios";

const ModifyProduct = ({ productId, onClose }) => {
  const { token, backend_url, getAllProductsDashboard, getAllProducts } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  
  // Form states
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post(`${backend_url}/api/product/single-product`, 
          { productId },
          {
            headers: { authorization: "Bearer " + token }
          }
        );
        if (response.data.success) {
          const productData = response.data.product;
          setProduct(productData);
          setTitle(productData.title);
          setDescription(productData.description);
          setPrice(productData.price);
          setDiscount(productData.discount || "");
          setType(productData.type);
          setQuantity(productData.quantity);
          // Set existing images
          if (productData.images && productData.images.length > 0) {
            setImage1(productData.images[0] || "");
            setImage2(productData.images[1] || "");
            setImage3(productData.images[2] || "");
            setImage4(productData.images[3] || "");
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch product details");
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, token, backend_url]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (type === "Select Type") {
      toast.info("Please Select Your Product Type.");
      setLoading(false);
      return;
    }

    if (!quantity || quantity < 1) {
      toast.info("Please enter a valid quantity.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("type", type);
      formData.append("quantity", quantity);

      // Only append new images if they are selected
      if (image1 instanceof File) formData.append("image1", image1);
      if (image2 instanceof File) formData.append("image2", image2);
      if (image3 instanceof File) formData.append("image3", image3);
      if (image4 instanceof File) formData.append("image4", image4);

      const response = await axios.put(
        `${backend_url}/api/product/update/${productId}`,
        formData,
        {
          headers: { 
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        getAllProductsDashboard();
        getAllProducts();
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  // Handle image deletion
  const handleDeleteImage = (imageNumber) => {
    switch (imageNumber) {
      case 1:
        setImage1("");
        break;
      case 2:
        setImage2("");
        break;
      case 3:
        setImage3("");
        break;
      case 4:
        setImage4("");
        break;
      default:
        break;
    }
  };

  if (!product) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="w-full h-full py-5 px-[3vw] overflow-y-scroll">
      <form onSubmit={handleSubmit} className='w-full md:w-[650px] flex flex-col gap-6'>
        {/* Images */}
        <div className='flex flex-wrap gap-3'>
          {[1, 2, 3, 4].map((num) => {
            const imageState = num === 1 ? image1 : num === 2 ? image2 : num === 3 ? image3 : image4;
            const setImageState = num === 1 ? setImage1 : num === 2 ? setImage2 : num === 3 ? setImage3 : setImage4;
            
            return (
              <div key={num} className="relative">
                <label htmlFor={`image${num}`} className='cursor-pointer'>
                  <img 
                    src={imageState ? (typeof imageState === 'string' ? imageState : URL.createObjectURL(imageState)) : assets.upload_area} 
                    alt={`upload-image-${num}`} 
                    className='w-20 h-20 sm:w-32 sm:h-32 object-cover'
                  />
                  <input 
                    type='file' 
                    id={`image${num}`} 
                    hidden 
                    onChange={(event) => { setImageState(event.target.files[0]); }} 
                  />
                </label>
                {imageState && (
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(num)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Title */}
        <div>
          <label htmlFor='title' className='block text-gray-800 font-Semibold text-base mb-1 ml-1'>Titre</label>
          <input 
            required 
            type='text' 
            placeholder='Tapez ici.' 
            id='title' 
            value={title}
            className='block w-full border border-gray-400 py-1.5 px-3 rounded-md outline-primary'
            onChange={(event) => { setTitle(event.target.value); }} 
          />
        </div>
        
        {/* Description */}
        <div>
          <label htmlFor='description' className="block text-gray-800 font-Semibold text-base mb-1 ml-1">Description</label>
          <textarea 
            placeholder='Tapez ici.' 
            id='description' 
            value={description}
            onChange={(event) => { setDescription(event.target.value); }}
            className='block w-full border border-gray-400 py-1.5 px-3 rounded-md outline-primary h-32'
          />
        </div>
        
        {/* Price And Discount */}
        <div className='flex gap-2 items-center'>
          <div className='w-1/2'>
            <label htmlFor='price' className="block text-gray-800 font-Semibold text-base mb-1 ml-1">Prix</label>
            <input 
              required 
              type='number' 
              placeholder='Tapez ici.' 
              id='price'
              onChange={(event) => { setPrice(event.target.value); }} 
              value={price}
              className='block w-full border border-gray-400 py-1.5 px-3 rounded-md outline-primary' 
            />
          </div>
          <div className='w-1/2'>
            <label htmlFor='discount' className="block text-gray-800 font-Semibold text-base mb-1 ml-1">Remise</label>
            <input 
              type='number' 
              placeholder='Tapez ici.' 
              id='discount' 
              value={discount}
              onChange={(event) => { setDiscount(event.target.value); }}
              className='block w-full border border-gray-400 py-1.5 px-3 rounded-md outline-primary' 
            />
          </div>
        </div>
        
        {/* Quantity */}
        <div>
          <label htmlFor='quantity' className="block text-gray-800 font-Semibold text-base mb-1 ml-1">Quantité</label>
          <input 
            required 
            type='number' 
            min="1" 
            placeholder='Enter available quantity' 
            id='quantity' 
            value={quantity}
            onChange={(event) => { setQuantity(event.target.value); }}
            className='block w-full border border-gray-400 py-1.5 px-3 rounded-md outline-primary' 
          />
        </div>
        
        {/* Category */}
        <div>
          <label className="block text-gray-800 font-Semibold text-base mb-1 ml-1">Categorie</label>
          <select 
            value={type} 
            onChange={(event) => { setType(event.target.value); }}
            className='block w-full border border-gray-400 py-1.5 px-3 rounded-md outline-primary'
          >
            <option value={"Select Type"} className='text-gray-600 text-sm'>Sélectionnez le Categorie</option>
            <option value={"Vêtements"}>Vêtements</option>
            <option value={"decoration"}>Decoration</option>
            <option value={"Cuisine"}>Cuisine</option>
            <option value={"accessoire"}>Accessoire</option>
            <option value={"bijoux"}>Bijoux</option>
            <option value={"Bain et Beauté"}>Bain et Beauté</option>
          </select>
        </div>
        
        {/* Buttons */}
        <div className="flex gap-4">
          {loading ? (
            <button disabled className='w-fit block text-fifth bg-third py-1.5 px-5 rounded-md text-center opacity-70 cursor-not-allowed'>
              Traitement .....
            </button>
          ) : (
            <>
              <button type='submit' className='w-fit block text-fifth bg-third py-1.5 px-5 rounded-md text-center'>
                Modifier le produit
              </button>
              <button 
                type='button' 
                onClick={onClose}
                className='w-fit block text-third bg-fifth py-1.5 px-5 rounded-md text-center'
              >
                Annuler
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ModifyProduct; 