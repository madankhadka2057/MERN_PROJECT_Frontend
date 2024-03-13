import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword, setErrorMessage, setforgetPassStatus } from "../../../../store/authSlice";
import { STATUSES } from "../../misc/Staruses";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const ForgotPassword = () => {
  const [email,setEmail]=useState('')
  const dispatch=useDispatch()
  const navigate=useNavigate()


  const {status,forgetPassStatus,errorMsg}=useSelector(state=>state.auth)
  // console.log(status,forgetPassStatus,errorMsg)
  const forgotPassword=(e)=>{
    e.preventDefault()
    dispatch(forgetPassword(email))
  }  
  useEffect(()=>{
    if(forgetPassStatus===STATUSES.SUCCESS){
      navigate('/verifyOtp')
      dispatch(setforgetPassStatus(null))
    }
  }),[status]
  
  useEffect(()=>{
    if(errorMsg&&forgetPassStatus===STATUSES.ERROR){
      console.log(forgetPassStatus,errorMsg)
      toast(errorMsg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        dispatch(setforgetPassStatus(null))
        dispatch(setErrorMessage(null))
    }
    /*eslint-disable-next-line*/
  },[errorMsg,forgetPassStatus])

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
      {status===STATUSES.LOADING&&
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-12 h-12 mt-20 m-auto animate-spin"
        viewBox="0 0 16 16">
        <path
            d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
        <path fillRule="evenodd"
            d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
      </svg>
      }
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
         
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  onChange={(e)=>setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <button onClick={forgotPassword} className="bg-gradient-to-b from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 font-medium md:p-3  text-white  w-full" style={{borderRadius:"6px"}}>Reset Password</button>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer/>
    </div>
  );
};

export default ForgotPassword;
