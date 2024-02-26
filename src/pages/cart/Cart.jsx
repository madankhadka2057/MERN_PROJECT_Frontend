import {useDispatch, useSelector } from 'react-redux'
import './Cart.css'
import { deleteCartItem, updateCartItem } from '../../store/cartSlice'
import {useNavigate} from 'react-router-dom'
export const Cart = () => {
  const navigate=useNavigate()
  const {items:products}=useSelector((state)=>state.cart)
  const dispatch=useDispatch()
  const totalItemsInCart=products?.reduce((total,items)=>items?.quantity+total,0)
  const totalPriceInCart=products?.reduce((amount,items)=>items.quantity*items?.product?.productPrice+amount,0)


  const handleQuantityChange=(productId,newQuantity)=>{
    newQuantity = Math.max(0, newQuantity);
    dispatch(updateCartItem(productId,newQuantity))
  }

  const handleDeleteItem=(productId)=>{
    dispatch(deleteCartItem(productId))
  }

  return (
  <div className=" bg-gray-100 pt-20">
    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div className="rounded-lg md:w-2/3">
       {
        products.length>0?(
          products?.map((product)=>{
          return(
            <>
               <div key={product.product?._id}className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <img src={product.product?.productImage} alt="product-image" className="w-full rounded-lg sm:w-40" />
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
              <h2 className="text-lg font-bold text-gray-900">{product?.product?.productName}</h2>
              <p className="mt-1 text-xs text-gray-700">NRP {product?.product?.productPrice}</p>
            </div>
            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div className="flex items-center border-gray-100">
                <span onClick={()=>handleQuantityChange(product?.product?._id,product?.quantity-1)}className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                <input onChange={(e)=>handleQuantityChange(product?.product?._id,e.target.value)} className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={product?.quantity} min="1" />
                {/* {console.log(product.product._id)} */}
                <span onClick={()=>handleQuantityChange(product?.product?._id,product?.quantity+1)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
              </div>
              <div onClick={()=>handleDeleteItem(product.product._id)} className="flex items-center space-x-4">
                <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
          
        </div>
            </>
          )
          
        }))
        :(<h1 style={{fontSize:"40px",textAlign:"center",fontWeight:"bold"}}>Please Add Items to Cart</h1>)
       }
      </div>
      {
        products.length>0 &&(
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Total Items</p>
            <p className="text-gray-700">{totalItemsInCart}</p>
          </div>
        
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total Price</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">{totalPriceInCart}</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button onClick={()=>navigate("/checkout")} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
        </div>
        )
      }
      
    </div>
  </div>
  )
}
