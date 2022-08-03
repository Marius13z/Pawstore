import { signOut } from 'firebase/auth'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../lib/context'
import { auth, db } from '../../lib/firebase'
import { useForm } from 'react-hook-form'
import { collection, doc, DocumentData, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { DotPulse } from '@uiball/loaders'
import toast from 'react-hot-toast'
import { useUserFirestoreData } from '../../lib/hooks'
import Error404 from '../../components/Error404'




// What data to expect from the form
type FormData = {
  deliveryAddress: string;
  country: string;
  city: string;
  phoneNumber: string;
};


const slug: NextPage = () => {

  // When user is editing his details the button to save the new details is shown
  const [isEditing, setIsEditing] = useState<boolean>(false)

  // Router used to push user
  const router = useRouter()
  const { slug } = router.query
  // Used to show the user details for his profile page
  const user = useUserFirestoreData()
  // Used to collect, validate and send data to the server
  const { register, formState: { errors }, handleSubmit, reset } = useForm<FormData>()

  // To update user profile data
  const onSubmit = async (data: FormData) => {
    // Update the user doc with the new data and reset input field values
    await updateDoc(doc(db, "users", user?.uid), {
      deliveryAddress: data?.deliveryAddress,
      country: data?.country,
      city: data?.city,
      phoneNumber: data?.phoneNumber
    })
      .then(() => setIsEditing(false))
      .then(() => reset({ deliveryAddress: "", city: "", country: "", phoneNumber: "" }))

    // After user has edited his details throw a toast
    toast.success("You have edited your details!")

  }

  // If the user signs out push him to homepage
  function handleSignOut() {
    signOut(auth)
    toast("You have signed out", { icon: "😔" })
    router.push("/")
  }

  return (
    <div>
    {/* Show user profile to the user it belongs to otherwise throw him a warning that he cannot access it */}
      {user?.username === slug ? (
        <div className="flex md:flex-row  flex-col md:space-y-0 md:items-center md:justify-center md:h-[80vh] space-y-14 max-w-5xl md:mt-0 mt-20 mx-auto">
          <div className="flex flex-col items-center space-y-6">
            <img className="h-48 md:h-56 " src="/user-image.png" />
           
           {/* Button to sign out from current account */}
            <button onClick={handleSignOut} className="signInButton border border-gray-200 
      font-semibold hover:border-primary bg-white w-32">Sign Out</button>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex space-x-5 sm:space-x-10 px-16  pb-10 md:pb-0 justify-around mx-auto ">
              <div className="flex flex-col">
  
                <label className="profile-label">Username</label>
                <input className="profile-input bg-white"
                  disabled placeholder={`${user?.username}`} />

                <label className="profile-label pt-4">Delivery Address</label>
                {/* Input to register and validate DELIVERY ADDRESS value */}
                <input type="text" {...register("deliveryAddress", { required: true, maxLength: { value: 30, message: "Delivery adress limit is 30 chars" } },)}
                  className="profile-input  "
                  onClick={() => setIsEditing(true)}
                  placeholder={`${user?.deliveryAddress ? user?.deliveryAddress : "Enter a street"}`} />

                <label className="profile-label pt-4">Country</label>
                {/* Input to register and validate COUNTRY value */}
                <input type="text" {...register("country", { required: true, maxLength: { value: 15, message: "Country limit is 15 chars" } })}
                  className="profile-input "
                  placeholder={`${user?.country ? user?.country : "No country found"}`}
                  onClick={() => setIsEditing(true)} />

                 {/* When user is editing his profile data he'll be shown a save details button 
                 and after clicking it he'll be shown a loader until the data is saved in db */}
                {isEditing ? (

                    <button
                      type="submit"
                      className="accentButton font-sm  text-white mt-7">Save Details</button>


                ) : (
                  <h2 className="max-w-[180px] pt-7 text-xs md:text-sm text-third">You're part of Pawstore community since July 7h 2022</h2>
                )}

              </div>
              <div className="flex  flex-col">

                <label className="profile-label">City</label>
                {/* Input to register and validate CITY value */}
                <input type="text" {...register("city", { required: true, maxLength: { value: 15, message: "City limit is 15 chars" } })}
                  className="profile-input  "
                  placeholder={`${user?.city ? user?.city : "ex: Timisoara"}`}
                  onClick={() => setIsEditing(true)} />

                <label className="profile-label pt-4">Phone Number</label>
                {/* Input to register and validate PHONE NUMBER value */}
                <input type="number" {...register("phoneNumber", { required: true, maxLength: { value: 11, message: "Phone number limit is 11 chars" } })}
                  className="profile-input "
                  onClick={() => setIsEditing(true)}
                  placeholder={`${user?.phoneNumber ? user?.phoneNumber : "Add a phone number"}`} />

                <label className="profile-label pt-4">Email</label>
                <input className="profile-input"
                  disabled placeholder={`${user?.email}`} />

                {/* If user hasn't typed all the fields and respected constraint rules he'll be thrown the following errors */}
                <div className="flex pt-4 flex-col input-error">
                  <p>{errors.deliveryAddress?.type === "required" ? "Delivery address is required" : errors.deliveryAddress?.message}</p>
                  <p>{errors.country?.type === "required" ? "Country is required" : errors.country?.message}</p>
                  <p>{errors.phoneNumber?.type === "required" ? "Phone number is required" : errors.phoneNumber?.message}</p>
                  <p>{errors.city?.type === "required" ? "City is required" : errors.city?.message}</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      )
      
      : (
        <>
        {/* If the user is trying to acces other users profile show this */}
        <Error404/>
        </>
        )}

    </div>
  )

}


export default slug