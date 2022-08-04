import { collection, DocumentData, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Card from '../components/Card'
import { db } from '../lib/firebase'

interface Props {
  category: string
}

const Products:React.FC<Props> = ({ category }) => {
  // Products that will be displayed on UI
  const [products, setProducts] = useState<DocumentData>()
  // Reference to collection with all products available
  const colRef = collection(db, "products")
  // Query search through collection to find the products that are of category toy
  const q = query(colRef, where("category", "==", `${category}`) )

  // Pull data for products that are of a specific category
  useEffect(() => {
    return onSnapshot(q, (snapshot) => {
      setProducts(snapshot?.docs)
    })
  }, [])



  return (
    
    <main className="grid grid-flow-col grid-rows-4 md:grid-rows-2
    mt-20 mb-16 justify-center gap-y-5 gap-x-5 lg:gap-x-10 lg:gap-y-10 px-10 ">
      {/* All products available displayed on UI */}
      {products && products?.map((product: DocumentData) => {
        return(
        <Card 
        category={product?.data().category} 
        name={product?.data().name}
        key={product?.id} 
        id={product?.id} 
        price={product?.data().price}
        image={product?.data()?.image} />)
      }
        )}
    </main>
  
   
    
  
      
  )
}

export default Products