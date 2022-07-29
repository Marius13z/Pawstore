import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "./firebase"



export const useUserData = () => {

    const [ currentUser, setCurrentUser] = useState() 

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
