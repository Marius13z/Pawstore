import { DocumentData } from 'firebase/firestore'
import React from 'react'
import ProductsCard from './ProductsCard'


const Products = ( { productsData }:any ):JSX.Element => {
    // parse products passed from page in order to be used
  const products = JSON.parse(productsData).map((doc:DocumentData) => doc)

  return (
    <main className="products-container">
    {/* All products available displayed on UI */}
    {products && products.map((product: DocumentData) => {
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