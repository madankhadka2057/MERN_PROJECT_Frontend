import { useEffect, useState } from 'react'
import {AuthenticatedApi} from '../../http/Hello'
import Loader from '../../global/components/loader/Loader'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { emptyItems } from '../../store/cartSlice'
import { setMessage, setMessageStatus } from '../../store/checkOutSlice'
import { STATUSES } from '../../global/components/misc/Staruses'
const KhaltiSuccess = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const queryParams=new URLSearchParams(location.search)
  const pidx=queryParams.get('pidx')
  const [loading,setLoading]=useState(true)
  const verifypidx=async()=>{
    try {
      const response = await AuthenticatedApi.post('payment/verifypidx/',{pidx});
      if(response.status===200){
        setLoading(false)
        dispatch(emptyItems())
        dispatch(setMessage(response.data.message))
        dispatch(setMessageStatus(STATUSES.SUCCESS))
        // alert(response.data.message)
        navigate("/")
      }
    } catch (error) {
      console.error('Error verifying pidx:', error);
    }
  }
  useEffect(()=>{
    verifypidx()

  },[])
  if(loading){
    return(<Loader status="Verifying......"/>)
    
  }else{
    return(<Loader status="Verified"/>)
  
  }
  return (
   <>
   </>
  )
}

export default KhaltiSuccess