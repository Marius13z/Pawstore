import { onAuthStateChanged } from 'firebase/auth'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import Hero from '../components/Hero'
import { UserContext } from '../lib/context'
import { auth, db } from '../lib/firebase'



const Home: NextPage = () => {
  // Currently authenticacted user
  const user = useContext(UserContext)

  // When user has logged in and thrown to homepage his details will be stored in the database
  useEffect(() => {
    if(user) {
        setDoc(doc(db, "users", user?.uid), {
          username: user?.username,
          uid: user?.uid,
          email: user?.email
        }, {merge: true})
    } else if (!user) {
      return;
    }
  }, [user])



  return (

      <Hero/>

  )
}

export default Home
