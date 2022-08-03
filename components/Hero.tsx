import { UsersIcon } from "@heroicons/react/outline"
import { ChevronRightIcon } from "@heroicons/react/solid"
import { useRouter } from "next/router"
import { auth } from "../lib/firebase"

const Hero = () => {
   const router = useRouter()
   const user = auth?.currentUser

   function handlePushUser() {
    if(user) {
      router.push("/contact")
    } else {
      router.push("/signin")
    }
   }

  return (

    <main className="flex xl:max-w-8xl mx-auto flex-col md:flex-row-reverse justify-between  md:space-x-10 h-[80vh] items-center">

        <div>
          <img className="max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl lg:pt-8 xl:max-w-2xl 2xl:pt-24 2xl:max-w-3xl" src="/hero.png"/>

        </div>

        <div className="flex flex-col justify-center md:w-[200px] lg:w-full">
        <div className="flex flex-col  space-y-2 md:space-y-3  text-center  md:text-left ">
          <p className="text-secondary font-medium text-xs">Welcome to our shop</p>
          <h1 className="text-primary font-bold md:text-3xl lg:text-5xl xl:text-6xl xl:w-[500px] md:w-[250px] lg:w-[350px] text-xl">All you need under one roof</h1>
          <p className="text-third leading-[150%] w-[300px] md:w-[250px] lg:w-[300px] text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed mauris et nulla pretium. 
          Nunc rutrum amet et elementum sit neque. Turpis gravida feugiat ornare.  </p>
        <div className="flex justify-center md:justify-start pt-3  space-x-3 ">
          {/* User can access a page with all available products */}
          <button type="button" onClick={() => router.push("/shop")} className="accentButton text-white">Shop Now</button>
          {/* User will acces a page with a contact form he's logged in, otherwise the button will redirect
          him to the sign in page */}
          <button type="button" onClick={handlePushUser} className="primaryButton">
            {user ?  (<span className="inline-block">Get in touch <ChevronRightIcon className="h-4 inline-block pb-0.5"/></span>) : 
            (<span className="inline-block"><UsersIcon className="h-4 pr-1 inline-block"/> Sign In</span>)}
            </button>
            
        </div>
        </div>
    <div className="flex justify-around md:justify-between md:max-w-[240px] lg:max-w-[320px] pt-12 pb-12 md:pb-0">

            <div className="flex flex-col text-center space-y-2">
               <h2 className="hero-smallHeading">85K<span className="text-secondary font-bold">+</span></h2>
               <p className="text-xs xl:text-sm ">Happy clients</p>
            </div>

            <div className="flex flex-col text-center space-y-2">
               <h2 className="hero-smallHeading">99<span className="text-secondary font-bold">%</span></h2>
               <p className="text-xs xl:text-sm">Protection</p>
            </div>


            <div className="flex flex-col text-center space-y-2">
               <h2 className="hero-smallHeading">101<span className="text-secondary font-bold">%</span></h2>
               <p className="text-xs xl:text-sm">Love</p>
            </div>


        </div>
        </div>
    </main>

  )
}

export default Hero