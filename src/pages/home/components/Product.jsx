
import { useEffect } from "react"
import {  useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../../../store/productSlice"
import { useNavigate } from "react-router-dom"
import Loader from "../../../global/components/loader/Loader"
const Product = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {data:products,status}=useSelector((state)=>state.product)
    useEffect(()=>{
        dispatch(fetchProducts())
    },[])

    if(status=='loading')
    {
        return <Loader status="Loading"/>
    }
    if(status=='error')
    {
        return<h1>Error!!somthing went to wrong......</h1>
    }


  return (
    <div className="flex flex-wrap justify-center">
        {
            products.map((product)=>{
                return(
                    <>
                        <div onClick={()=>navigate(`/productdetails/${product._id}`)} key={product._id} className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-90 hover:shadow-lg">
                            <img className="h-48 w-full object-cover object-center" src={product.productImage} alt="Product Image" />
                            <div className="p-4">
                                <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">{product.productName}</h2>
                                <p className="mb-2 text-base dark:text-gray-300 text-gray-700">{product.productDescription}</p>
                                <div className="flex items-center">
                                    <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">{product.productPrice}</p>
                                    <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">$25.00</p>
                                    <p className="ml-auto text-base font-medium text-green-500">20% off</p>
                                </div>
                            </div>
                           
                        </div>
                    </>
                )
            })
        }
    </div>
  )
}

export default Product