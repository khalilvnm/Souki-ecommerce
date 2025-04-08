import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

const Cart = () => {
  const { allProducts, cartItems, calculateProductDiscount,
    currency, addToCartItems, removeToCartItems } = useContext(AppContext);
  const [productsCart, setProductsCart] = useState([]);

  // Collect Products Cart - Add debug logging
  const collectProductsCart = () => {
    console.log('Current cartItems:', cartItems); // Debug log
    console.log('All product IDs:', allProducts.map(p => p._id)); // Debug log
    
    const productsData = allProducts.filter(product => {
      const hasItem = cartItems[product._id] > 0;
      console.log(`Product ${product._id}:`, { 
        inCart: cartItems[product._id], 
        exists: hasItem 
      }); // Debug log
      return hasItem;
    }).map(product => ({
      ...product,
      quantity: cartItems[product._id]
    }));
    
    console.log('Final productsData:', productsData); // Debug log
    setProductsCart(productsData);
  };

  // Calculate total only if products exist
  const getProductsCartAmount = () => {
    if (productsCart.length === 0) return '0.00'; // Changed to return string '0.00'
    return productsCart.reduce((total, product) => {
      const productPrice = calculateProductDiscount(product.price, product.discount);
      return total + (productPrice * product.quantity);
    }, 0).toFixed(2);
  };

  useEffect(() => {
    collectProductsCart();
  }, [cartItems, allProducts]);

  // Only change: More accurate empty state check
  const shouldShowEmpty = Object.keys(cartItems).length === 0 || productsCart.length === 0;

  return (
    <>
      {!shouldShowEmpty ? (
      <div className='relative py-10 px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw] min-h-[70vh]'>
      <div className="absolute top-auto left-5 z-10">
        <BackButton />
      </div>
      <p className='mb-10 text-2xl font-semibold text-gray-800'>Your Cart</p>
      <div className='flex flex-col gap-4'>
        {productsCart.map((product) => (
          <div key={product._id} className='p-5 border border-gray-200 items-center rounded-md shadow-md grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr_0.5fr] gap-3'>
            {/* Product Image */}
            <img 
              src={product.images[0]} 
              alt={product.title} 
              className='max-w-[100%] w-full sm:w-24 h-auto object-contain'
            />
            
            {/* Product Title */}
            <p className='text-sm text-gray-700 font-semibold line-clamp-2'>
              {product.title}
            </p>
            
            {/* Price */}
            <p className='text-gray-800 text-[15px] font-semibold'>
              {product.discount > 0 ? (
                <>
                  <span className="text-red-600">
                    {currency}{calculateProductDiscount(product.price, product.discount)}
                  </span>
                  <span className="text-sm text-gray-500 line-through ml-2">
                    {currency}{product.price}
                  </span>

                  <span className="text-xs text-red-600 ml-2">
                    ({product.discount}% OFF)
                  </span>
                </>
              ) : (
                `${currency}${product.price}`
              )}
            </p>

            {/* Total Price */}
            <p className='text-[15px] font-semibold text-gray-800'>
              Total: {currency}{(
                product.quantity * 
                calculateProductDiscount(product.price, product.discount)
              ).toFixed(2)}
            </p>
            
            {/* Quantity Controls */}
            <div className='flex items-center text-center overflow-hidden gap-2 border border-gray-300 rounded-md'>
              <button 
                className='flex-1 p-1 bg-gray-200 hover:bg-gray-300 transition'
                onClick={() => removeToCartItems(product._id)}
              >
                -
              </button>
              <p className='flex-1 p-1'>
                {product.quantity}
              </p>
              <button 
                className='flex-1 p-1 bg-gray-200 hover:bg-gray-300 transition'
                onClick={() => addToCartItems(product._id)}
              >
                +
              </button>
            </div>  
            {/* Remove Button */}

            <button 
              onClick={() => {
                removeToCartItems(product._id);
              }}
              className='mx-auto w-[25px] h-[25px] flex items-center justify-center rounded-full border border-gray-800 hover:bg-red-700 hover:text-white hover:border-red-700 transition-all duration-300 cursor-pointer text-sm'
              aria-label="Remove item"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      {/* Cart Total Section */}
      <div className='w-full sm:w-[450px] p-5 rounded-md bg-gray-100 mt-10'>
        <p className='text-xl font-semibold text-gray-800 mb-5'>Cart Total</p>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <p className='text-gray-700 text-[15px]'>Total</p>
            <p>{getProductsCartAmount()}{currency}</p>
          </div>
          <hr className='border-none h-[1px] w-full bg-gray-200' />
          <Link 
            to={"/placeorder"} 
            className='w-fit bg-black text-white py-1.5 text-[15px] mt-5 px-5 rounded-md hover:bg-gray-800 transition'
          >
            Proceed To Checkout
          </Link>
        </div>
      </div>
    </div>
      ) : (
        <div className='py-20 min-h-[70vh] text-center'>
          <p className='text-3xl text-gray-800 font-semibold mb-5'>Your Cart Is Empty!</p>
          <Link 
            to={"/"} 
            className='w-fit bg-black text-white py-2 px-5 rounded-md hover:bg-gray-800 transition'
          >
            Go To Shopping
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;