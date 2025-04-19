import React from 'react';
import TopNavbar from './components/TopNavbar';
import BotNavbar from './components/BotNavbar';
import { Route, Routes, useMatch } from 'react-router-dom';
import Home from './pages/Home';
import Vetement from './pages/Vetement';
import Cuisine from './pages/Cuisine';
import Accessoire from './pages/Accessoire';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Decoration from './pages/Decoration';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import MyOrders from './pages/MyOrders';
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import MyProfile from './pages/MyProfile';
import Shop from './pages/Shop';
import Dashboard from './pages/Dashboard/Dashboard';
import Details from './pages/Dashboard/Details';
import AddProduct from './pages/Dashboard/AddProduct';
import ProductsList from './pages/Dashboard/ProductsList';
import Orders from './pages/Dashboard/Orders';
import Users from './pages/Dashboard/Users';
import Messages from './pages/Dashboard/Messages';
import Bijoux from './pages/Bijoux';
import BainDouche from './pages/BainDouche';
const App = () => {
  const isDashboard = useMatch("/dashboard/*");

  return (
    <div className='min-h-[100vh]'>
      <ToastContainer position='top-right' theme='colored' />
      {
        isDashboard ? (
          <Routes>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Details />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="products-list" element={<ProductsList />} />
              <Route path="orders" element={<Orders />} />
              <Route path="users" element={<Users />} />
              <Route path="messages" element={<Messages />} />
            </Route>
          </Routes>
        ) : (
          <div>
            <TopNavbar />
            <BotNavbar />
            <div className="pt-[136px]">
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/vetement' element={<Vetement />} />
                <Route path='/decoration' element={<Decoration />} />
                <Route path='/bain-douche' element={<BainDouche />} />
                <Route path='/Cuisine' element={<Cuisine />} />
                <Route path='/accessoire' element={<Accessoire />} />
                <Route path='/bijoux' element={<Bijoux />} />
                <Route path='/about-us' element={<AboutUs />} />
                <Route path='/contact-us' element={<ContactUs />} />
                <Route path='/shop' element={<Shop />} />
                <Route path='/single-product/:productId' element={<SingleProduct />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/placeorder' element={<PlaceOrder />} />
                <Route path='/my-orders' element={<MyOrders />} />
                <Route path='/my-profile' element={<MyProfile />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/signin' element={<SignIn />} />
              </Routes>
            </div>
          </div>
        )
      }
      {
        isDashboard ? null : <Footer />
      }
    </div>
  );
};

export default App;
