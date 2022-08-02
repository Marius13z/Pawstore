import { collection, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../lib/context";
import { auth, db } from "../lib/firebase";


interface Props {
    image: string;
    description: string;
    price: number;
    name: string;
    id: string;
}



const BigCard:React.FC<Props> = ({image, id, description, price, name}) => {
  // The current quantity of products
    const [quantity, setQuantity] = useState<number>()
    // Debouncer to avoid users spamming the add to cart button
    const [debouncer, setDebouncer] = useState<boolean>(false)
    // Current user details
    const user = useContext(UserContext)
    // Reference to user collection
    const colRef = collection(db, "users")
    // Reference to doc products from cart
    const docRef = doc(colRef, `${user?.uid}`, "cart", `${id}`)
    // Used to check if user is logged in or not
    const checkUser = auth.currentUser
    
    
    // Get real time snapshot of the quantity of a product in user cart
    useEffect(() => {
      return onSnapshot(docRef, (snapshot) => setQuantity(snapshot?.data()?.quantity))
    }, [quantity])
    

    // Add a product to cart
      const addProperToCart = async () => {
        setDebouncer(true)

        // If there's no product of the kind that was added to cart then add it
        if(!quantity) {
          await setDoc(docRef, {
            image,
            price,
            name,
            id,
            quantity: 1
          })
          // Otherwise, if the product is more than one just update the 
          // quantity of that product with 1
        } else if (quantity >= 1) {
          await updateDoc(docRef, {
            quantity: quantity + 1
          })

        }

        // When user has added product to cart the debouncer will be in effect
        // for 1 second to stop him from spamming the buttton add to cart
        setTimeout(() => {
          setDebouncer(false)
        }, 1000)
        
        // If the user is logged in and has added a product to cart a toast will be shown
        // otherwise a toast error will be shown
        if(checkUser) {
          toast.success("You have added one product in cart!")
        } else if (!checkUser) {
          toast.error("You must login first!")
        }
        }
    

  return (
    <div className="flex flex-col items-center md:justify-center flex-grow md:flex-row md:space-y-0 md:space-x-24 space-y-12">

    <div className="cursor-pointer relative border bg-white border-gray-200 shadow-lg 
    min-w-[300px] min-h-[290px] max-w-[300px] max-h-[290px]
     md:min-w-[330px] md:min-h-[320px] md:max-w-[330px] md:max-h-[320px] rounded-md">
        {/* Product image */}
       <img className="z-10 relative object-fit w-[298px] h-[288px]  md:w-[348px] md:h-[318px] 
        rounded-md" src={image}/>
       <div className="bg-primary transition duration-350 top-0
        absolute blur-sm opacity-70 w-[300px] h-[290px] md:w-[330px] md:h-[320px] rounded-md "></div>
     </div>

     <div className="flex-col space-y-2">
        {/* Product name */}
        <p className="font-semibold text-md text-center md:text-xl lg:text-2xl text-primary">{name}</p>
        <hr className=" h-[2px] md:h-[3px] bg-primary"/>
        {/* Product description */}
        <p className="text-xs lg:text-base max-w-[300px] md:max-w-[500px] text-third">{description}</p>
        {/* Product price */}
        <p className="text-sm font-medium lg:text-base pt-3">Price starts at 
        <span className="text-sm lg:text-base font-bold text-secondary"> {price} EUR</span></p>

       <div className="pb-5 flex space-x-3 pt-3">
        {/* Button to add product to cart, if the user isn't logged in he won't be able to buy
        AND the button will be disabled for a second after being user*/}
       <button type="button" onClick={addProperToCart} disabled={!checkUser || debouncer === true} className="accentButton w-36">Add to cart</button>
       </div>
       
     </div>

    </div>
  )
}

export default BigCard