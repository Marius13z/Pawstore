import { doc, DocumentData, onSnapshot} from "firebase/firestore";
import {useRouter} from 'next/router'
import { useEffect, useState } from "react";
import BigCard from "../components/BigCard";
import { db } from "../lib/firebase";

const Product = () => {
  const [product, setProduct] = useState<DocumentData>()
  const router = useRouter();
  const { slug } = router.query

  const docRef = doc(db, "products", `${slug}`)

  useEffect(() => {
   return onSnapshot(docRef, (doc) => setProduct(doc))
  }, [slug])



  return (
    <div className="min-h-[80vh] mt-10 flex px-16 md:items-center">
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