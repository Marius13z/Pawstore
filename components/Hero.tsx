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

    <main className="flex xl:max-w-7xl mx-auto flex-col md:flex-row-reverse justify-between md:justify-around md:space-x-10 h-[80vh] items-center">

        <div className="">
          <img className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl lg:pt-8 xl:max-w-2xl" src="/hero.png"/>

        </div>

        <div className="flex flex-col md:w-[200px] lg:w-full">
        <div className="flex flex-col  space-y-1 md:space-y-3  text-center  md:text-left ">
          <p className="text-secondary font-medium text-xs">Welcome to our shop</p>
          <h1 className="text-primary font-bold md:text-3xl lg:text-5xl xl:text-6xl xl:w-[500px] md:w-[250px] lg:w-[350px] text-xl">All you need under one roof</h1>
          <p className="text-third leading-[150%] w-[300px] md:w-[250px] lg:w-[300px] text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed mauris et nulla pretium. 
          Nunc rutrum amet et elementum sit neque. Turpis gravida feugiat ornare.  </p>
        <div className="flex justify-center md:justify-start pt-3  space-x-3 ">
          <button onClick={() => router.push("/shop")} className="accentButton text-white">Shop Now</button>
          <button onClick={handlePushUser} className="primaryButton flex justify-center items-center">
            <div>{!user && (<UsersIcon className="h-3.5 pr-1 "/>)}</div>
            {user ? "Get in touch" : "Sign In"}</button>
            
        </div>
        </div>
    <div className="flex  justify-around md:justify-between md:max-w-[240px] pt-12 pb-12 md:pb-0">

            <div className="flex flex-col text-center space-y-2">
               <h2 className="text-primary md:text-lg lg:text-2xl  font-semibold">85K<span className="text-secondary font-bold">+</span></h2>
               <p className="text-xs ">Happy clients</p>
            </div>

            <div className="flex flex-col text-center space-y-2">
               <h2 className="text-primary md:text-lg lg:text-2xl  font-semibold">99<span className="text-secondary font-bold">%</span></h2>
               <p className="text-xs">Protection</p>
            </div>


            <div className="flex flex-col text-center space-y-2">
               <h2 className="text-primary md:text-lg lg:text-2xl font-semibold">101<span className="text-secondary font-bold">%</span></h2>
               <p className="text-xs">Love</p>
            </div>


        </div>
        </div>
    </main>

  )
}

export default Hero