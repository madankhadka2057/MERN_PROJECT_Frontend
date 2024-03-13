import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../global/components/misc/Staruses";
import { AuthenticatedApi } from "../http/Hello";

const checkOutSlice=createSlice({
    name:"cherkout",
    initialState:{
        data:[],
        status:"",
        checkOutStatus:null,
        orders:null,
        message:"",
        messageStatus:""
    },
    reducers:{
        setOrder(state,action){
            state.data.push(action.payload)
        },
        setStatus(state,action){
            state.status=action.payload
        },
        setCheckOutStatus(state,action){
            state.checkOutStatus=action.payload
        },
        setMessageStatus(state,action){
            state.messageStatus=action.payload
        },
        setOrders(state,action){
            state.orders=action.payload
        },
        setOrderStatus(state, action) {
            let updatedOrders = state.orders?.map((order) => {
                if (order._id === action.payload.orderId) {
                    return { ...order, orderStatus: action.payload.status };
                } else {
                    return order;
                }
            });
        
            return { ...state, orders: updatedOrders };
        },
        setPaymentStatus(state, action) {
            let updatedOrders = state.orders?.map((order) => {
                if (order._id === action.payload.orderId) {
                    return { 
                        ...order,
                        paymentDetails: {
                            ...order.paymentDetails,
                            status: action.payload.status 
                        }
                    };
                } else {
                    console.log("Hello world");
                    return order;
                }
            });
            return { ...state, orders: updatedOrders };
        },
        setFilterOrder(state,action){
            const index=state.orders.findIndex((order)=>order._id===action.payload.id)
            if(index!==-1){
                state.orders.splice(index,1)
            }
        },setMessage(state,action){
            state.message=action.payload
        }
    }
})


export const {setOrder,setStatus,setOrders,setOrderStatus,setPaymentStatus,setCheckOutStatus,setMessageStatus,setFilterOrder,setMessage}=checkOutSlice.actions
export default checkOutSlice.reducer

export function createOrder(orderDetails){
    return async function createOrderThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
       try{
        const  response=await AuthenticatedApi.post(`/orders`,orderDetails)
        // console.log("madan khadka")
        dispatch(setOrder(response.data.data))
        // console.log(response.data.message)
        dispatch(setStatus(STATUSES.SUCCESS))
        if(response.status==200){
            dispatch(setMessage(response.data.message))
            dispatch(setCheckOutStatus(STATUSES.SUCCESS))
            dispatch(setMessageStatus(STATUSES.SUCCESS))
        }
        
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
        console.log(response.data.data)
        dispatch(setStatus(STATUSES.SUCCESS))
       }
       catch(error){
        console.log("Error from checkout slice is ",error.response)
       }
    }
}
export function updateOrderStatusInStore(data){
    return async function updateOrderStatusInStoreThunk(dispatch){
        // console.log(data)
        dispatch(setOrderStatus(data))
    }
}
export function updatePaymentStatusInStore(data){
    return async function updatePaymentStatusInStoreThunk(dispatch){
        // console.log(data)
        dispatch(setPaymentStatus(data))
    }
}
export function filterMyOrders(id){
    return async function filterMyOrderThunk(dispatch){
        dispatch(setFilterOrder({id}))
    }
}