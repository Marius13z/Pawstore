import { addDoc, collection } from "firebase/firestore"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { db } from "../lib/firebase"

type FormData = {
  email: string
  message: string
}

const contact:NextPage = () => {
  // Router used to push user to other pages
  const router = useRouter()
  const { register, formState: { errors }, handleSubmit } = useForm<FormData>()

  const onSubmit = async (e: FormData) => {
     const colRef = collection(db, "messages")

     await addDoc(colRef, {
        email: e.email,
        message: e.message
     })

     toast.success("You have sent us a message!")

     router.push("/")
  }

  // When user has sent the form he will be redirected to homepage and shown a message 


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center space-y-3 items-center h-[80vh] flex-col">
       <h1 className="text-primary font-normal sm:font-medium text-lg sm:text-xl md:text-2xl ">Contact us through the form below!</h1>
       <hr className="h-[2px] w-[250px] sm:h-[3px] sm:w-[350px] text-primary bg-primary"/>

       <ul className="relative space-y-5 right-2">

       <li className="flex flex-col pt-5">
       <label className="text-primary text-xs sm:text-base font-medium">E-mail</label>
       <input type="email" {...register("email", {required: true, 
       maxLength: { value: 35, message: "Email is too long"}, 
       minLength: { value: 15, message: "Email is too short"}})} className="shadow-md outline-none w-[150px] sm:w-[250px] border-b border-t-0 border-right-0 border-top-0 border-primary p-2
       rounded-lg placeholder:text-third text-sm text-primary placeholder:text-xs sm:placeholder:text-sm"
       placeholder="ex: abcdefgh@gmail.com"
       />
       <p className="input-error">{errors.email?.type === "required" ? "Please enter an email address" : errors.email?.message}</p>
       </li>
       
       <li className="flex pb-2 flex-col">
       <label className="text-primary text-xs sm:text-base font-medium">Feedback</label>
       <textarea {...register("message", {required: true, 
       maxLength: {value: 250, message: "Your message is too long"}, 
       minLength: {value: 25, message: "Your message is too short"}})} 
       className="shadow-md outline-none border-primary p-1
       rounded-lg border-b border-t-0 border-right-0 border-top-0 h-[200px] w-[250px]
        sm:w-[350px] pl-2 pr-2 placeholder:text-third text-x sm:text-sm placeholder:text-xs sm:placeholder:text-sm  text-primary"
       placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
       Proin sed mauris et nulla pretium. Nunc rutrum amet et elementum sit neque. 
       Turpis gravida feugiat ornare vulputate cum magna nulla orci. "
       />
        <p className="input-error">{errors.message?.type === "required" ? "You must enter a message" : errors.message?.message}</p>
       </li>

       {/* Button used so the user can send the form */}
       <li>
       <button type="submit" className="rounded-lg w-[250px] sm:w-[350px] hover:bg-secondary hover:border-secondary
        transition duration-300
        p-2 text-xs bg-primary border text-white">Send Message</button>
       </li>

       </ul>
    </form>
 
  )
}

export default contact