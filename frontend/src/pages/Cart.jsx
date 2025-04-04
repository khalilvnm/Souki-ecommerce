import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { allProducts, cartItemsFashion, cartItems, calculateProductDiscount,
    currency, addToCartItemsFashion, addToCartItems, removeToCartItemsFashion,
    removeToCartItems, deleteProductFashionFromCart, deleteProductFromCart, delivery_fees } = useContext(AppContext);
  const [productsCart, setProductsCart] = useState([]);


  // Collect Products Cart
  const collectProductsCart = () => {
    let productsData = [];
    // Get Products From CartItemsFashion
    allProducts.map((product) => {
      for (const items in cartItemsFashion) { // {a:{s:1, m:0}}
        for (const item in cartItemsFashion[items]) {
          if (product._id === items && cartItemsFashion[items][item] > 0) {
            productsData.push({
              ...product, size: item, quantity: cartItemsFashion[items][item]
            });
          }
        }
      }
    });
    // Get Products From CartItems
    allProducts.map((product) => {
      for (const items in cartItems) { // {a:1,b:2,c:3}
        if (product._id === items && cartItems[items] > 0) {
          productsData.push({
            ...product, quantity: cartItems[items]
          });
        }
      }
    });
    setProductsCart(productsData);
  };

  // Collect Cart Products Amount
  const getProductsCartAmount = () => {
    let productsAmount = 0;
    productsCart.map((product) => {
      let productPrice = (product.price - (product.price * (product.discount / 100))).toFixed(2);
      productsAmount += productPrice * product.quantity;
    });
    return productsAmount;
  };

  useEffect(() => {
    collectProductsCart();
  }, [cartItemsFashion, cartItems, allProducts]);

  return (
    <>
      {
        productsCart.length > 0 ? <div className='py-10 px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw] min-h-[70vh]'>
          <p className='mb-10 text-2xl font-semibold text-gray-800'>Your Cart</p>
          {/* Show Products Cart */}
          <div className='flex flex-col gap-4'>
            {
              productsCart.map((product, index) => (
                <div key={index} className='p-5 border border-gray-200 items-center rounded-md shadow-md grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr_0.5fr] gap-3'>
                  <img src={product.images[0]} alt='product-image' className='max-w-[100%] w-full sm:w-24' />
                  <p className='text-sm text-gray-700 font-semibold'>{product.title}</p>
                  {/* Price */}
                  <p className='text-gray-800 text-[15px] font-semibold'>Price: {currency}{calculateProductDiscount(product.price, product.discount)}</p>
                  {/* Quantity */}
                  <div className='flex items-center text-center overflow-hidden gap-2 border border-gray-300 rounded-md'>
                    <button className='flex-1 p-1 bg-gray-200'
                      onClick={() => {
                        if (product.type === "fashion") {
                          removeToCartItemsFashion(product._id, product.size);
                        } else {
                          removeToCartItems(product._id);
                        }
                      }}
                    >-</button>
                    <p className='flex-1 p-1 '>{product.quantity}</p>
                    <button className='flex-1 p-1 bg-gray-200'
                      onClick={() => {
                        if (product.type === "fashion") {
                          addToCartItemsFashion(product._id, product.size);
                        } else {
                          addToCartItems(product._id);
                        }
                      }}
                    >+</button>
                  </div>
                  {/* Total Price */}
                  <p className='text-[15px] font-semibold text-gray-800'>Total: {currency}{product.quantity * calculateProductDiscount(product.price, product.discount)}</p>
                  {/* Remove */}
                  <p onClick={() => {
                    if (product.type === "fashion") {
                      deleteProductFashionFromCart(product._id, product.size);
                    } else {
                      deleteProductFromCart(product._id);
                    }
                  }} className='mx-auto w-[25px] flex items-center justify-center h-[25px] rounded-full border border-gray-800 transition-all duration-300 hover:bg-red-700 hover:text-white cursor-pointer text-sm'>X</p>
                </div>
              ))
            }
          </div>
          {/* Total Cart */}
          <div className='w-full sm:w-[450px] p-5 rounded-md bg-gray-100 mt-10'>
            <p className='text-xl font-semibold text-gray-800 mb-5'>Cart Total</p>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center justify-between'>
                <p className='text-gray-700 text-[15px]'>Subtotal</p>
                <p>{currency}{getProductsCartAmount()}</p>
              </div>
              <hr className='border-none h-[1px] w-full bg-gray-200' />
              <div className='flex items-center justify-between'>
                <p className='text-gray-700 text-[15px]'>Delivery Fees</p>
                <p>{currency}{getProductsCartAmount() > 0 ? delivery_fees : 0}</p>
              </div>
              <hr className='border-none h-[1px] w-full bg-gray-200' />
              <div className='flex items-center justify-between'>
                <p className='text-gray-700 text-[15px]'>Total</p>
                <p>{currency}{getProductsCartAmount() > 0 ? getProductsCartAmount() + delivery_fees : 0}</p>
              </div>
              <hr className='border-none h-[1px] w-full bg-gray-200' />
              <Link to={"/placeorder"} className='w-fit bg-black text-white py-1.5 text-[15px] mt-5 px-5 rounded-md'>Proceed To Checkout</Link>
            </div>

          </div>

        </div> :
          <div className='py-20 min-h-[70vh] text-center'>
            <p className='text-3xl text-gray-800 font-semibold mb-5'>Your Cart Is Empty!</p>
            <Link to={"/"} className='w-fit bg-black text-white py-2 px-5 rounded-md'>Go To Shopping</Link>
          </div>
      }
    </>

  );
};

export default Cart;
