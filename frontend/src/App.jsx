import React from 'react';
import TopNavbar from './components/TopNavbar';
import BotNavbar from './components/BotNavbar';
import { Route, Routes, useMatch } from 'react-router-dom';
import Home from './pages/Home';
import Fashion from './pages/Fashion';
import VideoGames from './pages/VideoGames';
import Perfumes from './pages/Perfumes';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Electronics from './pages/Electronics';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import MyOrders from './pages/MyOrders';
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import MyProfile from './pages/MyProfile';
import Wishlist from './pages/Wishlist';
import Dashboard from './pages/Dashboard/Dashboard';
import Details from './pages/Dashboard/Details';
import AddProduct from './pages/Dashboard/AddProduct';
import ProductsList from './pages/Dashboard/ProductsList';
import Users from './pages/Dashboard/Users';import Verify from './pages/Verify';
import Orders from './pages/Dashboard/Orders';
import Shop from './pages/Shop';

const App = () => {
  const isDashboard = useMatch("/dashboard/*");

  return (
    <div className='min-h-[100vh]'>
      <ToastContainer position='top-right' theme='colored' />
      {
        isDashboard ? null :
          <div>
            <TopNavbar />
            <BotNavbar />
          </div>
      }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/fashion' element={<Fashion />} />
        <Route path='/fashion/:category' element={<Fashion />} />
        <Route path='/electronics' element={<Electronics />} />
        <Route path='/electronics/:category' element={<Electronics />} />
        <Route path='/video-games' element={<VideoGames />} />
        <Route path='/video-games/:category' element={<VideoGames />} />
        <Route path='/perfumes' element={<Perfumes />} />
        <Route path='/perfumes/:category' element={<Perfumes />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/single-product/:productId' element={<SingleProduct />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/my-orders' element={<MyOrders />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/verify' element={<Verify />} />

        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='/dashboard' element={<Details />} />
          <Route path='add-product' element={<AddProduct />} />
          <Route path='products-list' element={<ProductsList />} />
          <Route path='users' element={<Users />} />
          <Route path='orders' element={<Orders />} />
        </Route>

      </Routes>

      {
        isDashboard ? null : <Footer />
      }
    </div>
  );
};

export default App;
