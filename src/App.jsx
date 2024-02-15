


import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import router from './routers'
// import Footer from './global/components/footer/Footer'
// import Navbar from './global/components/navebar/Navbar'
import {Home} from './pages/home/Home'
import {Register} from './global/components/auth/register/Register'
import {Login} from './global/components/auth/login/Login'
import {Cart} from './pages/cart/Cart'
import ProductDetails from './pages/productDetails/ProductDetails'
import { Provider } from 'react-redux'
import store from './store/Store'
import Navbar from './global/components/navebar/Navbar'
import Footer from './global/components/footer/Footer'
import CheckOut from './pages/checkout/CheckOut'
import KhaltiSuccess from './pages/success/KhaltiSuccess'
import UserProfile from './pages/profile/UserProfile'
import MyOrder from './pages/myOrder/MyOrder'
import OrderDetails from './pages/orderDetails/OrderDetails.jsx'

// import Khalti from './pages/khalti/Khalti'
function App() {
  return (
    <>
      <Provider store={store}>
        {/* <Navbar/>
        <RouterProvider router={router}/>
        <Footer/> */}
        <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/productdetails/:id' element={<ProductDetails/>}/>
          <Route path='/checkout' element={<CheckOut/>}/>
          <Route path='/success' element={<KhaltiSuccess/>}/>
          <Route path='/profile' element={<UserProfile/>}/>
          <Route path='/myorder' element={<MyOrder/>}/>
          <Route path='/orderdetails/:id' element={<OrderDetails/>}/>
          {/* <Route path='/khalti' element={<Khalti/>}/> */}
        </Routes>
        <Footer/>
        </BrowserRouter>
      </Provider>

    </>
  )
}

export default App
