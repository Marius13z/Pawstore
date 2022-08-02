import {  doc, DocumentData, writeBatch } from "firebase/firestore"
import { auth, db } from "../lib/firebase"
import { useCartData } from "../lib/hooks"
import Confetti from 'react-dom-confetti'


const success = () => {
   const cartProducts = useCartData()
   const user = auth.currentUser

   // Delete cart after user has succeeded to pay 
    const deleteDocs = () => {
      const docId = cartProducts?.map((document:DocumentData) => document?.id)
      const batch = writeBatch(db)
      docId?.forEach((id:DocumentData) => {
        batch.delete(doc(db, "users", `${user?.uid}`, "cart", `${id}`))
     })
     batch.commit()
     console.log("batch removed")
    }

    // When user has paid he's redirected to the success page
    // if he still has more than one product in the cart the products 
    // will disappear
    if(cartProducts?.length > 0) {
        deleteDocs()
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
    <div className="flex justify-center items-center mt-32">
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 ">
        <h1 className="text-secondary font-medium text-sm md:text-2xl ">Successfuly paid for products!</h1>
        <Confetti active={cartProducts?.length > 0} config={config}/>

        </div>
    </div>
  )
}

export default success