import { onAuthStateChanged } from "firebase/auth"
import { collection, doc, DocumentData, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, db } from "./firebase"

interface User {
  username: string | null
  email: string | null
  uid: string | null
}

// Watch for user change so new users can be logged in to database in order
// to interact with the whole site and create a user profile
export const useUserData = () => {
    const [ currentUser, setCurrentUser] = useState<User>() 

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            if (user) {
              const username = user?.displayName
              const email = user?.email
              const uid = user?.uid
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
  
  // currently authenticated user
  const user = auth?.currentUser

  // collection reference to current authenticated user cart
  const colRef = collection(db, "users", `${user?.uid}`, "cart")
    
  // Pull all products from user cart
  useEffect(() => {
    return onSnapshot(colRef, (snapshot) => setCartProducts(snapshot?.docs.map((doc) => doc.data())) )
  }, [user])

  return cartProducts;
}

// Hook used to pull authenticated user data
export const useUserFirestoreData = () => {
    const [userDetails, setUserDetails] = useState<DocumentData>()

    // currently authenticated user
    const user = auth.currentUser

     // Doc reference to pull user details based on his uid    
     const docRef = doc(db, "users", `${user?.uid}`)

     // Pull user details from his profile for his profileAddress delivery address and phone number
   useEffect(() => {
     return onSnapshot(docRef, (snapshot) => setUserDetails(snapshot?.data()))
   }, [db])

   return userDetails;
}

// Hook to get all products data
export const useProductsData = () => {
    // Products to be shown on UI
    const [products, setProducts] = useState<DocumentData>()

    // Collection reference to all the available products
    const colRef = collection(db, "products")
  
    // Pull products data to display them on UI
    useEffect(() => {
      return onSnapshot(colRef, (snapshot) => setProducts(snapshot?.docs))
    }, [])

    return products;
}

// Hook to get products based on category they're from
 export async function useCategoryProductsData(category: string) {

  // collectio reference to all products available
  const colRef = collection(db, "products")

  // querying the products based on the category - example treats
  const q = query(colRef, where("category", "==", `${category}`) )

  // Pull products data to display them on UI
  const docSnap = (await getDocs(q)).docs.map(doc => {
   return {
     data: doc?.data(),
     id: doc?.id
   }
  })


 return docSnap
}

// Hook to get the data for the product user has clicked on
export async function useProductData(slug: string) {
  
   // document reference to actual product accesed
   const docRef = doc(db, "products", `${slug}`)
   
   // get product based on the path user has navigated to
   const docSnap = (await getDoc(docRef))
 
   // pass data for displaying product and id for adding to cart
   return {
       data: docSnap.data(),
       id: docSnap?.id
   }
}

// Hook to get all products id
export async function useProductPath() {
  
    // collection reference to all products available
    const colRef = collection(db, "products")
 
    // create paths based on products ids
    const paths = (await getDocs(colRef)).docs.map(doc => {
      const slug = doc?.id
    
  
      return {
        params: { slug: slug }
      }
    })
  
   return paths
}
