import { onAuthStateChanged } from "firebase/auth"
import { collection, doc, DocumentData, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, db } from "./firebase"

interface User {
  username: string | null
  email: string | null
  uid: string | null
}

// Watch for user change so new users can be logged in to database in order to interact with the site
export const useUserData = () => {

    const [ currentUser, setCurrentUser] = useState<User>() 

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            if (user) {
              const username = user.displayName
              const email = user.email
              const uid = user.uid
              setCurrentUser({ username, email, uid })
            } else {
              return null;
            }
          })
    }, [])

    return { currentUser };
}

// Get all cart products
export const useCartData = () => {

  const [ cartProducts, setCartProducts ] = useState<DocumentData>()
  
  const user = auth?.currentUser

  const colRef = collection(db, "users", `${user?.uid}`, "cart")
    
  // Pull all products from user cart
  useEffect(() => {
    return onSnapshot(colRef, (snapshot) => setCartProducts(snapshot?.docs.map((doc) => doc.data())) )
  }, [user])

  return cartProducts;
}

export const useUserFirestoreData = () => {
    const [userDetails, setUserDetails] = useState<DocumentData>()
    const user = auth?.currentUser

     // Doc reference to pull user details from his profile    
     const docRef = doc(db, "users", `${user?.uid}`)

     // Pull user details from his profile for his profileAddress delivery address and phone number
   useEffect(() => {
     return onSnapshot(docRef, (snapshot) => setUserDetails(snapshot?.data()))
   }, [user])

   return userDetails;
}