import { collection, DocumentData, onSnapshot } from "firebase/firestore"
import { NextPage } from "next"
import { useContext, useEffect, useState } from "react"
import UserCart from "../components/UserCart"
import { auth, db } from "../lib/firebase"
import { ShoppingCartIcon } from "@heroicons/react/outline"
import { useRouter } from "next/router"


const cart:NextPage = () => {
   // Store products to be displayed later on UI
   const [products, setProducts] = useState<DocumentData>()
   const user = auth.currentUser
   const router = useRouter()

   const colRef = collection(db, "users", `${user?.uid}`, "cart")

   useEffect(() => {
     return onSnapshot(colRef, (snapshot) => setProducts(snapshot.docs))
   }, [user])

   const calculateSubtotal = products?.map((product:DocumentData) => {
         return product?.data().price * product?.data().quantity
      })

   const subtotal = calculateSubtotal?.reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0)

   
  return (
   <div>
     {products?.length === 0 ? (
        <div className="flex flex-col h-[80vh] space-y-2 justify-center items-center">
        <h1 className=" text-center text-secondary text-3xl md:text-4xl">Your cart is empty!</h1>
      </div>
     ) : (
        <>
        
    <div className="flex flex-col max-w-5xl mx-auto space-y-10 lg:items-start items-center">
  
  <div className="flex justify-center pt-10 space-x-4 items-center">
      <h1 className="font-semibold text-primary text-3xl"><span className="text-secondary">Personal</span> Cart</h1>
      <ShoppingCartIcon className="text-primary h-6"/>
  </div>

      
    
    {products && products?.map((product:DocumentData) => ( 
   <UserCart image={product?.data().image} 
   id={product?.id} 
   key={product?.id} 
   price={product?.data().price}
   quantity={product?.data().quantity}
   name={product?.data().name}/>     
     ))} 
      </div>

    
      <div className="sticky lg:w-[400px] pt-5 pb-5 mr-16 lg:border-primary lg:bottom-[300px]
       lg:rounded-xl lg:shadow-md lg:left-[1000px] bottom-0 flex bg-white 
         border-gray-200 items-center border w-full flex-col mt-5 space-y-4">
            <h3 className="font-semibold pb-2 pt-2 text-primary ">Your order summary</h3>
            <div className="flex w-56 justify-between">
               <p className="text-sm text-primary ">Subtotal</p>
               <p className="text-sm text-primary ">{subtotal} EUR</p>
            </div>
            <div className="flex w-56 justify-between">
               <p className="text-sm text-primary ">Shipping Cost</p>
               <p className="text-sm text-primary ">10 EUR</p>
            </div>
            <hr className="w-56 h-[3px] bg-primary"/>
            <div className="flex w-56 justify-between">
               <p className="text-sm text-primary  font-medium">Total</p>
               <p className="text-sm  text-primary font-medium">{subtotal + 10} EUR</p>
            </div>
            <div className="pb-4">

            <button onClick={() => router.push("/checkout")} className="rounded-md p-2 w-64 text-xs 
            transition duration-300 active:scale-90 border-secondary border
             hover:border-primary hover:text-primary text-secondary">Proceed to checkout</button>
            </div>
        </div>
        </>
     )}
   </div>

      
  )
}

export default cart