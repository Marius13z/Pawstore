import { DocumentData } from "firebase/firestore"
import { NextPage } from "next"
import UserCart from "../components/UserCart"
import { ShoppingCartIcon } from "@heroicons/react/outline"
import { useRouter } from "next/router"
import { useCartData } from "../lib/hooks"
import AuthCheck from "../components/AuthCheck"
import { Product } from "../typing"


const cart:NextPage = () => {
   // Products shown on UI
   const products = useCartData()
   // Router used to push user to other pages
   const router = useRouter()

   // Calculate the bill for user products
   const calculateSubtotal = products?.map((product:Product) => {
         return product?.price * product?.quantity!
      })

   const subtotal = calculateSubtotal?.reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0)

   
  return (
   <AuthCheck>

   <main>
      {/* If the user doesn't have any products show him an empty cart
      otherwise show him his cart products and bill
      */}
     {products?.length === 0 ? (
        <section className="flex flex-col h-[80vh] space-y-2 justify-center items-center">
        <h1 className=" text-center text-secondary text-3xl md:text-4xl">Your cart is empty!</h1>
        </section>
     ) : (
        <>
        
    <section className="flex flex-col max-w-4xl mx-auto space-y-1 lg:items-start items-center">
  
    <div className="flex pt-10 items-center justify-center space-x-2 ">
      <ShoppingCartIcon className="text-primary h-4 md:h-5 lg:h-6"/>
      <span className="font-semibold text-primary md:text-xl lg:text-2xl">Cart</span>
     </div>

      
    {/* Cart products */}
    {products && products?.map((product:DocumentData) => ( 
   <UserCart image={product?.image} 
   id={product?.id} 
   key={product?.id} 
   price={product?.price}
   quantity={product?.quantity}
   name={product?.name}/>     
     ))} 
      </section>

    {/* Order bill */}
      <section className="sticky bottom-0 lg:w-[300px] pt-5 pb-5 sm:mr-16 lg:border lg:border-gray-200 lg:bottom-[340px]
       lg:rounded-xl lg:shadow-lg lg:left-[1000px]  flex bg-body items-center w-full flex-col mt-5 space-y-4">
            <h3 className="font-semibold pb-2 pt-2 text-primary ">Your order summary</h3>
            <div className="flex w-56 justify-between">
               <p className="text-xs  text-primary ">Subtotal</p>
               <p className="text-xs text-primary ">{subtotal} EUR</p>
            </div>
            <div className="flex w-56 justify-between">
               <p className="text-xs text-primary ">Shipping Cost</p>
               <p className="text-xs text-primary ">10 EUR</p>
            </div>
            <hr className="w-56 h-[1px] bg-primary"/>
            <div className="flex w-56 justify-between">
               <p className="text-xs text-primary  font-medium">Total</p>
               <p className="text-xs  text-primary font-medium">{subtotal + 10} EUR</p>
            </div>
            <div className="pb-4 pt-2">

           {/* Button to push user to checkout page */}
            <button onClick={() => router.push("/checkout")} className="rounded-md p-2 w-64 lg:w-48  text-xs 
            transition duration-300 active:scale-90 border-secondary border 
             hover:border-primary hover:text-primary text-secondary">Proceed to checkout</button>
            </div>
        </section>
        </>
     )}
   </main>
   </AuthCheck>

      
  )
}

export default cart