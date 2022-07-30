import { MenuAlt2Icon, UserIcon } from '@heroicons/react/outline'
import { HeartIcon, SearchIcon, XCircleIcon } from '@heroicons/react/solid'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import Link from 'next/link'
import { useRouter, } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SearchContext } from '../lib/context'
import { auth, db } from '../lib/firebase'



const Header = () => {
  const router = useRouter()
  const [productsNumber, setProductsNumber] = useState<number>()
  const [linkActive, setLinkActive] = useState<string>("treats")
  const user = auth.currentUser
  const { open, setOpen, setSearchTerm, setCloseSearch } = useContext(SearchContext)
  
  const colRef = collection(db, "users", `${user?.uid}`, "cart")

  useEffect(() => {
    return onSnapshot(colRef, (snapshot) => setProductsNumber(snapshot?.docs?.length))
  }, [user])

  // Only access user profile if user is logged in
  function handleUserProfile() {
    if(user) {
      router.push(`/userprofile/${user?.displayName}`)
    } else {
      toast.error("You must login first!")
      router.push("/signin")
    }
}

  // if user presses X button then he cancels search and restarts his input
  const handleCloseSearch = () => {
      setSearchTerm("")
      setCloseSearch(true)
  }


  return (
    <>
    <nav className="relative scrollbar-hide  flex justify-between py-3 px-2 sm:px-8 md:px-16 items-center bg-white">

      {/* Left */}
      <div onClick={() => router.push("/")} className="h-12 w-12 flex items-center space-x-1 cursor-pointer">

       <img  className="object-contain" src="/logo.jpg"/>
       <p className="display:block text-logo font-semibold font-sans">Pawstore</p>   

    </div> 

      {/* Middle */}
       <ul className={`group relative space-x-10 justify-center font-sans   text-primary text-xs cursor-pointer
       ${open ? "hidden" : "hidden md:flex"}`}>

        <li onClick={() => setLinkActive("treats")} >
          <Link href="/treats">
          <a>Treats</a>
          </Link>
        </li>

        <li onClick={() => setLinkActive("toys")} >
          <Link href="/toys">
          <a>Toys</a>
          </Link>
        </li>

        <li onClick={() => setLinkActive("leash")} >
          <Link href="/leash">
          <a>Leash</a>
          </Link>
        </li>

        <li onClick={() => setLinkActive("contact")} >
          <Link href="/contactus">
          <a>Contact Us</a>
          </Link>
        </li>

        <HeartIcon className={`h-3 absolute top-5 group-active:scale-150 ease-out text-secondary duration-1000 transition
        ${linkActive === "treats" && "right-60"}
        ${linkActive === "toys" && "right-[173px]"}
        ${linkActive === "leash" && "right-[107px]"}
        ${linkActive === "contact" && "right-[24px]"}
        `}/>

       </ul>

      {/* Right */}
      <div className={`flex space-x-4 ${open && "grow justify-end md:justify-center"}`}>

        <div onClick={() => setOpen(true)} className={`navBtn  md:hidden ${open ? "hidden" : "block"}`}>
        <MenuAlt2Icon className="h-5 text-primary"/>
        </div>

        <div onClick={() => setOpen(true)}  
        className={`navBtn active:transform-none bg-white relative z-30 md:flex 
        ${open ? "flex grow items-center justify-between max-w-[250px] md:max-w-lg lg:max-w-xl" : "hidden"}`}>

        <input onChange={event => setSearchTerm(event.target.value)}
         className={`text-sm outline-none p-1 grow text-primary placeholder:text-third 
         ${open ? "block" : "hidden"}`}
        placeholder="Search here..."
        />

        <SearchIcon className={`text-primary ${open ? "h-6" : "h-5"}`}/>
        <XCircleIcon onClick={handleCloseSearch} className={`h-6 text-primary absolute -right-9 pr-2 hover:rotate-90 transition duration-300 
        ${ open ? "block" : "hidden"}`}/>
        </div>
      

        <div onClick={() => router.push(`/cart`)} 
        className={`navBtn relative border-secondary bg-secondary ${open ? "hidden" : "flex"}`}>
        <img src="/cart.svg" className=" h-5 p-[2px]"/>

        <div className="absolute h-6 w-6 bottom-5 left-5
        border-4 border-white text-center text-[10px] text-white rounded-full bg-primary">
         <p>{user ? (productsNumber && productsNumber) : ""}</p>
        </div>

        </div>

        <div onClick={handleUserProfile} className={`navBtn ${open ? "hidden" : "flex"}`}>
        <UserIcon className="h-5 text-primary"/>
        </div>

        </div>
    </nav>

    </>
  )
}

export default Header