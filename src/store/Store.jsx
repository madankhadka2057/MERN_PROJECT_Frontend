import { configureStore} from "@reduxjs/toolkit";

import cartReducer from './cartSlice'
import productReducer from './productSlice'
import authReducer from './authSlice'
import checkOutSlice from "./checkOutSlice";
const store=configureStore({
    reducer:{
        cart:cartReducer,
        product:productReducer,
        auth:authReducer,
        checkout:checkOutSlice
    }
})

export default store