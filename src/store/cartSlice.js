
import {createSlice} from "@reduxjs/toolkit"
import { AuthenticatedApi } from "../http/Hello"
import { STATUSES } from "../global/components/misc/Staruses"

const cartSlice=createSlice({
    name:"cart",
    initialState:
       { 
        items:[],
        status:STATUSES.SUCCESS
    },
    reducers:{
        setItems(state,action){
            state.items=action.payload
        },
        setStatus(state,action){
            state.status=action.payload
        },
        updateItems(state,action){
            const index=state.items.findIndex((items)=>items.product._id===action.payload.productId)
            if(index!=-1){

                state.items[index].quantity=action.payload.quantity
            }
        },
        deleteItems(state,action){
            const index=state.items.findIndex(items=>items.product._id===action.payload.productId)
            state.items.splice(index,1)
        },
        emptyItems(state){
            state.items=[]
        }
    }

})

export const {setItems,setStatus,updateItems,deleteItems,emptyItems}=cartSlice.actions

export default cartSlice.reducer

export function addToCart(productId){
    
    return async function addToCartThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            const response=await AuthenticatedApi.post(`/cart/${productId}`)
            dispatch(setItems(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
              
        }catch(error){
            console.log("The error is !!!!!!!!!!!!"+error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function fetchCartItem(){
    
    return async function fetchCartItemThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try{
           
            const response=await AuthenticatedApi.get(`/cart/`)
            console.log(response.data.data)
            dispatch(setItems(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
              
        }catch(error){
            console.log("The error is !!!!!!!!!!!!"+error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function updateCartItem(productId,quantity){
    
    return async function updateCartItemThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            // console.log(productId)
            const response=await AuthenticatedApi.patch(`/cart/${productId}`,{quantity})
            // console.log(response.data.data)
            dispatch(updateItems({productId,quantity}))
            dispatch(setStatus(STATUSES.SUCCESS))
              
        }catch(error){
            console.log("The error is !!!!!!!!!!!!"+error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function deleteCartItem(productId){
    return async function deleteCartItemThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try{
             AuthenticatedApi.delete(`/cart/${productId}`)
            // console.log(response.data.message)
            dispatch(deleteItems({productId}))
            dispatch(setStatus(STATUSES.SUCCESS))
        }
        catch(error){
            console.log("The error is !!!!!!!!!!!!"+error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}