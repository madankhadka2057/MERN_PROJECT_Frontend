import { createBrowserRouter } from "react-router-dom";
import {Home} from "./pages/home/Home";
import { Login } from "./global/components/auth/login/Login";
import { Register } from "./global/components/auth/register/Register";
import { Cart } from "./pages/cart/Cart";
const router=createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/cart",
        element:<Cart/>
    }
])
export default router