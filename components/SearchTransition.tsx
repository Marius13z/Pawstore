import { Dialog, Transition } from '@headlessui/react'
import { SearchIcon, TrendingUpIcon } from '@heroicons/react/outline'
import { ArrowRightIcon } from '@heroicons/react/solid'
import { collection, DocumentData, onSnapshot } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { Fragment, useContext, useEffect, useState } from 'react'
import { SearchContext } from '../lib/context'
import { db } from '../lib/firebase'


const SearchTransition = () => {
 const { open, setOpen, searchTerm, closeSearch, setCloseSearch} = useContext(SearchContext)
 const [ products, setProducts ] = useState<DocumentData>()
 const router = useRouter()

  const colRef = collection(db, "products")

 useEffect(() => {
   return onSnapshot(colRef, (snapshot) => setProducts(snapshot?.docs))
 }, [])

  const handleSearchPush = (category: string, id: string) => {
     setOpen(false)
     router?.push(`/${category}/${id}`)
  }

  const handleMenuPush = (category: string) => {
    setOpen(false)
    router?.push(`/${category}`)
  }

  if(searchTerm !== "") {
    setCloseSearch(false)
  }

  return (
    <Transition.Root show={open}  >
      <Dialog as='div' className="fixed z-20 inset-0 overflow-y-auto" onClose={setOpen} >

       <div className="flex justify-center  min-h-[800px] text-center sm:block ">
         
       <Transition.Child
             enter="ease-out duration-300"
             enterFrom="opacity-0"
             enterTo="opacity-100"
             leave="ease-in duration-200"
             leaveFrom="opacity-100"
             leaveTo="opacity-0" 
             >
              <Dialog.Overlay className="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity"/>
             
             {closeSearch ? ( 
              <div className="flex flex-col relative h-[100vh] justify-center items-center space-y-5  md:hidden ">
                <h1 onClick={() => handleMenuPush("treats")} 
                className="text-white cursor-pointer hover:scale-125 duration-300 ease-out transition text-xl">Treats</h1>
                <h1 onClick={() => handleMenuPush("leash")} 
                 className="text-white cursor-pointer hover:scale-125 duration-300 ease-out transition  text-xl">Leash</h1>
                <h1 onClick={() => handleMenuPush("toys")} 
                 className="text-white cursor-pointer hover:scale-125 duration-300 ease-out transition  text-xl">Toys</h1>
                <div className="group">
                <h1 onClick={() => handleMenuPush("contactus")} 
                 className="text-white cursor-pointer hover:scale-125 duration-300 ease-out transition  text-xl">Contact us</h1>
                <ArrowRightIcon className="text-primary group-hover:-right-32 relative -top-5 -right-28  h-4" />
                </div>
              </div>
             ) : (

              <div className="flex grow  mt-10  md:px-16 w-screen justify-around md:justify-center">
               <div className=" md:w-[65px]">

               </div>
              
              <div className="flex mr-5 ml-5 md:ml-0 md:mr-0 grow md:grow-0 w-[240px] md:w-[512px] lg:w-[576px] shadow-lg rounded-xl  bg-white
                transform transition-all mt-10
                ">

              <div className="text-center cursor-pointer pl-3 pr-3 overflow-hidden mt-3 mb-2">
              {products && products?.filter((val:DocumentData) => {
                 if(searchTerm === "") {
                   return val;
                 } else if (val?.data().name.toLowerCase().includes(searchTerm.toLowerCase())) {
                   return val;
                 }
              }).map((product:DocumentData) => {
                          return <Dialog.Title onClick={() => handleSearchPush(product?.data().category, product?.id)} 
                          key={product?.id} 
                          className="flex items-center group space-x-5 ">
                    
                           {searchTerm !== "" ? (
                             <SearchIcon className="hidden h-3 md:block group-hover:text-secondary text-primary"/>

                           ) : (
                              <TrendingUpIcon  className="hidden md:block h-3 group-hover:text-secondary text-primary"/>
                           )}
                              
                              <p className="text-sm pb-2 truncate group-hover:text-secondary text-primary ">{product?.data().name}</p>
                           
                             
                          </Dialog.Title>
                        }).slice(0, 10)}
                     </div>

                     </div>

              </div>
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