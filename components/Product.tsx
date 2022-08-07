import ProductCard from "./ProductCard"


const Product = ({ productData, productDataId }: any ) => {
 // Parse product and product id so it can be used 
 const product = JSON.parse(productData)
 const productId = JSON.parse(productDataId)

  return (
    <main className="product-container">
      {/* Card used to show a specific product */}
        <ProductCard image={product?.image} 
        key={productId} 
        id={productId} 
        description={product?.description} 
        name={product?.name} 
        price={product?.price}/>
    </main>
  )
}


export default Product