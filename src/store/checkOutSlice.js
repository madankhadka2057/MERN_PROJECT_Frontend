import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../global/components/misc/Staruses";
import { AuthenticatedApi } from "../http/Hello";

const checkOutSlice=createSlice({
    name:"cherkout",
    initialState:{
        data:[],
        status:STATUSES.SUCCESS,
        orders:null
    },
    reducers:{
        setOrder(state,action){
            state.data.push(action.payload)
        },
        setStatus(state,action){
            state.status=action.payload
        },
        setOrders(state,action){
            state.orders=action.payload
        }
    }
})


export const {setOrder,setStatus,setOrders}=checkOutSlice.actions
export default checkOutSlice.reducer

export function createOrder(orderDetails){
    return async function createOrderThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
       try{
        const  response=await AuthenticatedApi.post(`/orders`,orderDetails)
        dispatch(setOrder(response.data.data))
        // console.log(response.data.data)
        dispatch(setStatus(STATUSES.SUCCESS))
       }
       catch(error){
        console.log("Error from checkout slice is ",error)
       }
    }
}
export function fetchOrder(){
    return async function fetchOrderThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
       try{
        const  response=await AuthenticatedApi.get(`/orders`)
        dispatch(setOrders(response.data.data))
        dispatch(setOrder(response.data.data))
        // console.log(response.data.data)
        dispatch(setStatus(STATUSES.SUCCESS))
       }
       catch(error){
        console.log("Error from checkout slice is ",error)
       }
    }
}