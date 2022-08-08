import React from 'react'
import { ProductData } from '../typing'
import ProductsCard from './ProductsCard'


const Products = ( { productsData }:any ) => {
    // parse products passed from page in order to be used
  const products = JSON.parse(productsData).map((doc:ProductData) => doc)

  return (
    <main className="products-container">
    {/* All products available displayed on UI */}
    {products && products.map((product:ProductData) => {
      return(
    <ProductsCard 
      category={product?.data.category} 
      name={product?.data.name}
      key={product?.id} 
      id={product?.id} 
      price={product?.data.price}
      image={product?.data.image} />)
    }
    )}
  </main>
  )
}

export default Products