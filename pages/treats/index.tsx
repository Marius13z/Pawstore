import {  DocumentData } from 'firebase/firestore'
import type { NextPage } from 'next' 
import Products from '../../components/Products'
import { useCategoryProductsData } from '../../lib/hooks'

// Pre-render treats page
export async function getStaticProps() {

  // get products based on the category they're part of
  const docsnap = await useCategoryProductsData("treats").then(data => JSON.stringify(data))

  return {
    props: {
      data: docsnap
    }
  }
  
} 

const treats: NextPage = ({data}: any) => {
  
  return (
    <Products productsData={data}/>  
  )
}

export default treats