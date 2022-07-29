import { signOut } from 'firebase/auth'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../lib/context'
import { auth, db } from '../../lib/firebase'
import { useForm } from 'react-hook-form'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { DotPulse } from '@uiball/loaders'
import toast from 'react-hot-toast'




// What data to expect from the form
type FormData = {
  deliveryAddress: string;
  country: string;
  city: string;
  phoneNumber: string;
};


const slug: NextPage = () => {

  // When user is editing his details the button to save the new details is shown
  const [isEditing, setIsEditing] = useState<boolean>()
  // Used in order to re-read the docs with actual real time data when the user has edited his profile information
  const [hasEdited, setHasEdited] = useState<boolean>()
  // Used to display delivery details like country, city and adress on UI
  const [deliveryData, setDeliveryData] = useState<any>()
  // If the user edited his details he'll be shown a loader until the data reaches the server
  const [isLoading, setIsLoading] = useState<boolean>()
  // Used to push the user to the homepage after he's signed out
  const router = useRouter()
  const { slug } = router.query
  // Used to show the user details for his profile page
  const user = useContext(UserContext)
  // Used to collect, validate and send data to the server
  const { register, formState: { errors }, handleSubmit, reset } = useForm<FormData>()

  // If the user changes his profile data he'll be shown a loader and his data will be updated on the server with the new data
  const onSubmit = async (data: FormData) => {
    // If he's submited the data he will be shown a loader
    setIsLoading(true)
    // Update the user doc with the new data
    await updateDoc(doc(db, "users", user?.uid), {
      deliveryAddress: data?.deliveryAddress,
      country: data?.country,
      city: data?.city,
      phoneNumber: data?.phoneNumber
    })
      .then(() => setIsEditing(false))
      .then(() => setIsLoading(false))
      .then(() => setHasEdited(true))
      .then(() => reset({ deliveryAddress: "", city: "", country: "", phoneNumber: "" }))

    toast.success("You have edited your details!")

  }

  // Read the doc with the user uid and store the data inside deliveryData so it can be used to
  // be displayed on User Profile
  const read = async (id: string) => {

    // Ref to collection in database
    const colRef = collection(db, "users")

    // Used to loop through every doc and find the one that matches the signed in user
    const q = query(colRef, where("uid", "==", `${id}`))

    // Used to get all the docs with uid match
    const querySnapshot = await getDocs(q);

    // Loop through each available match and store it in deliveryData
    querySnapshot.forEach((doc) => {
      setDeliveryData(doc?.data())
    })

  }

  // Everytime the user is read or the user has edited the data the doc
  // will be read once again so real time data is displayed on UI
  useEffect(() => {
    read(user?.uid)
  }, [user, hasEdited])

  // If the user signs out push him to homepage
  function handleSignOut() {
    signOut(auth)
    toast("You have signed out", { icon: "😔" })
    router.push("/")
  }

  console.log(user?.username)
  console.log(slug)

  return (
    <div>

      {user?.username === slug ? (
        <div className="flex md:flex-row flex-col md:space-y-0 md:items-center md:justify-center md:h-[80vh] space-y-14 max-w-5xl md:mt-0 mt-20 mx-auto">
          <div className="flex flex-col items-center space-y-6">
            <img className="h-48 md:h-56 " src="/user-image.png" />

            <button onClick={handleSignOut} className="signInButton hover:border border-gray-200 border: ;
      font-semibold hover:border-primary w-32">Sign Out</button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex space-x-5 sm:space-x-10 px-16  pb-10 md:pb-0 justify-around mx-auto ">
              <div className="flex  flex-col">

                <label className="profile-label">Username</label>
                <input className="profile-input"
                  disabled placeholder={`${user?.username}`} />

                <label className="profile-label pt-4">Delivery Address</label>
                <input {...register("deliveryAddress", { required: true, maxLength: { value: 30, message: "Delivery adress limit is 30 chars" } },)}
                  className="profile-input  text-third font-md"
                  onClick={() => setIsEditing(true)}
                  placeholder={`${deliveryData?.deliveryAddress ? deliveryData?.deliveryAddress : "Enter a street"}`} />
                <label className="profile-label pt-4">Country</label>
                <input {...register("country", { required: true, maxLength: { value: 15, message: "Country limit is 15 chars" } })}
                  className="profile-input text-third font-md"
                  placeholder={`${deliveryData?.country ? deliveryData?.country : "No country found"}`}
                  onClick={() => setIsEditing(true)} />

                {isEditing ? (
                  isLoading ?
                    <div className="mt-16">
                      <DotPulse color="#EBA25D" size={40} />
                    </div>
                    :

                    <button onClick={() => setHasEdited(false)}
                      type="submit"
                      className="accentButton font-sm text-white mt-7">Save Details</button>


                ) : (
                  <label className="max-w-[180px] pt-7 text-xs md:text-sm text-third">You're part of Pawstore community since July 7h 2022</label>
                )}

              </div>
              <div className="flex  flex-col">

                <label className="profile-label">City</label>
                <input {...register("city", { required: true, maxLength: { value: 15, message: "City limit is 15 chars" } })}
                  className="profile-input  text-third font-md"
                  placeholder={`${deliveryData?.city ? deliveryData?.city : "ex: Timisoara"}`}
                  onClick={() => setIsEditing(true)} />

                <label className="profile-label pt-4">Phone Number</label>
                <input {...register("phoneNumber", { required: true, maxLength: { value: 11, message: "Phone number limit is 11 chars" } })}
                  className="profile-input text-third font-md"
                  onClick={() => setIsEditing(true)}
                  placeholder={`${deliveryData?.phoneNumber ? deliveryData?.phoneNumber : "Add a phone number"}`} />

                <label className="profile-label pt-4">Email</label>
                <input className="profile-input"
                  disabled placeholder={`${user?.email}`} />

                <div className="flex pt-4 flex-col text-xs md:text-sm text-red-500">
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
          <h1 className="mainHeading flex items-center max-w-5xl text-center justify-center mx-auto h-[80vh] ">You cannot access other users profile</h1>
        )}

    </div>
  )

}


export default slug