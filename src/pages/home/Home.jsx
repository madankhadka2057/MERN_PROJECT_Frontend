import { useState } from "react";
import {Hero} from "./components/Hero"
import Product from "./components/Product"

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  }       
  return (
    <>
        <div>
            <Hero handleSearchInputChange={handleSearchInputChange}/>
            <Product searchQuery={searchQuery}/>
        </div>
    </>
  )
}
