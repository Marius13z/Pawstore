import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"


const contactus:NextPage = () => {
  // Check if user sent the form or not
  const [sentForm, setSentForm] = useState<boolean>()
  // Router used to push user to other pages
  const router = useRouter()

  // When user has sent the form he will be redirected to homepage and shown a message 
  function handleForm() {
    setSentForm(true)
    setTimeout(() => {
      router.push("/")
    }, 3000)
  }

  return (
    <>
    {/* Form to contact the pawstore team regarding problems */}
    {!sentForm ? (
    <div className="flex justify-center space-y-3 items-center h-[80vh] flex-col">
       <h1 className="text-primary font-normal sm:font-medium text-lg sm:text-xl md:text-2xl ">Contact us through the form below!</h1>
       <hr className="h-[2px] w-[250px] sm:h-[3px] sm:w-[350px] text-primary bg-primary"/>

       <div className="relative space-y-5 right-2">

       <div className="flex flex-col pt-5">
       <label className="text-primary text-xs sm:text-base font-medium">E-mail</label>
       <input className="shadow-md outline-none w-[150px] sm:w-[250px] border-b border-t-0 border-right-0 border-top-0 border-primary p-2
       rounded-lg placeholder:text-third text-sm text-primary placeholder:text-xs sm:placeholder:text-sm"
       placeholder="ex: abcdefgh@gmail.com"
       />

       </div>
       <div className="flex pb-2 flex-col">
       <label className="text-primary text-xs sm:text-base font-medium">Feedback</label>
       <textarea className="shadow-md outline-none border-primary p-1
       rounded-lg border-b border-t-0 border-right-0 border-top-0 h-[200px] w-[250px]
        sm:w-[350px] pl-2 pr-2 placeholder:text-third text-x sm:text-sm placeholder:text-xs sm:placeholder:text-sm  text-primary"
       placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
       Proin sed mauris et nulla pretium. Nunc rutrum amet et elementum sit neque. 
       Turpis gravida feugiat ornare vulputate cum magna nulla orci. "
       />

       </div>
       {/* Button used so the user can send the form */}
       <button onClick={handleForm} className="rounded-lg w-[250px] sm:w-[350px] hover:bg-secondary hover:border-secondary
        transition duration-300
        p-2 text-xs bg-primary border text-white">Send Message</button>
       </div>
    </div>
    ) : (
      <div className="flex flex-col h-[80vh] space-y-2 justify-center items-center">
        {/* When user has sent the form this message will be displayed on his screen */}
      <h1 className=" text-center text-secondary text-2xl md:text-3xl">Thanks for reaching us</h1>
      <h1 className="text-secondary text-2xl md:text-2xl">We'll be back with and e-mail shortly!</h1>
    </div>
    )}
    </>
  )
}

export default contactus