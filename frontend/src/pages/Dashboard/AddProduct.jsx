import { useContext, useState } from 'react';
import { assets } from './../../assets/assets';
import { toast } from 'react-toastify';
import { AppContext } from './../../context/AppContext';
import axios from "axios";

const AddProduct = () => {
  const { getAllProducts } = useContext(AppContext);
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [type, setType] = useState("Select Type");
  const [quantity, setQuantity] = useState("");
  const { token, backend_url, getAllProductsDashboard } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  // OnSubmit Handler
  const osSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    if (!image1 && !image2 && !image3 && !image4) {
      toast.info("Please Select Your Product Image.");
      setLoading(false);
      return null;
    }

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
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("type", type);
      formData.append("quantity", quantity);

      const response = await axios.post(backend_url + "/api/product/add", formData, {
        headers: { authorization: "Bearer " + token }
      });

      setLoading(false);
      if (response.data.success) {
        toast.success(response.data.message);
        getAllProductsDashboard();
        getAllProducts();
        setImage1("");
        setImage2("");
        setImage3("");
        setImage4("");
        setTitle("");
        setDescription("");
        setPrice("");
        setDiscount("");
        setType("Select Type");
        setQuantity("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full py-5 px-[3vw] overflow-y-scroll">
      <form onSubmit={osSubmitHandler} className='w-full md:w-[650px] flex flex-col gap-6'>

        {/* Images */}
        <div className='flex flex-items-center gap-3'>
          <label htmlFor="image1" className='cursor-pointer'>
            <img src={image1 ? URL.createObjectURL(image1) : assets.upload_area} alt='upload-image' className='w-20 h-20 sm:w-32 sm:h-32' />
            <input type='file' id='image1' hidden onChange={(event) => { setImage1(event.target.files[0]); }} />
          </label>
          <label htmlFor="image2" className='cursor-pointer'>
            <img src={image2 ? URL.createObjectURL(image2) : assets.upload_area} alt='upload-image' className='w-20 h-20 sm:w-32 sm:h-32' />
            <input type='file' id='image2' hidden onChange={(event) => { setImage2(event.target.files[0]); }} />
          </label>
          <label htmlFor="image3" className='cursor-pointer'>
            <img src={image3 ? URL.createObjectURL(image3) : assets.upload_area} alt='upload-image' className='w-20 h-20 sm:w-32 sm:h-32' />
            <input type='file' id='image3' hidden onChange={(event) => { setImage3(event.target.files[0]); }} />
          </label>
          <label htmlFor="image4" className='cursor-pointer'>
            <img src={image4 ? URL.createObjectURL(image4) : assets.upload_area} alt='upload-image' className='w-20 h-20 sm:w-32 sm:h-32' onChange={(event) => { setImage4(event.target.files[0]); }} />
            <input type='file' id='image4' hidden />
          </label>
        </div>
        
        {/* Title */}
        <div>
          <label htmlFor='title' className='block text-gray-800 font-Semibold text-base mb-1 ml-1'>Title</label>
          <input required type='text' placeholder='Type Here.' id='title' value={title}
            className='block w-full border border-gray-400 py-1.5 px-3 rounded-md outline-primary'
            onChange={(event) => { setTitle(event.target.value); }} />
        </div>
        
        {/* Description */}
        <div>
          <label htmlFor='description' className="block text-gray-800 font-Semibold text-base mb-1 ml-1">Description</label>
          <input required type='text' placeholder='Type Here.' id='description' value={description}
            onChange={(event) => { setDescription(event.target.value); }}
            className='block w-full border border-gray-400 py-1.5 px-3 rounded-md outline-primary' />
        </div>
        
        {/* Price And Discount */}
        <div className='flex gap-2 items-center'>
          <div className='w-1/2'>
            <label htmlFor='price' className="block text-gray-800 font-Semibold text-base mb-1 ml-1">Price</label>
            <input required type='number' placeholder='Type Here.' id='price'
              onChange={(event) => { setPrice(event.target.value); }} value={price}
              className='block w-full border border-gray-400 py-1.5 px-3 rounded-md outline-primary' />
          </div>
          <div className='w-1/2'>
            <label htmlFor='discount' className="block text-gray-800 font-Semibold text-base mb-1 ml-1">Discount</label>
            <input required type='number' placeholder='Type Here.' id='discount' value={discount}
              onChange={(event) => { setDiscount(event.target.value); }}
              className='block w-full border border-gray-400 py-1.5 px-3 rounded-md outline-primary' />
          </div>
        </div>
        
        {/* Quantity */}
        <div>
          <label htmlFor='quantity' className="block text-gray-800 font-Semibold text-base mb-1 ml-1">Quantity</label>
          <input required type='number' min="1" placeholder='Enter available quantity' id='quantity' value={quantity}
            onChange={(event) => { setQuantity(event.target.value); }}
            className='block w-full border border-gray-400 py-1.5 px-3 rounded-md outline-primary' />
        </div>
        
        {/* Type And Category */}
        <div className='flex items-center gap-2'>
          <div className='w-1/2'>
            <label className="block text-gray-800 font-Semibold text-base mb-1 ml-1">Type</label>
            <select value={type} onChange={(event) => { setType(event.target.value); }}
              className='block w-full border border-gray-400 py-1.5 px-3 rounded-md outline-primary'>
              <option value={"Select Type"} className='text-gray-600 text-sm'>Select Type</option>
              <option value={"vetement"}>Vetement</option>
              <option value={"decoration"}>Decoration</option>
              <option value={"Cuisine"}>Cuisine</option>
              <option value={"accessoire"}>Accessoire</option>
              <option value={"bijoux"}>Bijoux</option>
              <option value={"bainbeaute"}>Bain et Beaute</option>
            </select>
          </div>
        </div>
        
        {/* Button */}
        {
          loading
            ?
            <button disabled className='w-fit block text-white bg-black py-1.5 px-5 rounded-md text-center opacity-70 cursor-not-allowed'>Processing .....</button>
            :
            <button type='submit' className='w-fit block text-white bg-black py-1.5 px-5 rounded-md text-center'>Add Product</button>
        }

      </form>
    </div>
  );
};

export default AddProduct;
