import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setErrorMessage, verifyOtp } from "../../../../store/authSlice"
import { STATUSES } from "../../misc/Staruses"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyOtp = () => {
    const navigate=useNavigate()
    const {status,data,forgetPassStatus,verifyOtpStatus,errorMsg}=useSelector(state=>state.auth)
    // console.log(verifyOtpStatus)
    // console.log(status)
    const dispatch=useDispatch()
    const [emailAndOtp,setEmailAndOtp]=useState({
        email:data.data,
    })
    
    const handleInputChange=(e)=>{
        const {name,value}=e.target
        setEmailAndOtp((prevData)=>({
            ...prevData,
            [name]:value
        }))
       
    }
    useEffect(()=>{
        if (data.length===0){
          // console.log("first")
          navigate('/forgotpassword')
        }
    },[])
    useEffect(()=>{
        if (verifyOtpStatus===true){
            // console.log("I am logging")
            navigate('/resetPassword')
        }
    /*eslint-disable-next-line*/
    },[verifyOtpStatus])

    useEffect(()=>{
      if(errorMsg&&verifyOtpStatus===false){
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
          dispatch(setErrorMessage(null))
      }
      /*eslint-disable-next-line*/
    },[errorMsg,verifyOtpStatus])


    const handleVerifyOtp=(e)=>{
       e.preventDefault()
       dispatch(verifyOtp(emailAndOtp))
    }

  return (
    <div
    className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    style={{ margin: "auto ", marginTop: "80px", marginBottom: "5px" }}
  >
    <form className="space-y-6" action="#">
      <h5 className="text-xl font-medium text-gray-900 dark:text-white">
        Sign in to our platform
      </h5>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={data.data}
          disabled={data.data ? true : false}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="name@company.com"
          required
        />
      </div>
      <div>
        <label
          htmlFor="otp"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Otp
        </label>
        <input

          onChange={handleInputChange}
          type="number"
          name="otp"
          id="otp"
          placeholder="Enter otp"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>
      
      <button
      onClick={handleVerifyOtp}
        type="button"
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Verify Otp
      </button>
      
    </form>
    <ToastContainer/>
  </div>
  )
}

export default VerifyOtp