import { collection, DocumentData, onSnapshot } from "firebase/firestore"
import { NextPage } from "next"
import { useEffect, useState } from "react"
import Card from "../components/Card"
import { auth, db } from "../lib/firebase"


const shop:NextPage = () => {
  // Currently authenticated user details
  const user = auth.currentUser
  // Products to be shown on UI
  const [products, setProducts] = useState<DocumentData>()

  // Collection reference to all the available products
  const colRef = collection(db, "products")

  // Pull products data to display them on UI
  useEffect(() => {
    return onSnapshot(colRef, (snapshot) => setProducts(snapshot?.docs))
  }, [user])

  return (
        <>
        <div className="flex  flex-col items-center mt-20 px-16 space-y-7 justify-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-center text-primary font-bold">One toy, treat or walk can make him happy</h1>
        <hr className="h-[2px] bg-primary min-w-[200px] md:min-w-[400px] lg:min-w-[500px] shadow-md " />

        </div>
        <div className={`grid  grid-flow-col grid-rows-12 md:grid-rows-6 xl:grid-rows-5
         mt-10 mb-16 justify-center gap-y-5 gap-x-5 lg:gap-x-10 lg:gap-y-10 px-16`}>

          {/* Available products */}
       {products && products?.map((product:DocumentData) => (
        <Card image={product?.data().image}
         category={product?.data().category}
         id={product?.id}
         key={product?.id} 
         name={product?.data().name} 
         price={product?.data().price}
         />
       ))}
       </div>
        
        </>
  )
}

export default shop