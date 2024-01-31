import Product from "./components/product/Product"
import Review from "./components/review/Review"
import {useParams} from 'react-router-dom'

const ProductDetails = () => {
  const {id}=useParams()
  return (
    <>
        <Product id={id}/>
        <Review id={id}/>
    </>
  )
}

export default ProductDetails