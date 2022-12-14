import { CashIcon, CreditCardIcon } from "@heroicons/react/outline"
import axios from "axios"
import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import getStripe from '../lib/getStripe'
import { useCartData, useUserFirestoreData } from "../lib/hooks"
import { CheckoutFormData, Product } from "../typing"
import Error404 from "./Error404"




interface Props {
    setOrder: Dispatch<SetStateAction<boolean>>
}


const Checkout = ( { setOrder }:Props ):JSX.Element => {
    // User can choose his saved delivery adress or a new one
    const [address, setAddress] = useState("profileAddress")
    // User profile delivery details 
    const user = useUserFirestoreData()
    // User can choose to pay with card or cash
    const [paymentMethod, setPaymentMethod] = useState("card")
    // All products available in user cart
    const cartProducts = useCartData()
    // Hook to register a new address values, handle validation and errors
    const { register, formState: { errors }, handleSubmit } = useForm<CheckoutFormData>()
    // Store all products so the fetch works otherwise it returns undefined
     const productsInCart = cartProducts?.map((product:Product) => {
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

    <h1 className="text-primary text-xs font-medium sm:font-normal sm:text-lg md:text-3xl text-center mt-20">You can<span className="text-secondary"> choose</span> a new address or an existing one</h1>


 <div className="flex flex-col sm:flex-row mt-10 mb-10 px-16 sm:space-x-20  justify-center  items-center">

   <ul onClick={() => setAddress("new")} className="flex flex-col space-y-5 cursor-pointer">

   <li className="space-y-1">

   <label className="checkout-label">E-mail</label>

    {/* The user must complete the form only in the constraints 
    imposed by the maximum number of characters only if the he has chosen a new delivery address */}

   <input type="email" {...register("email", 
   { required: true, 
   disabled: address === "profileAddress" && true, 
   minLength: { value: 7, message: "Email is too short" }, 
   maxLength: { value: 25, message: "Email limit is 25 characters" } })} 
   className={` checkout-input
   ${address === "new" ? " placeholder:text-secondary text-secondary" : "text-primary placeholder:text-third"}`} 
   placeholder="abcde@gmail.com"/>
   {address === "new" && <p className="input-error">{errors.city?.type === "required" ? "Email is required" : errors.email?.message}</p>}
   </li>




   <li className="space-y-1">

   <label className="checkout-label">Phone Number</label>


    {/* The user must complete the form only in the constraints 
    imposed by the maximum number of characters only if the he has chosen a new delivery address */}

   <input type="number" {...register("phoneNumber",
    { required: true, 
      disabled: address === "profileAddress" && true, 
      minLength: { value: 8, message: "Phone number is too short" }, 
      maxLength: { value: 11, message: "Phone number limit is 11 characters" } })} 
      className={` checkout-input
   ${address === "new" ? " placeholder:text-secondary text-secondary" : "text-primary placeholder:text-third"}`} 
   placeholder="+0743825731"/>

   {address === "new" && <p className="input-error">{errors.phoneNumber?.type === "required" ? "Phone number is required" : errors.phoneNumber?.message}</p>}
   </li>
   


   <li className="space-y-1">

   <label className="checkout-label">Country</label>

    {/* The user must complete the form only in the constraints 
    imposed by the maximum number of characters only if the he has chosen a new delivery address */}

   <input type="text" {...register("country", 
   { required: true, 
    disabled: address === "profileAddress" && true,
    minLength: { value: 3, message: "Country is too short" },
    maxLength: { value: 15, message: "Country limit is 15 characters" } })} 
    className={` checkout-input
   ${address === "new" ? " placeholder:text-secondary text-secondary" : "text-primary placeholder:text-third"}`} 
   placeholder="ex: Romania"/>

   {address === "new" &&  <p className="input-error">{errors.country?.type === "required" ? "Country is required" : errors.country?.message}</p>}
   </li>

  

   <li className="space-y-1">

   <label className="checkout-label">City</label>

    {/* The user must complete the form only in the constraints 
    imposed by the maximum number of characters only if the he has chosen a new delivery address */}

   <input type="text" {...register("city", 
   { required: true, disabled: address === "profileAddress" && true, 
    minLength: { value: 3, message: "City is too short" },
    maxLength: { value: 15, message: "City limit is 15 characters" } })} 
    className={` checkout-input
    ${address === "new" ? " placeholder:text-secondary text-secondary" : "text-primary placeholder:text-third"}`} 
     placeholder="Timisoara"/>

   {address === "new" && <p className="input-error">{errors.city?.type === "required" ? "City is required" : errors.city?.message}</p>}

   </li>

   <li className="space-y-1">

   <label className="checkout-label">Delivery Address</label>

 

    {/* The user must complete the form only in the constraints 
    imposed by the maximum number of characters only if the he has chosen a new delivery address */}

   <input type="text" {...register("deliveryAddress", 
   { required: true, 
    disabled: address === "profileAddress" && true, 
    minLength: { value: 5, message: "Delivery is too short" },
    maxLength: { value: 30, message: "Delivery adress limit is 30 characters" } },)}
    className={`checkout-input 
    ${address === "new" ? " placeholder:text-secondary text-secondary" : "text-primary placeholder:text-third"}`} 
    placeholder="Street"/>
   {address === "new" && <p className="input-error">{errors.deliveryAddress?.type === "required" ? "Delivery address is required" : errors.deliveryAddress?.message}</p>}
   </li>
   

  
   </ul>

    

   <div className="flex flex-col mt-8 sm:mt-0 space-y-5 xl:space-y-6">
        { /* User can choose the delivery address saved on his profile and highlight his choice */}
       <ul onClick={() => setAddress("profileAddress")} className={`border p-2 overflow-hidden active:scale-90
        transition duration-300 ease-out sm:space-y-1  border-gray-200 bg-white
        active:shadow-sm shadow-md cursor-pointer h-32 w-[200px] rounded-md sm:h-44 sm:w-[240px]  md:self-start
        ${address === "profileAddress" ? "text-secondary" : "text-third"}`}>
         <li className="checkout-information lir-1">{user?.email}</li>
         <li className="checkout-information">{user?.lihoneNumber}</li>
         <li className="checkout-information">{user?.deliveryAddress}</li>
         <li className="checkout-information">{user?.city}</li>
         <li className="checkout-information">{user?.country}</li>
       </ul>

 <div className="flex flex-col space-y-3 sm:space-y-4 md:justify-center md:items-center">
     {/* User can choose the payment method and highlight his choice */}

      {/* Card payment method */}
       <button onClick={() => setPaymentMethod("card")} type="button"
        className={`payment-button ${paymentMethod === "card" ? "text-secondary" : "text-third "}`}>
         <CreditCardIcon className={` h-4 sm:h-5 pr-2
         ${paymentMethod === "card" ? "text-secondary" : "text-third"}`}/>Pay with card</button>


        {/* Cash payment method */}
       <button onClick={() => setPaymentMethod("cash")} type="button" 
       className={`payment-button ${paymentMethod === "cash" ? "text-secondary" : "text-third"}`}>
       <CashIcon className={` h-4 sm:h-5 pr-2
         ${paymentMethod === "cash" ? "text-secondary" : "text-third"}`}/>Pay with cash</button>

 </div>
      
      {/* Button used so the user can submit the form */}
         <button type="submit" className="bg-primary hover:bg-secondary text-xs  w-[200px] sm:w-[240px]
           rounded-md sm:text-sm shadow-md  active:scale-90 active:shadow-sm duration-300 transition 
           ease-out text-white font-medium p-2">Order now</button>

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