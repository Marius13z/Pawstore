import type { NextPage } from 'next' 
import Products from '../../components/Products'

import { useCategoryProductsData } from '../../lib/hooks'

// Pre-render toys page
export async function getStaticProps() {

    const docsnap = await useCategoryProductsData("toys").then(data => JSON.stringify(data))

    return {
      props: {
        data: docsnap
      }
    }

} 

const toys: NextPage = ({data}: any) => {
  
  return (
    <Products productsData={data}/>  
  )
}


export default toys