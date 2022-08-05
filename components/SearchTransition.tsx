import { Dialog, Transition } from '@headlessui/react'
import { SearchIcon, TrendingUpIcon } from '@heroicons/react/outline'
import { ArrowRightIcon } from '@heroicons/react/solid'
import { collection, DocumentData, onSnapshot } from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../lib/context'
import { db } from '../lib/firebase'
import { useProducts } from '../lib/hooks'


const SearchTransition = () => {
 // Consuming global states so the user can access search, close the search and search products
 const { open, setOpen, searchTerm, closeSearch, setCloseSearch} = useContext(SearchContext)
 // Available products to search in the search bar
 const products = useProducts()
 // Router used to push user to other pages
 const router = useRouter()

 // User can access every product he searches for with a click
 // AND the modal with search bar will close when reaching that page
  const handleSearchPush = (category: string, id: string) => {
     setOpen(false)
     router?.push(`/${category}/${id}`)
  }


  // If the user is searching then the search bar will keep being open
  if(searchTerm !== "") {
    setCloseSearch(false)
  }

  return (
    <Transition.Root show={open}  >
      <Dialog as='div' className="fixed scrollbar-none z-20 inset-0 overflow-y-auto" onClose={setOpen} >

       <div className="flex justify-center   sm:block ">
         
       <Transition.Child
             enter="ease-out duration-300"
             enterFrom="opacity-0"
             enterTo="opacity-100"
             leave="ease-in duration-200"
             leaveFrom="opacity-100"
             leaveTo="opacity-0" 
             >
              <Dialog.Overlay className="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity"/>
             
             {/* When the modal is open and the user doesn't search for a product
             on small screens he will see the menu with other links like Treats or Toys */}
             {closeSearch ? ( 
              <nav className="flex flex-col relative h-[100vh] justify-center items-center md:hidden ">
                {/* Menu Links to other pages */}
                <ul onClick={() => setOpen(false)} className="space-y-5 text-center">
                
                <li>
                <Link href="/treats"><a className="menu-link">Treats</a></Link>
                </li>

                <li>
                <Link href="/leash"><a className="menu-link">Leash</a></Link>
                </li>

                <li>
                <Link href="/toys"><a className="menu-link">Toys</a></Link>
                </li>

                  <li>
                  <Link href="/cart"><a className="menu-link">Cart</a></Link>
                  </li>

                  <li>
                  <Link href="/user"><a className="menu-link">Profile</a></Link>
                  </li>


                <li>
                <Link href="/contact"><a className="menu-link">Contact Us</a></Link>
                </li>
              

                </ul>
              </nav>
             ) : (

              <main className="flex grow  mt-10 w-screen justify-around md:justify-center">
               <div className=" md:w-[90px]">

               </div>
              
              <div className="flex mr-5 ml-5 md:ml-0 md:mr-0 grow md:grow-0 w-[240px] md:w-[512px] lg:w-[576px] shadow-lg rounded-xl  bg-white
                transform transition-all mt-10
                ">

              <div className="text-center cursor-pointer pl-3 pr-3 overflow-hidden mt-3 mb-2">
                {/* Every product name the user can search and access in the search bar */}
              {products && products?.filter((val:DocumentData) => {
                {/* When the search bar is open but the user hasn't typed anything then he will see all available
                products */}
                 if(searchTerm === "") {
                   return val;
                 {/* If the user is searching in the search bar then he will see all 
                 products available that he's searching for */}
                 } else if (val?.data().name.toLowerCase().includes(searchTerm.toLowerCase())) {
                   return val;
                 }
                 {/* Products the user has searched for displayed on UI */}
              }).map((product:DocumentData) => {
                          return <Dialog.Title onClick={() => handleSearchPush(product?.data().category, product?.id)} 
                          key={product?.id} 
                          className="flex items-center group space-x-5 ">
                          {/* If the user has searched for a product a search icon will be nearby to indicate
                          the products he's searched for */}
                           {searchTerm !== "" ? (
                             <SearchIcon className="hidden h-3 md:block group-hover:text-secondary text-primary"/>

                           ) : (
                            <>
                            {/* If the user hasn't searched for a product then all the trending products will be
                            available in the navbar */}
                              <TrendingUpIcon  className="hidden md:block h-3 group-hover:text-secondary text-primary"/>
                            </>
                           )}
                              {/* Products names in searchbar */}
                              <p className="text-sm pb-2 truncate group-hover:text-secondary text-primary ">{product?.data().name}</p>
                           
                             
                          </Dialog.Title>
                        }).slice(0, 10)}
                     </div>

                     </div>

              </main>
             )}


             </Transition.Child>
        

             <Transition.Child
             enter="ease-out duration-300"
             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
             enterTo="opacity-100 translate-y-0 sm:scale-100"
             leave="ease-in duration-200"
             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" 
             ></Transition.Child>


       </div>

      </Dialog>

    </Transition.Root>

  )
}

export default SearchTransition