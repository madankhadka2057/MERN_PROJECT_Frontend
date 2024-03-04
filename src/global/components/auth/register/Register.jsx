import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../../../store/authSlice"
import { STATUSES } from "../../misc/Staruses"

export const Register = () => {
  const dispatch=useDispatch()
  const {status}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  const [userData,setUserData]=useState({
    username:'',
    email:'',
    phoneNumber:'',
    password:''
  })
 
  const handleChange=(e)=>{
    const {name,value}=e.target
    setUserData({
      ...userData,
      [name]:value
    })
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(registerUser(userData))

  }
  useEffect(()=>{
    if(status==STATUSES.SUCCESS){
      return navigate("/login")
     
    }

    if(status==STATUSES.ERROR){
      console.log(status)
      return navigate("/register")
      
    }
  },[status])
  
  

  
  return (
<div className=" bg-indigo-100 pt-16 w-full my-6  flex justify-center items-center">
	<div className=" bg-white w-full md:w-full sm:w-full lg:w-2/5">
		<form onSubmit={handleSubmit} className=" w-full  p-10 rounded-lg shadow-lg min-w-full">
			<h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">Register Form</h1>
			<div>
				<label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="username">Username</label>
				<input onChange={handleChange} className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="username" id="username" placeholder="username" autoComplete="username" />
            </div>
            <div>
                <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="email">Email</label>
                <input onChange={handleChange}  className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="email" id="email" placeholder="@email" autoComplete="email" />
            </div>
            <div>
                <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="phoneNumber">Phone Number</label>
                <input onChange={handleChange}  className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="number" name="phoneNumber" id="pohneNumber" placeholder="Phone Number" autoComplete="phoneMumber" />
            </div>
            <div>
                <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="password">Password</label>
                <input onChange={handleChange}  className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="password" name="password" id="password" placeholder="password" autoComplete="password" />
            </div>
          
            <button type="submit" className="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans">Register</button>
            <button type="button" className="w-full mt-6 mb-3 bg-indigo-100 rounded-lg px-4 py-2 text-lg text-gray-800 tracking-wide font-semibold font-sans"> <Link to="/login">Login</Link> </button>
		</form>
	</div>
</div>
  )
}
