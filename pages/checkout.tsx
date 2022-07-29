import { CheckCircleIcon } from "@heroicons/react/solid"
import { doc, DocumentData, onSnapshot } from "firebase/firestore"
import { NextPage } from "next"
import { useEffect, useState } from "react"
import { auth, db } from "../lib/firebase"

const checkout:NextPage = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("card")
  const [deliveryAddress, setDeliveryAddress] = useState<string>("default")
  const [userDetails, setUserDetails] = useState<DocumentData>()
  const [checkoutProceeded, setCheckoutProceeded] = useState<boolean>()
  const user = auth.currentUser

  const docRef = doc(db, "users", `${user?.uid}`)

  useEffect(() => {
    return onSnapshot(docRef, (snapshot) => setUserDetails(snapshot?.data()))
  }, [user])
  
  return (
    <div>
      {checkoutProceeded ? (
        <div className="flex flex-col h-[80vh] space-y-2 justify-center items-center">
          <h1 className=" text-center text-secondary text-2xl md:text-3xl">Thanks your for buying from Pawstore</h1>
          <h1 className="text-secondary text-2xl md:text-2xl"> Your order is on the way!</h1>
        </div>
       ) : (
    <div>
       <h1 className="text-primary text-xl md:text-3xl text-center mt-20">You can<span className="text-secondary"> choose</span> a new address or an existing one</h1>

    <div className="flex mt-10 px-16 md:space-x-20 space-x-10 justify-center  items-center">
      <div onClick={() => setDeliveryAddress("new")} className="flex flex-col space-y-5 cursor-pointer">
      <div className="space-y-1">
      <h2 className={`text-sm md:text-base text-primary`}>E-mail address</h2>
      <div className={`border flex items-center  p-2 max-w-[170px] md:min-w-[240px] md:h-[35px] md:rounded-lg h-[33px] rounded-md shadow-md border-primary`}>
      <input className={` outline-none  placeholder:text-third text-xs md:text-sm
      ${deliveryAddress === "new" ? " placeholder:text-secondary text-secondary" : "text-primary placeholder:text-third"}`} 
      placeholder="abcde@gmail.com"/>
      </div>
      </div>

      <div className="space-y-1">
      <h2 className={`text-sm md:text-base text-primary`}>Phone Number</h2>
      <div className={`border flex items-center  p-2 max-w-[170px] md:min-w-[240px] md:h-[35px] md:rounded-lg h-[33px] rounded-md shadow-md border-primary`}>
      <input className={` outline-none  placeholder:text-third text-xs md:text-sm
      ${deliveryAddress === "new" ? " placeholder:text-secondary text-secondary" : "text-primary placeholder:text-third"}`} 
      placeholder="+0743825731"/>
      </div>
      </div>

      <div className="space-y-1">
      <h2 className={`text-sm md:text-base text-primary`}>Country</h2>
      <div className={`border flex items-center  p-2 max-w-[170px] md:min-w-[240px] md:h-[35px] md:rounded-lg h-[33px] rounded-md shadow-md border-primary`}>
      <input className={` outline-none  placeholder:text-third text-xs md:text-sm
      ${deliveryAddress === "new" ? " placeholder:text-secondary text-secondary" : "text-primary placeholder:text-third"}`} 
      placeholder="ex: Romania"/>
      </div>
      </div>

      <div className="space-y-1">
      <h2 className={`text-sm md:text-base text-primary`}>City</h2>
      <div className={`border flex items-center  p-2 max-w-[170px] md:min-w-[240px] md:h-[35px] md:rounded-lg h-[33px] rounded-md shadow-md border-primary`}>
      <input className={` outline-none  placeholder:text-third text-xs md:text-sm
      ${deliveryAddress === "new" ? " placeholder:text-secondary text-secondary" : "text-primary placeholder:text-third"}`} 
      placeholder="Timisoara"/>
      </div>
      </div>

      <div className="space-y-1">
      <h2 className={`text-sm md:text-base text-primary`}>Delivery</h2>
      <div className={`border flex items-center  p-2 max-w-[170px] md:min-w-[240px] md:h-[35px] md:rounded-lg h-[33px] rounded-md shadow-md border-primary`}>
      <input className={` outline-none  placeholder:text-third text-xs md:text-sm
      ${deliveryAddress === "new" ? " placeholder:text-secondary text-secondary" : "text-primary placeholder:text-third"}`} 
      placeholder="Street"/>
      </div>
      </div>

      

     

     

      
      </div>

      <div className="flex flex-col">
          <div onClick={() => setDeliveryAddress("default")} className={`border p-2 overflow-hidden active:scale-90
           transition duration-300 ease-out md:space-y-1 ml-8
           active:shadow-sm shadow-md cursor-pointer h-36 w-44 rounded-md md:h-44 md:w-[240px]  md:self-start
           ${deliveryAddress === "default" ? "text-secondary border-secondary" : "text-primary border-primary"}`}>
            <p className="text-xs md:text-sm">{userDetails?.email}</p>
            <p className="text-xs md:text-sm">{userDetails?.phoneNumber}</p>
            <p className="text-xs md:text-sm">{userDetails?.deliveryAddress}</p>
            <p className="text-xs md:text-sm">{userDetails?.city}</p>
            <p className="text-xs md:text-sm">{userDetails?.country}</p>
          </div>
    <div className="flex flex-col space-y-4 justify-center items-center mt-10">
        <div onClick={() => setPaymentMethod("card")} className="flex group  items-center space-x-2 ">
        <CheckCircleIcon className={`h-6 transition duration-300 group-active:scale-125
         ${paymentMethod === "card" ? "text-secondary" : "text-third"}`}/>
          <button className={`border flex p-2 text-xs rounded-lg transition duration-300 w-[170px] md:w-[240px]
           md:h-[35px] cursor-pointer shadow-md 
           ${paymentMethod === "card" ? "text-secondary border-secondary" : "text-third border-primary"}`}>
            Pay with Visa/Mastercard</button>
         </div>
         <div onClick={() => setPaymentMethod("cash")} className="flex group  items-center space-x-2 ">
        <CheckCircleIcon className={`h-6 transition duration-300 group-active:scale-125
         ${paymentMethod === "cash" ? "text-secondary" : "text-third"}`}/>
          <button className={`border flex p-2 text-xs rounded-lg transition duration-300 w-[170px] md:w-[240px] 
           md:h-[35px] cursor-pointer shadow-md 
          ${paymentMethod === "cash" ? "text-secondary border-secondary" : "text-third border-primary"}`}>
            Pay with cash</button>
         </div>
    </div>
            <button onClick={() => setCheckoutProceeded(true)} className="bg-secondary w-[170px] md:w-[240px] ml-7
             mt-8 rounded-md text-xs shadow-md active:scale-90 active:shadow-sm duration-300 transition ease-out  text-white p-2">Proceed to checkout</button>

      </div>
    </div>
    </div>
      )}
     
    
    
    
    </div>
  )
}

export default checkout