import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { toast } from 'react-toastify';

const Cart = () => {
  const { allProducts, cartItems, calculateProductDiscount,
    currency, addToCartItems, removeToCartItems, deleteProductFromCart } = useContext(AppContext);
  const [productsCart, setProductsCart] = useState([]);

  // Collect Products Cart - Add debug logging
  const collectProductsCart = () => {
    const productsData = allProducts.filter(product => {
      return cartItems[product._id] > 0;
    }).map(product => {
      // Ensure cart quantity doesn't exceed available quantity
      const cartQuantity = cartItems[product._id];
      if (cartQuantity > product.quantity) {
        // Automatically adjust cart quantity if it exceeds available
        setTimeout(() => {
          toast.warning(`Quantity adjusted for ${product.title} due to stock availability`);
          // Update to maximum available
          addToCartItems(product._id, product.quantity);
        }, 0);
        return {
          ...product,
          quantity: product.quantity,
          cartQuantity: product.quantity
        };
      }
      return {
        ...product,
        cartQuantity: cartQuantity
      };
    });
    
    setProductsCart(productsData);
  };

  // Calculate total only if products exist
  const getProductsCartAmount = () => {
    if (productsCart.length === 0) return '0.00';
    return productsCart.reduce((total, product) => {
      const productPrice = calculateProductDiscount(product.price, product.discount);
      return total + (productPrice * product.cartQuantity);
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
        <div className='relative py-10 px-4 sm:px-[3vw] md:px-[7vw] lg:px-[9vw] min-h-[70vh]'>
          <div className="absolute top-auto left-5 z-10 hidden sm:block">
            <BackButton />
          </div>
          <p className='mb-10 text-2xl font-semibold text-gray-800'>Votre panier</p>
          <div className='flex flex-col gap-4'>
            {productsCart.map((product) => (
              <div key={product._id} className='p-4 sm:p-5 border border-gray-200 rounded-md shadow-md flex flex-col sm:grid sm:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr_0.5fr] gap-3'>
                {/* Mobile Layout - Top Section */}
                <div className="flex gap-4 sm:block">
                  {/* Product Image */}
                  <img 
                    src={product.images[0]} 
                    alt={product.title} 
                    className='w-24 sm:w-full h-24 sm:h-auto object-cover sm:object-contain'
                  />
                  
                  {/* Mobile Product Info */}
                  <div className="flex flex-col justify-between sm:hidden">
                    <p className='text-sm text-gray-700 font-semibold line-clamp-2'>
                      {product.title}
                    </p>
                    <div className='text-gray-800 text-[15px] font-semibold'>
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
                    </div>
                  </div>
                </div>

                {/* Desktop Only - Product Title */}
                <p className='hidden sm:block text-sm text-gray-700 font-semibold line-clamp-2'>
                  {product.title}
                </p>
                
                {/* Desktop Only - Price */}
                <p className='hidden sm:block text-gray-800 text-[15px] font-semibold'>
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

                {/* Mobile Layout - Bottom Section */}
                <div className="flex justify-between items-center sm:block mt-4 sm:mt-0">
                  {/* Total Price */}
                  <p className='text-[15px] font-semibold text-gray-800'>
                    Total: {currency}{(
                      product.cartQuantity * 
                      calculateProductDiscount(product.price, product.discount)
                    ).toFixed(2)}
                  </p>
                  
                  {/* Quantity Controls */}
                  <div className='flex items-center text-center overflow-hidden gap-2 border border-gray-300 rounded-md w-[120px] sm:w-auto'>
                    <button 
                      className='flex-1 p-1 bg-gray-200 hover:bg-gray-300 transition'
                      onClick={() => removeToCartItems(product._id)}
                    >
                      -
                    </button>
                    <p className='flex-1 p-1'>
                      {product.cartQuantity}
                    </p>
                    <button 
                      className={`flex-1 p-1 bg-gray-200 transition ${
                        product.cartQuantity >= product.quantity 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:bg-gray-300'
                      }`}
                      onClick={() => {
                        if (product.cartQuantity >= product.quantity) {
                          toast.error(`Quantité maximale atteinte. Seul ${product.quantity} les articles disponibles en stock.`);
                          return;
                        }
                        addToCartItems(product._id);
                      }}
                      disabled={product.cartQuantity >= product.quantity}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Stock Status */}
                <div className="text-sm text-gray-600 mt-2 sm:mt-0">
                  {product.quantity > 0 ? (
                    <span>en Stock: {product.quantity}</span>
                  ) : (
                    <span className="text-red-500">En rupture de stock</span>
                  )}
                </div>

                {/* Remove Button */}
                <button 
                  onClick={() => {
                    deleteProductFromCart(product._id);
                  }}
                  className='absolute top-2 right-2 sm:static sm:mx-auto w-[25px] h-[25px] flex items-center justify-center rounded-full border border-gray-800 hover:bg-red-700 hover:text-white hover:border-red-700 transition-all duration-300 cursor-pointer text-sm'
                  aria-label="Remove item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          {/* Cart Total Section */}
          <div className='w-full sm:w-[450px] p-5 rounded-md bg-gray-100 mt-10'>
            <p className='text-xl font-semibold text-gray-800 mb-5'>Total du panier</p>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center justify-between'>
                <p className='text-gray-700 text-[15px]'>Total</p>
                <p>{getProductsCartAmount()}{currency}</p>
              </div>
              <hr className='border-none h-[1px] w-full bg-gray-200' />
              <Link 
                to={"/placeorder"} 
                className='w-full sm:w-fit bg-black text-white py-1.5 text-[15px] mt-5 px-5 rounded-md hover:bg-gray-800 transition text-center'
              >
                Passer la Commande
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className='py-20 min-h-[70vh] text-center'>
          <p className='text-3xl text-gray-800 font-semibold mb-5'>Votre panier est vide!</p>
          <Link 
            to={"/"} 
            className='w-fit bg-black text-white py-2 px-5 rounded-md hover:bg-gray-800 transition'
          >
            Aller au Magasin
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;