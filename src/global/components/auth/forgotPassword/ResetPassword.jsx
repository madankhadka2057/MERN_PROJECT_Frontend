import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, setErrorMessage, setResetPasswordStatus } from "../../../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { STATUSES } from "../../misc/Staruses";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ResetPassword = () => {
  const dispatch = useDispatch();
  const { status, errorMsg, data,resetPasswordStatus } = useSelector((state) => state.auth);
  const navigate=useNavigate()
  const { register, handleSubmit, formState, watch,reset } = useForm();
  const newPassword = watch("newPassword");
  const handledata = (data) => {
    // console.log(data)
    reset(data)
    dispatch(resetPassword(data));
  };
  useEffect(()=>{
    // console.log(resetPasswordStatus,errorMsg)
    if(resetPasswordStatus==true){
      navigate('/login')
    }
  })
  useEffect(()=>{
    if(errorMsg&&resetPasswordStatus===false){
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
  },[errorMsg,resetPasswordStatus])


  return (
    <section className=" mt-9 bg-gray-50 dark:bg-gray-900">
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
          {/* {
            errorMsg&&<p1 className="text-red-500 font-bold">{errorMsg.message}</p1>
        } */}
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form
            onSubmit={handleSubmit(handledata)}
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            action="#"
          >
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
                // value={data.data}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
                {...register("email", {
                  required: "Please enter email",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                disabled={data?.data ? true : false}
              />
              {formState?.errors?.email && (
                <p className="text-red-500 font-bold">
                  {formState.errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                {...register("newPassword", {
                  required: "Please enter password",
                  minLength: {
                    value: 8,
                    message: "password must be at least 8 characters long",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                  },
                })}
              />
              {formState?.errors?.newPassword && (
                <p className="text-red-500 font-bold">
                  {formState.errors.newPassword.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="confirm-password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                {...register("confirmPassword", {
                  required: "Please enter confirm password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
              />
              {formState?.errors?.confirmPassword && (
                <p className="text-red-500 font-bold">
                  {formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-400 text-white text-xl bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset passwod
            </button>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </section>
  );
};

export default ResetPassword;
