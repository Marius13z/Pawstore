import { MenuAlt2Icon, ShoppingCartIcon, UserIcon } from '@heroicons/react/outline'
import { HeartIcon, SearchIcon, XCircleIcon } from '@heroicons/react/solid'
import { collection, onSnapshot } from 'firebase/firestore'
import Link from 'next/link'
import { useRouter, } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SearchContext, UserContext } from '../lib/context'
import { auth, db } from '../lib/firebase'
import { useCartData } from '../lib/hooks'



const Header = () => {
  // To push users to other pages
  const router = useRouter()
  // Number of unique of products displayed above cart
  const cartProducts = useCartData()
  // Active link based on where user has navigated - for example Treats page
  const [linkActive, setLinkActive] = useState<string>("treats")
  // Currently logged in user details
  const user = auth?.currentUser
  // Used to open a modal and display the search and other menu items
  const { open, setOpen, setSearchTerm, setCloseSearch } = useContext(SearchContext)

  // If user presses X button then he cancels search and restarts his input
  const handleCloseSearch = () => {
      setSearchTerm("")
      setCloseSearch(true)
  }


  return (
    <>
    <nav className="relative scrollbar-hide  flex justify-between py-5 px-3 md:px-16 items-center">

      {/* Left */}
      <ul>

      <li>
        <Link href="/">
        
        <button type="button" className={`items-center space-x-1 cursor-pointer 
      ${open ? "hidden md:flex" : "flex"}`}>

       <img  className="object-contain h-8 w-8" src="/header.png"/>
       <span className="text-logo font-semibold pl-1 font-sans">Pawstore</span>   

        </button>
        </Link>

    </li> 

      </ul>

      {/* Middle */}
       <ul className={`group relative space-x-10 justify-center font-sans   text-primary text-xs cursor-pointer
       ${open ? "hidden" : "hidden md:flex"}`}>

        {/* Link to Treats Page */}
        <li onClick={() => setLinkActive("treats")} >
          <Link href="/treats">
          <a>Treats</a>
          </Link>
        </li>

         {/* Link to Toys Page */}
        <li onClick={() => setLinkActive("toys")} >
          <Link href="/toys">
          <a>Toys</a>
          </Link>
        </li>

         {/* Link to Leash Page */}
        <li onClick={() => setLinkActive("leash")} >
          <Link href="/leash">
          <a>Leash</a>
          </Link>
        </li>

         {/* Link to Contact Page */}
        <li onClick={() => setLinkActive("contact")} >
          <Link href="/contact">
          <a>Contact Us</a>
          </Link>
        </li>

        {/* Active heart based on user last accesed link - example Contact Page */}
        <HeartIcon className={`h-3 absolute top-5 ease-out text-secondary duration-300 transition-all
        ${linkActive === "treats" && "right-60"}
        ${linkActive === "toys" && "right-[173px]"}
        ${linkActive === "leash" && "right-[107px]"}
        ${linkActive === "contact" && "right-[24px]"}
        `}/>

       </ul>

      {/* Right */}
      <ul className={`flex space-x-4 ${open && "grow justify-center"}`}>

        {/* Menu icon for phone screens */}
        <li onClick={() => setOpen(true)}>
          <button type="button" className={`btn-nav bg-white  md:hidden ${open ? "hidden" : "block"}`}>
            <MenuAlt2Icon className="h-5 text-primary"/>
          </button>
        </li>

        {/* When clicked user will open a modal through which he can access the search function */}
        <li onClick={() => setOpen(true)}  
        className={`btn-nav active:transform-none bg-white relative z-30 md:flex 
        ${open ? "flex grow items-center justify-between max-w-[250px] md:max-w-lg lg:max-w-xl" : "hidden"}`}>
         
        {/* Input that's going to be shown only if user has clicked the menu button or search button */}
        <input onChange={event => setSearchTerm(event.target.value)}
         className={`text-sm outline-none p-1 grow text-primary placeholder:text-third 
         ${open ? "block" : "hidden"}`}
        placeholder="Search here..."
        />

        <SearchIcon className={`text-primary ${open ? "h-6" : "h-5"}`}/>
        {/* User can click the icon and restart the input, this way he can see the menu items like other links */}
        <XCircleIcon onClick={handleCloseSearch} className={`h-5 md:h-6 text-primary absolute -right-6 md:-right-10 hover:rotate-90 transition duration-300 
        ${ open ? "block" : "hidden"}`}/>
        </li>
      
        {/* Cart item that's going to be removed if the user has clicked the search icon */}
        <li>
          <Link href="/cart">
          <button type="button" className={`btn-nav relative border-secondary bg-secondary ${open ? "hidden" : "flex"}`}>
           <ShoppingCartIcon className="text-primary h-5 p-[2px]"/>
        {/* Number of unique products shown above cart icon */}
           <span className="absolute h-6 w-6 bottom-5 left-5
        border-4 border-white text-center text-[10px] text-white rounded-full bg-primary">{cartProducts?.length}</span>
            </button>               
          </Link>
        </li>

        {/* Icon to redirect user to his profile page */}
        <li>
          <Link href="/user">
           <button type="button" className={`btn-nav bg-white ${open ? "hidden" : "flex"}`}>
             <UserIcon className="h-5 text-primary"/>
           </button>
          </Link>
        </li>

        </ul>
    </nav>

    </>
  )
}

export default Header