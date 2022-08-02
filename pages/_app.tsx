import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '../components/Header'
import {  SearchContext, UserContext } from '../lib/context'
import { useUserData } from '../lib/hooks'
import { Toaster } from "react-hot-toast"
import { useState } from 'react'
import SearchTransition from '../components/SearchTransition'


function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData();
  const [open, setOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [closeSearch, setCloseSearch] = useState(false)

  return(
    <>
    <UserContext.Provider value={userData?.currentUser}>

    <SearchContext.Provider value={{ open, setOpen, openMenu, setOpenMenu, searchTerm, setSearchTerm, closeSearch, setCloseSearch }}>
     
    <Head>
      <title>Pawstore</title>
      <link rel="icon" href="/header.png" />
    </Head>
    <Header />
    <SearchTransition/>
    <Toaster/>
    <Component {...pageProps} />

    </SearchContext.Provider>

    </UserContext.Provider>
    </>
    ) 
}

export default MyApp
