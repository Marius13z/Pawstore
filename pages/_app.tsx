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
  const [open, setOpen] = useState<boolean>(false)
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [closeSearch, setCloseSearch] = useState<boolean>(false)

  return(
    <>
    <UserContext.Provider value={userData?.currentUser}>
    <SearchContext.Provider value={{ open, setOpen, openMenu, setOpenMenu, searchTerm, setSearchTerm, closeSearch, setCloseSearch }}>
     
    <Header />
    <SearchTransition/>
    <Toaster/>
    <Component {...pageProps} />
    <Head>
      <title>Pawstore</title>
      <link rel="icon" href="/truelog.jpg" />
    </Head>

    </SearchContext.Provider>

    </UserContext.Provider>
    </>
    ) 
}

export default MyApp
