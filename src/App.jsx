



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
import OrderDetails from './pages/orderDetails/OrderDetails'
import MyOrderQrs from './pages/MyOrderQrs/MyOrderQrs'
import ForgotPassword from './global/components/auth/forgotPassword/ForgotPassword'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import VerifyOtp from './global/components/auth/forgotPassword/VerifyOtp'
import ResetPassword from './global/components/auth/forgotPassword/ResetPassword'


import {io} from 'socket.io-client'
export const socket=io("https://foodorder-8jma.onrender.com/",{
  auth:{
    token:localStorage.getItem('token')
  }
})




// socket.emit("hello", {name:"My name is madan"});
// socket.emit("hello",{name:"hello i am madan"})


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
          <Route path='/myorderqrs' element={<MyOrderQrs/>}/>
          <Route path='/orderdetails/:id' element={<OrderDetails/>}/>
          <Route path='/forgotpassword/' element={<ForgotPassword/>}/>
          <Route path='/verifyotp/' element={<VerifyOtp/>}/>
          <Route path='/resetpassword/' element={<ResetPassword/>}/>
          {/* <Route path='/khalti' element={<Khalti/>}/> */}
        </Routes>
        <Footer/>
        </BrowserRouter>
      </Provider>

    </>
  )
}

export default App
