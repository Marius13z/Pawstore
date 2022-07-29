import { doc, setDoc } from 'firebase/firestore'
import type { NextPage } from 'next'
import { useContext, useEffect } from 'react'
import Hero from '../components/Hero'
import { UserContext } from '../lib/context'
import { db } from '../lib/firebase'

const Home: NextPage = () => {
  const user = useContext(UserContext)
  console.log(user)
  
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
    <div className="px-16">
      
      {/* Hero */}
      <Hero/>

    </div>
  )
}

export default Home
