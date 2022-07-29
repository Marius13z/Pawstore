import type { NextPage } from 'next' 
import Products from '../../components/Products'



const toy: NextPage = () => {

  return (
    <Products category={"toys"} />
  )
}

export default toy