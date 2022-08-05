import { useRouter } from "next/router"
import { useEffect } from "react"
import { auth } from "../lib/firebase"


const AuthCheck = (props:any):JSX.Element => {
    // currently logged in user
    const user = auth?.currentUser
    // router for pushing user to sign in page
    const router = useRouter()

    // After the component has mounted check if user
    // is logged in, if he isn't then push him to sign in page
    useEffect(() => {
        if(!user) {
            router.push("/signin")
        }
    }, [])

  // If user is logged in just return the children
  return user && props.children
}

export default AuthCheck