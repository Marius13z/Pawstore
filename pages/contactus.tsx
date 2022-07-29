import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"


const contactus:NextPage = () => {
  const [sentForm, setSentForm] = useState<boolean>()
  const router = useRouter()

  function handleForm() {
    setSentForm(true)
    setTimeout(() => {
      router.push("/")
    }, 3000)
  }

  return (
    <>
    {!sentForm ? (
    <div className="flex justify-center space-y-3 items-center h-[80vh] flex-col">
       <h1 className="text-primary font-medium text-2xl ">Contact us through the form below!</h1>
       <hr className="h-[3px] w-[350px] text-primary bg-primary"/>

       <div className="relative space-y-5 right-2">

       <div className="flex flex-col pt-5">
       <label className="text-primary font-medium">E-mail</label>
       <input className="shadow-md outline-none w-[250px] border-primary p-2
       rounded-lg border placeholder:text-third text-sm text-primary"
       placeholder="ex: abcdefgh@gmail.com"
       />

       </div>
       <div className="flex pb-2 flex-col">
       <label className="text-primary font-medium">Feedback</label>
       <textarea className="shadow-md outline-none border-primary p-1
       rounded-lg border h-[200px] w-[350px] pl-2 pr-2 placeholder:text-third text-sm text-primary"
       placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
       Proin sed mauris et nulla pretium. Nunc rutrum amet et elementum sit neque. 
       Turpis gravida feugiat ornare vulputate cum magna nulla orci. "
       />

       </div>
       <button onClick={handleForm} className="rounded-lg w-[350px] hover:bg-secondary hover:border-secondary
        transition duration-300
        p-2 text-xs bg-primary border text-white">Send Message</button>
       </div>
    </div>
    ) : (
      <div className="flex flex-col h-[80vh] space-y-2 justify-center items-center">
      <h1 className=" text-center text-secondary text-2xl md:text-3xl">Thanks for reaching us</h1>
      <h1 className="text-secondary text-2xl md:text-2xl">We'll be back with and e-mail shortly!</h1>
    </div>
    )}
    </>
  )
}

export default contactus