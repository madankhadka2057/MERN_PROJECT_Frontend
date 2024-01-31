import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../global/components/misc/Staruses";
import {API} from "../http";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: [],
    status: STATUSES.SUCCESS,
    token: "",
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
    }
  },
});

export const { setUser, setStatus, setToken,logOut } = authSlice.actions;
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
      const response = await API.post(
        "/auth/login",
        data
      );
      console.log(response.data);
      dispatch(setUser(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));
      dispatch(setToken(response.data.data));
      localStorage.setItem("token",response.data.token)
    } catch (error) {
      console.log("The error is !!!!!!!!!!!!" + error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
