import { createSlice } from "@reduxjs/toolkit";
import {API} from "../http";



const STATUSES = Object.freeze({
    SUCCESS: 'success',
    ERROR: 'error',
    LOADING: 'loading',
  });

const productSlice=createSlice({
    name:"product",
    initialState:{
        data:[],
        status:STATUSES.SUCCESS,
        selectedProduct:{}
    },
    reducers:{
        setProducts(state,action){
            state.data=action.payload
        },
        setStatus(state,action){
            state.status=action.payload
        },
        setSeletedProduct(state,action){
            state.selectedProduct=action.payload
        }
    }

})
export const {setProducts,setStatus,setSeletedProduct}=productSlice.actions
export default productSlice.reducer


export function fetchProducts(){
    return async function fetchProductThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            const response=await API.get("/products")
            dispatch(setProducts(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
              
        }catch(error){
            console.log("The error is !!!!!!!!!!!!"+error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function fetchSingleProduct(productId) {
    return async function fetchSingleProductThunk(dispatch) {
      dispatch(setStatus(STATUSES.LOADING));
      try {
        const response = await API.get(
          `/products/${productId}`,
          productId
        );
        // console.log(response.data);
        dispatch(setSeletedProduct(response.data.data))
        dispatch(setStatus(STATUSES.SUCCESS))
      } catch (error) {
        console.log("The error is !!!!!!!!!!!!" + error);
        dispatch(setStatus(STATUSES.ERROR));
      }
    };
  }