import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { IoArrowBackCircle } from "react-icons/io5";
import { toast } from 'react-toastify';
import { GoXCircleFill } from "react-icons/go";

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
          toast.warning(`Quantité ajustée pour ${product.title} en raison de la disponibilité des stocks`);
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
        <div className='relative px-4 sm:px-[3vw] md:px-[7vw] lg:px-[9vw] min-h-[70vh]'>
                  <Link to={"/"}
                    className="absolute top-auto left-5 z-10 hidden sm:block pt-7 text-primary text-5xl hover:text-third transition-all drop-shadow-lg"
                    title="Retour à l'accueil"
                  >
                    <IoArrowBackCircle />
                  </Link>
          <p className='mb-6 pt-10 text-2xl font-extrabold text-third font-inter'>Votre panier</p>
          <div className='flex flex-col gap-4 drop-shadow-lg'>
            {productsCart.map((product) => (
              <div key={product._id} className='bg-primary mr-10 rounded-md drop-shadow-lg transform hover:scale-105 transition-all duration-300 flex flex-col gap-3  sm:grid sm:grid-cols-[1.2fr_1.5fr_1.2fr_1.2fr_2fr_auto]'>
                <div className="flex gap-4 sm:block">
                  {/* Product Image */}
                  <img 
                    src={product.images[0]} 
                    alt={product.title} 
                    className=' h-[140px] w-[400px] rounded-l-md object-cover'
                  />
                  
                  {/* Mobile Product Info */}
                  <div className="flex flex-col justify-between sm:hidden">
                    <p className='text-sm text-third font-bold font-inter line-clamp-2'>
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
                <p className='hidden sm:block pt-3 text-xl text-third font-bold font-inter line-clamp-2'>
                  {product.title}
                </p>
                
                {/* Desktop Only - Price */}
                <p className='hidden sm:block font-bold font-inter text-[15px] pt-3 text-third text-xl'>
                  Prix:
                  <div>
                  {product.discount > 0 ? (
                    <>
                      <span className="text-black text-xl">
                        {calculateProductDiscount(product.price, product.discount)}{currency}
                      </span>
                      <div>
                      <span className="text-sm text-second line-through ">
                        {product.price}{currency}
                      </span>
                      <span className="text-xs text-red-600 ">
                        (-{product.discount}%)
                      </span>
                      </div>
                    </>
                  ) : (
                    <span className="text-black text-xl">
                        {product.price}{currency}
                      </span>
                  )}</div>
                </p>

                {/* Stock Status */}
                <div className="text-xl text-third pt-3 font-inter font-bold">
                  {product.quantity > 0 ? (
                    <p>en Stock: <div className='pl-10 text-black'>{product.quantity}</div></p>
                  ) : (
                    <span className="text-red-500">En rupture de stock</span>
                  )}
                  </div>

                {/* Mobile Layout - Bottom Section */}
                <div className="flex justify-between items-center sm:block mt-4 sm:mt-0">
                  
                  
                  {/* Total Price */}
                  <p className='text-[20px] font-inter font-bold text-third pt-3 pb-6'>
                    Total: <span className='text-black'>{(
                      product.cartQuantity * 
                      calculateProductDiscount(product.price, product.discount)
                    ).toFixed(2)}{currency}
                  </span>
                  </p>
                  
                  {/* Quantity Controls */}
                  <div className='flex items-center text-center overflow-hidden gap-2 border border-second mr-10 bg-fifth rounded-md w-[120px] sm:w-auto'>
                    <button 
                      className='flex-1 p-1 bg-second text-black font-md hover:bg-third transition'
                      onClick={() => removeToCartItems(product._id)}
                    >
                      -
                    </button>
                    <p className='flex-1 p-1 text-third font-inter'>
                      {product.cartQuantity}
                    </p>
                    <button 
                      className={`flex-1 p-1 bg-second transition text-black font-md ${
                        product.cartQuantity >= product.quantity 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:bg-third'
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



                {/* Remove Button */}
                <button 
                  onClick={() => {
                    deleteProductFromCart(product._id);
                  }}
                  className='pt-2 pr-2 sm:static sm:mx-auto w-[35px] h-[35px] flex items-center justify-center text-third  hover:text-second transition-all duration-300 cursor-pointer text-4xl'
                  aria-label="Remove item"
                >
                  <GoXCircleFill />
                </button>
              </div>
            ))}
          </div>
          
          {/* Cart Total Section */}
          <div className='w-full sm:w-[450px] p-5 rounded-md bg-primary my-10'>
            <p className='text-2xl font-bold font-inter text-third mb-5'>Total du panier</p>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center justify-between'>
                <p className='text-third font-md text-[18px]'>Total</p>
                <p className='font-bold font-inter'>{getProductsCartAmount()}{currency}</p>
              </div>
              <hr className='border-none h-[1px] w-full bg-third' />
              <Link 
                to={"/placeorder"} 
                className='w-full sm:w-fit bg-third text-primary py-1.5 text-[15px] mt-5 px-5 rounded-md hover:bg-second hover:text-fifth transition text-center'
              >
                Passer la Commande
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className='py-20 min-h-[70vh] text-center'>
          <p className='text-3xl text-third drop-shadow-lg font-bold font-inter mb-10'>Votre panier est vide!</p>
          <Link 
            to={"/"} 
            className='w-fit bg-third text-primary py-2 px-5 rounded-md hover:bg-primary hover:text-fifth transition'
          >
            Aller au Magasin
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;