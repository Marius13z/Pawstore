import { NextPage } from "next"
import Product from "../../components/Product";
import { useProductData, useProductPath } from "../../lib/hooks";


// Pre-render paths
export async function getStaticPaths() {
  
  // get products id to generate paths
  const paths = await useProductPath()
  
  // pass paths to getStaticProps
  return {
    paths,
    fallback: false
  }
}

// Pre-render product
export async function getStaticProps(context: any) {
  // get path from context
  const slug = context.params.slug
  
  // get product data to display it on UI
  const product = await useProductData(slug)
  
  // pass data for displaying product and id for adding to cart
  return {
    props: {
      data: JSON.stringify(product.data),
      id: JSON.stringify(product.id)
    }
  }
}

const slug:NextPage = ({data, id}: any) => {
 
  return (
    <Product productData={data} productDataId={id}/>
  )
}

export default slug