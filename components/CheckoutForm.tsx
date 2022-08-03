import { CheckCircleIcon } from "@heroicons/react/solid"
import axios from "axios"
import {  DocumentData } from "firebase/firestore"
import Router, { useRouter } from "next/router"
import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import getStripe from '../lib/getStripe'
import { useCartData, useUserFirestoreData } from "../lib/hooks"
import Error404 from "./Error404"



interface Props {
    setOrder: Dispatch<SetStateAction<boolean>>
}

type FormData = {
    email: string
    deliveryAddress: string
    country: string
    city: string
    phoneNumber: string
  };

  
  

const Checkout = ( {  setOrder }:Props ):JSX.Element => {
    // User can choose his saved delivery adress or a new one
    const [address, setAddress] = useState<string>("profileAddress")
    // User profile delivery details 
    const user = useUserFirestoreData()
    // User can choose to pay with card or cash
    const [paymentMethod, setPaymentMethod] = useState("card")
    // All products available in user cart
    const cartProducts = useCartData()
    // Hook to register a new address values, handle validation and errors
    const { register, formState: { errors }, handleSubmit } = useForm<FormData>()
    // Store all products so the fetch works otherwise it returns undefined
     const productsInCart = cartProducts?.map((product:DocumentData) => {
      return {
        name: product?.name,
        price: product?.price,
        quantity: product?.quantity,
        image: product?.image
      }
     })

  
    // Make fetch with products in cart to get products, their quantity and total value
    // in order to display them when paying with card method
    const handleCardPayment = async () => {
      const stripe = await getStripe()

      const response = await axios.post("/api/stripe", {
        productsInCart
      })

      if(response.status === 500) return;

      toast.loading('Redirecting...')

      await stripe.redirectToCheckout({ sessionId: response.data.id })

    }


    const onSubmit = async () => {
      // When the user chooses a new adress check for input errors otherwise check just for payment method
      if(address === "new") {
            
            if(errors.city || errors.country || errors.deliveryAddress || errors.email || errors.phoneNumber) {
             return;
            }
           // If there are no errors check for type of payment
           // if user wants to pay with card he will be redirected to a stripe checkout page
           // otherwise he will receive a thank you message
            if(paymentMethod === "card") {
              await handleCardPayment()
            } else {
              setOrder(true)
            }

      } else if(address === "profileAddress") {

          // if user wants to pay with card he will be redirected to a stripe checkout page
          // otherwise he will receive a thank you message
          if(paymentMethod === "card") {
           await handleCardPayment()
          } else {
          setOrder(true)
         }

      }

    }



  return (
    <>
    {cartProducts?.length > 0 ? (


    <form onSubmit={handleSubmit(onSubmit)}>

    <h1 className="text-primary text-lg md:text-3xl text-center mt-20">You can<span className="text-secondary"> choose</span> a new address or an existing one</h1>


 <div className="flex mt-10 mb-10 px-16 sm:space-x-20 space-x-10 justify-center  items-center">

   <div onClick={() => setAddress("new")} className="flex flex-col space-y-5 cursor-pointer">

   <div className="space-y-1">

   <label className="checkout-label">E-mail</label>
   <div className="checkout-container">

    {/* The user must complete the form only in the constraints 
    imposed by the maximum number of characters only if the he has chosen a new delivery address */}

   <input type="email" {...register("email", 
   { required: true, 
   disabled: address === "profileAddress" && true, 
   maxLength: { value: 25, message: "Email limit is 25 chars" } })} 
   className={` checkout-input
   ${address === "new" ? " placeholder:text-secondary text-secondary" : "text-primary placeholder:text-third"}`} 
   placeholder="abcde@gmail.com"/>
   </div>
   {address === "new" && <p className="input-error">{errors.city?.type === "required" ? "Email is required" : errors.email?.message}</p>}


   </div>

   <div className="space-y-1">

   <label className="checkout-label">Phone Number</label>

   <div className="checkout-container">

    {/* The user must complete the form only in the constraints 
    imposed by the maximum number of characters only if the he has chosen a new delivery address */}

   <input type="number" {...register("phoneNumber",
    { required: true, 
      disabled: address === "profileAddress" && true, 
      maxLength: { value: 11, message: "Phone number limit is 11 chars" } })} 
      className={` checkout-input
   ${address === "new" ? " placeholder:text-secondary text-secondary" : "text-primary placeholder:text-third"}`} 
   placeholder="+0743825731"/>
   </div>
   {address === "new" && <p className="input-error">{errors.phoneNumber?.type === "required" ? "Phone number is required" : errors.phoneNumber?.message}</p>}
   

   </div>

   <div className="space-y-1">

   <label className="checkout-label">Country</label>

   <div className="checkout-container">

    {/* The user must complete the form only in the constraints 
    imposed by the maximum number of characters only if the he has chosen a new delivery address */}

   <input type="text" {...register("country", 
   { required: true, 
    disabled: address === "profileAddress" && true,
    maxLength: { value: 15, message: "Country limit is 15 chars" } })} 
    className={` checkout-input
   ${address === "new" ? " placeholder:text-secondary text-secondary" : "text-primary placeholder:text-third"}`} 
   placeholder="ex: Romania"/>
   </div>
   {address === "new" &&  <p className="input-error">{errors.country?.type === "required" ? "Country is required" : errors.country?.message}</p>}

   </div>

   <div className="space-y-1">

   <label className="checkout-label">City</label>

   <div className="checkout-container">

    {/* The user must complete the form only in the constraints 
    imposed by the maximum number of characters only if the he has chosen a new delivery address */}

   <input type="text" {...register("city", 
   { required: true, disabled: address === "profileAddress" && true, 
    maxLength: { value: 15, message: "City limit is 15 chars" } })} 
    className={` checkout-input
    ${address === "new" ? " placeholder:text-secondary text-secondary" : "text-primary placeholder:text-third"}`} 
     placeholder="Timisoara"/>
   </div>
   {address === "new" && <p className="input-error">{errors.city?.type === "required" ? "City is required" : errors.city?.message}</p>}


   </div>

   <div className="space-y-1">

   <label className="checkout-label">Delivery Address</label>

   <div className="checkout-container">

    {/* The user must complete the form only in the constraints 
    imposed by the maximum number of characters only if the he has chosen a new delivery address */}

   <input type="text" {...register("deliveryAddress", 
   { required: true, 
    disabled: address === "profileAddress" && true, 
    maxLength: { value: 30, message: "Delivery adress limit is 30 chars" } },)}
    className={`checkout-input
    ${address === "new" ? " placeholder:text-secondary text-secondary" : "text-primary placeholder:text-third"}`} 
    placeholder="Street"/>
   </div>
   {address === "new" && <p className="input-error">{errors.deliveryAddress?.type === "required" ? "Delivery address is required" : errors.deliveryAddress?.message}</p>}
   

   </div>

   </div>

    

   <div className="flex flex-col space-y-5 xl:space-y-6">
        { /* User can choose the delivery address saved on his profile and highlight his choice */}
       <div onClick={() => setAddress("profileAddress")} className={`border p-2 overflow-hidden active:scale-90
        transition duration-300 ease-out sm:space-y-1 sm:ml-8 border-gray-200 bg-white
        active:shadow-sm shadow-md cursor-pointer h-32 w-[120px] rounded-md sm:h-44 sm:w-[240px]  md:self-start
        ${address === "profileAddress" ? "text-secondary" : "text-third"}`}>
         <p className="checkout-information">{user?.email}</p>
         <p className="checkout-information">{user?.phoneNumber}</p>
         <p className="checkout-information">{user?.deliveryAddress}</p>
         <p className="checkout-information">{user?.city}</p>
         <p className="checkout-information">{user?.country}</p>
       </div>

 <div className="flex flex-col space-y-3 sm:space-y-4 justify-center items-center">
     {/* User can choose the payment method and highlight his choice */}
     <div onClick={() => setPaymentMethod("card")} className="checkout-buttonContainer group">
      {/* Card payment method */}
     <CheckCircleIcon className={`payment-check ${paymentMethod === "card" ? "text-secondary" : "opacity-0 text-third"}`}/>
       <button type="button"
        className={`payment-button ${paymentMethod === "card" ? "text-secondary" : "text-third "}`}>
         Pay with card</button>
      </div>
      <div onClick={() => setPaymentMethod("cash")} className="checkout-buttonContainer group">
        {/* Cash payment method */}
     <CheckCircleIcon className={`payment-check ${paymentMethod === "cash" ? "text-secondary" : "opacity-0 text-third"}`}/>
       <button type="button" className={`payment-button ${paymentMethod === "cash" ? "text-secondary" : "text-third"}`}>
         Pay with cash</button>
      </div>
 </div>
      
      {/* Button used so the user can submit the form */}
         <button type="submit" className="bg-primary hover:bg-secondary text-[0.60rem] w-[120px] sm:w-[240px]
           rounded-md sm:text-sm shadow-md sm:ml-8 active:scale-90 active:shadow-sm duration-300 transition 
           ease-out text-white p-[5px] md:p-2">Proceed to order</button>

   </div>

 </div>
   </form>

    ) : (
      <Error404/>
    )}
   </>
  )
}

export default Checkout