import type { NextPage } from 'next' 
import Products from '../../components/Products'
import { useCategoryProductsData } from '../../lib/hooks'

// Pre-render leash page
export async function getStaticProps() {

    const docsnap = await useCategoryProductsData("leash").then(data => JSON.stringify(data))

    return {
      props: {
        data: docsnap
      }
    }

} 

const leash: NextPage = ({data}: any) => {

  return (
    <Products productsData={data}/>  
  )
}

export default leash