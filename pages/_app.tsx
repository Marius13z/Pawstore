import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '../components/Header'
import {  SearchProvider, UserContext } from '../lib/context'
import { useUserData } from '../lib/hooks'
import { Toaster } from "react-hot-toast"
import SearchTransition from '../components/SearchTransition'


function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData();

  return(
    <>
    <UserContext.Provider value={userData?.currentUser}>

    <SearchProvider>
     
    <Head>
      <title>Pawstore</title>
      <link rel="icon" href="/header.png" />
    </Head>
    <Header />
    <SearchTransition/>
    <Toaster/>
    <Component {...pageProps} />

    </SearchProvider>

    </UserContext.Provider>
    </>
    ) 
}

export default MyApp
