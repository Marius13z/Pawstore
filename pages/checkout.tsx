import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import CheckoutForm from "../components/CheckoutForm"



const checkout:NextPage = () => {
  const [order, setOrder] = useState(false)
  const router = useRouter()
  
  if(order === true) {
    router.push("/success")
  }

  return (
    <div>
      
        <CheckoutForm  
        setOrder={setOrder}
        />
     
    </div>
  )
}

export default checkout