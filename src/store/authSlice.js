import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../global/components/misc/Staruses";
import {API} from "../http/Hello";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: [],
    status: "",
    token: "",
    errorMsg:"",
    loginStatus:""
  },
  reducers: {
    setUser(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    logOut(state){
      state.data = [];
      state.token=null,
      state.status=STATUSES.SUCCESS
    },
    setErrorMessage(state,action){
      state.errorMsg=action.payload
    },
    setLoginStatus(state,action){
      state.loginStatus=action.payload
    }
  },
});

export const { setUser, setStatus, setToken,logOut,setErrorMessage,setLoginStatus} = authSlice.actions;
export default authSlice.reducer;

export function registerUser(data) {
  return async function registerUserThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.post(
        "/auth/register",
        data
      );
      console.log(response.data);
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log("The error is !!!!!!!!!!!!" + error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
export function loginUser(data) {
  return async function loginUserThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.post("/auth/login", data);
      // console.log(response); 
      dispatch(setLoginStatus('success'))
      dispatch(setErrorMessage(response.data.message));
      dispatch(setUser(response.data.data));
      dispatch(setToken(response.data.token));
      localStorage.setItem("token", response.data.token);
      dispatch(setStatus(STATUSES.LOGIN_SUCCESS));
    } catch (error) {
      console.log("The error is !!!!!!!!!!!!" + error.response.data.message);
      dispatch(setStatus(STATUSES.ERROR));
      dispatch(setErrorMessage(error.response.data.message));
    }
  };
}

export function forgetPassword(email){
  return async function forgetPasswordThunk(dispatch){
    dispatch(setStatus(STATUSES.LOADING))
    try{
      const response=await API.post("/auth/forgetPassword",{email})
      dispatch(setUser(response.data))
      dispatch(setStatus(STATUSES.SUCCESS))
      // console.log(response.data)
    }catch(err){
      dispatch(setStatus(STATUSES.ERROR))
      console.log("Error is :",err)
    }
  }
}
export function verifyOtp(data){
  return async function verifyOtpThunk(dispatch){
    dispatch(setStatus(STATUSES.LOADING))
    try{
      const response=await API.post("/auth/verifyOtp",{email:data.email,otp:data.otp})
      // dispatch(setUser(response.data))
      dispatch(setStatus(STATUSES.SUCCESS))
      console.log(response)
    }catch(err){
      dispatch(setStatus(STATUSES.ERROR))
      console.log("Error is :",err)
    }
  }
}
export function resetPassword(data){
  return async function resetPasswordThunk(dispatch){
    dispatch(setStatus(STATUSES.LOADING))
    try{
      console.log(data)
      const response=await API.post("/auth/resetPassword",data)
      // dispatch(setUser(response.data))
      dispatch(setStatus(STATUSES.SUCCESS))
      console.log(response)
    }catch(err){
      dispatch(setStatus(STATUSES.ERROR))
      console.log("Error is :",err)
      // console.log(err.response.data.message)
      dispatch(setErrorMessage(err.response.data))
    }
  }
}