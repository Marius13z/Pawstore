import { doc, DocumentData, onSnapshot} from "firebase/firestore";
import {useRouter} from 'next/router'
import { useEffect, useState } from "react";
import BigCard from "../components/BigCard";
import { db } from "../lib/firebase";

const Product = () => {
  // Products that will be displayed on UI
  const [product, setProduct] = useState<DocumentData>()
  // Router used to push users to other pages
  const router = useRouter();
  // Current accessed slug
  const { slug } = router.query

  // Reference to products based on slug
  const docRef = doc(db, "products", `${slug}`)

  // Pull the specific product based on the slug the user has navigated to
  useEffect(() => {
   return onSnapshot(docRef, (doc) => setProduct(doc))
  }, [slug])



  return (
    <div className="min-h-[80vh] mt-10 flex md:px-16 md:items-center">
      {/* Card used to show a specific product */}
        <BigCard image={product?.data().image} 
        key={product?.id} 
        id={product?.id} 
        description={product?.data().description} 
        name={product?.data().name} 
        price={product?.data().price}/>
    </div>
  )
}

export default Product