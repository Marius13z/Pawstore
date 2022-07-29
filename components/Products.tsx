import { collection, DocumentData, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Card from '../components/Card'
import { db } from '../lib/firebase'

interface Props {
  category: string
}

const Products:React.FC<Props> = ({ category }) => {
  // Used state to store product and be able to display it on UI
  const [products, setProducts] = useState<DocumentData>()
  // Reference to collection where we pull data from
  const colRef = collection(db, "products")
  // Query search through collection to find the products that are toy
  const q = query(colRef, where("category", "==", `${category}`) )

  // Search for the products and return those that are part of treat category
  useEffect(() => {
    return onSnapshot(q, (snapshot) => {
      setProducts(snapshot?.docs)
    })
  }, [])




  return (<div className="flex justify-center min-h-[70vh] space-x-5 sm:space-x-10
   mt-10 mb-10 lg:mb-20 lg:mt-20 items-center">
    
    <div className="grid grid-flow-row md:grid-flow-col gap-y-5 gap-x-5 lg:gap-y-7 lg:gap-x-7 xl:gap-x-9 xl:gap-y-9  md:grid-rows-2 grid-cols-2 ">
      {products && products?.map((product: DocumentData) => {
        return(<Card 
        category={product?.data().category} 
        name={product?.data().name}
        key={product?.id} 
        id={product?.id} 
        price={product?.data().price}
        image={product?.data()?.image} />)
      }
        )}
    </div>
  
   
    
  </div>
      
  )
}

export default Products