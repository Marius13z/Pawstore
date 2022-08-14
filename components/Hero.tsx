import { UsersIcon } from "@heroicons/react/outline"
import { ChevronRightIcon } from "@heroicons/react/solid"
import Link from "next/link"
import { auth } from "../lib/firebase"

const Hero = () => {
   const user = auth?.currentUser

  return (

    <main className="flex xl:max-w-8xl px-10 mx-auto flex-col md:flex-row-reverse justify-between  md:space-x-10 h-[80vh] items-center">

         <aside>
          <img className="max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl lg:pt-8 xl:max-w-2xl 2xl:pt-24 2xl:max-w-3xl" src="/hero.png"/>
         </aside>
        
        <section className="flex flex-col justify-center md:w-[200px] lg:w-full">

        <div className="flex flex-col  space-y-2 md:space-y-3  text-center  md:text-left ">

          <p className="text-secondary font-medium text-xs">Welcome to our shop</p>
          <h1 className="text-primary font-bold md:text-3xl lg:text-5xl xl:text-6xl xl:w-[500px] md:w-[250px] lg:w-[350px] text-xl">All you need under one roof</h1>
          <p className="text-third leading-[150%] w-[300px] md:w-[250px] lg:w-[300px] text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed mauris et nulla pretium. 
          Nunc rutrum amet et elementum sit neque. Turpis gravida feugiat ornare.  </p>

        <ul className="flex justify-center md:justify-start pt-3  space-x-3 ">
          {/* User can access a page with all available products */}
          <li>
           <Link href="/shop">
          <button type="button" className="btn-accent text-white">Shop Now</button>
           </Link>
          </li>
          {/* User will acces a page with a contact form he's logged in, otherwise the button will redirect
          him to the sign in page */}
          <li>
           <Link href={user ? "/contact" : "/signin"}>
          <button type="button" className=" bg-body text-primary hover:border-primary p-1 hover:border rounded-lg text-xs font-semibold
        w-32 h-9 transition-all duration-200 ease-out">
            {user ?  (<span className="inline-block">Get in touch <ChevronRightIcon className="h-4 inline-block pb-0.5"/></span>) : 
            (<span className="inline-block"><UsersIcon className="h-4 pr-1 inline-block"/> Sign In</span>)}
            </button>
           </Link>
          </li>
            
        </ul>

        </div>

    <ul className="flex justify-around md:justify-between md:max-w-[240px] lg:max-w-[320px] pt-12 pb-12 md:pb-0">

            <li className="about-container">
               <h2 className="about-heading">85K<span className="text-secondary font-bold">+</span></h2>
               <p className="about-paragraph">Happy clients</p>
            </li>

            <li className="about-container">
               <h2 className="about-heading">99<span className="text-secondary font-bold">%</span></h2>
               <p className="about-paragraph">Protection</p>
            </li>


            <li className="about-container">
               <h2 className="about-heading">101<span className="text-secondary font-bold">%</span></h2>
               <p className="about-paragraph">Love</p>
            </li>


        </ul>
        </section>
    </main>

  )
}

export default Hero