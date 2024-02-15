import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { AuthenticatedApi } from "../../http/Hello"
const OrderDetails = () => {
    const {id}=useParams()
    const {orders}=useSelector((state)=>state.checkout)
    const [filteredOrder]=orders.filter((order)=>order._id===id)
    const navigate=useNavigate()
    // console.log(filteredOrder)
  
      const cancelOrder=async()=>{
       try{
        const response= await AuthenticatedApi.patch('orders/cancel',{id})
        console.log(response.status)
        console.log(response.data)
        if(response.status===200){
          navigate('/myorder')
        }
       }catch(error){
        alert("Some thing error",error)
       }
      }

      const deleteOrder=async()=>{
        try{
          const response= await AuthenticatedApi.delete(`orders/${id}`)
          console.log(response.status)
          console.log(response.data)
          if(response.status===200){
            navigate('/myorder')
          }
         }catch(error){
          alert("Some thing error",error)
         }
        }
  return (
    // <!-- component -->
<div className="py-14 px-4 mt-5 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
  <div className="flex justify-start item-start space-y-2 flex-col">
    <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order {id}</h1>
    <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">2080/10/17</p>
  </div>
  <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
      <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
        <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">My Orders</p>

        {
          filteredOrder && filteredOrder.items.length>0&&filteredOrder.items.map((orderItems)=>{
            return(
            <>
                <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                  <div className="pb-4 md:pb-8 w-full md:w-40">
                    <img className="w-full hidden md:block" src={orderItems.product.productImage} alt="dress" />
                    <img className="w-full md:hidden" src={orderItems.product.productImage} alt="dress" />
                  </div>
                  <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                      <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{orderItems.product.productName}</h3>

                    </div>
                    <div className="flex justify-between space-x-8 items-start w-full">
                      <p className="text-base dark:text-white xl:text-lg leading-6">Rs. {orderItems.product.productPrice} <span className="text-red-300 line-through"> {}</span></p>
                      <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">Qty:{orderItems.quantity}</p>
                      <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">{orderItems.product.productPrice*orderItems.quantity}</p>
                    </div>
                </div>
            </div>
            </>
            )
          })
        }
       
      </div>
      <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
          <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
           
            <div className="flex justify-between items-center w-full">
              <p className="text-base dark:text-white leading-4 text-gray-800">Payment Method</p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{filteredOrder?.paymentDetails.method}</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-base dark:text-white leading-4 text-gray-800">Payment Status</p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{filteredOrder?.paymentDetails.status}</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-base dark:text-white leading-4 text-gray-800">Order Status</p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{filteredOrder?.orderStatus}</p>
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
            <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">{filteredOrder?.totalAmount}</p>
          </div>
        </div>
        <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Shipping</h3>
          <div className="flex justify-between items-start w-full">
            <div className="flex justify-center items-center space-x-4">
              <div className="w-8 h-8">
                <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
              </div>
              <div className="flex flex-col justify-start items-center">
                <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">DPD Delivery<br /><span className="font-normal">Delivery with 24 Hours</span></p>
              </div>
            </div>
            <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">Rs. 100</p>
          </div>
        
        </div>
      </div>
    </div>
    <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col" style={{height:"200px"}}>
      <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
      <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
        <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
          <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
              <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">Address: {filteredOrder?.shoppingAddress}</p>
              <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">Phone: {filteredOrder?.phoneNumber}</p>
            </div>
           
          </div>
          <div className="flex w-full justify-center items-center md:justify-start md:items-start">
            <button className="mt-8  md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-3 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800" style={{marginTop:"10px",border:"1px solid blue" ,borderRadius:"4px"}}>Edit Order</button>
          {
            filteredOrder?.orderStatus!=='cancelled'&&(
              <button onClick={cancelOrder} className="mt-8 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-3 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800" style={{marginTop:"10px",border:"1px solid blue" ,borderRadius:"4px"}}>Cancle Order</button>
            )
          }
          </div>
          <div className="flex w-full justify-center items-center md:justify-start md:items-start">
            <button onClick={deleteOrder} className="mt-8  md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-3 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800" style={{backgroundColor:"red",marginTop:"10px",border:"1px solid blue" ,borderRadius:"4px"}}>Delete Order</button>
        
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default OrderDetails