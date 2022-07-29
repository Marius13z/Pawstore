import { UsersIcon } from "@heroicons/react/outline"
import { useRouter } from "next/router"
import { auth } from "../lib/firebase"

const Hero = () => {
   const router = useRouter()
   const user = auth?.currentUser

   function handlePushUser() {
    if(user) {
      router.push("/contactus")
    } else {
      router.push("/signin")
    }
   }

  return (

    <main className="flex flex-col pt-10 md:flex-row-reverse justify-between items-center h-[80%]">

        <div>
          <img className=" md:max-w-md lg:max-w-lg lg:mt-16 xl:max-w-3xl" src="/hero.png"/>

        </div>

        <div className="flex  flex-col px-16">
        <div className="flex flex-col text-center max-w-xl  md:text-left ">
          <p className="text-secondary font-semibold text-sm">Welcome to our shop</p>
          <h1 className="mainHeading relative">All you need under one roof</h1>
          <p className="smallParagraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed mauris et nulla pretium. 
          Nunc rutrum amet et elementum sit neque. Turpis gravida feugiat ornare.  </p>
        <div className="flex justify-center md:justify-start p-2 space-x-2 pl-0">
          <button onClick={() => router.push("/shop")} className="accentButton text-white">Shop Now</button>
          <button onClick={handlePushUser} className="primaryButton flex justify-center items-center">
            <div>{!user && (<UsersIcon className="h-3.5 pr-1 "/>)}</div>
            {user ? "Get in touch" : "Sign In"}</button>
            
        </div>
        </div>
    <div className="flex  justify-between max-w-sm md:max-w-xs pt-12 pb-12">

            <div className="flex flex-col text-center space-y-2">
               <h2 className="text-primary text-2xl font-semibold">85K<span className="text-secondary font-bold">+</span></h2>
               <p className="text-xs ">Happy clients</p>
            </div>

            <div className="flex flex-col text-center space-y-2">
               <h2 className="text-primary text-2xl font-semibold">99<span className="text-secondary font-bold">%</span></h2>
               <p className="text-xs">Protection</p>
            </div>


            <div className="flex flex-col text-center space-y-2">
               <h2 className="text-primary text-2xl font-semibold">101<span className="text-secondary font-bold">%</span></h2>
               <p className="text-xs">Love</p>
            </div>


        </div>
        </div>
    </main>

  )
}

export default Hero