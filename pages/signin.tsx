import { NextPage } from "next"
import {  signInWithPopup } from 'firebase/auth'
import { auth, googleProvider, facebookProvider, githubProvider } from '../lib/firebase'
import { useRouter } from "next/router"

const signin:NextPage = () => {
const router = useRouter()
const user = auth.currentUser


if(user) {
  router.push("/")
}


  return (
    <div className="px-16 flex flex-col md:flex-row-reverse items-center md:mt-20 justify-center mt-10">
        <div className="flex-col flex justify-center pl-6 items-center space-y-6">
      <h1 className="text-xl text-primary font-semibold pb-2">Sign in with</h1>
      <button onClick={() => signInWithPopup(auth, facebookProvider)} className="signInButton bg-fourth text-white">
        <img  className="h-6" src="/fb-icon.png"/>
         Facebook
      </button>
      <button onClick={() => signInWithPopup(auth, githubProvider)} className="signInButton bg-white text-black border border-black">
        <img  className="h-4 pr-2" src="/github-icon.png"/>
         Github
      </button>
      <button onClick={() => signInWithPopup(auth, googleProvider)} className="signInButton bg-white text-fifth border border-fifth">
        <img  className="h-4 pr-3" src="/google-logo.png"/>
         Google
      </button>
       <h2 className="pt-6 pl-4 pb-6 w-[240px] text-sm md:text-md text-primary">Join us and be part of our big and lovely community!</h2>
        </div>
        <div className="flex space-x-6">
       <img src="signin.webp"/>
       <hr className="hidden lg:block w-[1.5px] bg-third h-[360px]"/>
        </div>
    </div>
  )
}

export default signin