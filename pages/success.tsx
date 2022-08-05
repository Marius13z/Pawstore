import {  doc, DocumentData, writeBatch } from "firebase/firestore"
import { auth, db } from "../lib/firebase"
import { useCartData } from "../lib/hooks"
import Confetti from 'react-dom-confetti'
import { useRouter } from "next/router"
import Error404 from "../components/Error404"
import AuthCheck from "../components/AuthCheck"



const success = () => {
   const cartProducts = useCartData()
   const user = auth.currentUser
   const router = useRouter()

   // Delete cart after user has succeeded to pay 
    const deleteDocs = async () => {
      const docId = cartProducts?.map((document:DocumentData) => document?.id)
      const batch = writeBatch(db)
      docId?.forEach((id:DocumentData) => {
        batch.delete(doc(db, "users", `${user?.uid}`, "cart", `${id}`))
     })
     await batch.commit()
     console.log("batch removed")
    }

    // When user has paid he's redirected to the success page
    // if he still has more than one product in the cart the products 
    // will disappear
    if(cartProducts?.length > 0) {
         deleteDocs()
        setTimeout(() => {
          router.push("/")
        }, 3000)
    } 
 
    const config:any = {
        angle: "105",
        spread: "304",
        startVelocity: "58",
        elementCount: "103",
        dragFriction: 0.12,
        duration: "4520",
        stagger: "9",
        width: "13px",
        height: "13px",
        perspective: "500px",
        colors: ["#422C4F", "#EBA25D", "#61E3F1", "#fdff6a"]
      };


  return (

    <AuthCheck>

    <main className="flex justify-center items-center mt-32">
        <section className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 ">
        <h1 className="text-secondary font-medium text-sm md:text-2xl ">Thanks for buying from us!</h1>
        <Confetti active={cartProducts?.length > 0} config={config}/>
        </section>
    </main>

    </AuthCheck>

  )
}

export default success