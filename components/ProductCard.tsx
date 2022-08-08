import { collection, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { auth, db } from "../lib/firebase";
import { Product } from "../typing";



const ProductCard:React.FC<Product> = ({image, id, description, price, name}) => {
  // The current quantity of products
    const [quantity, setQuantity] = useState<number>()
    // Debouncer to avoid users spamming the add to cart button
    const [debouncer, setDebouncer] = useState(false)
    // Current user details
    const user = auth.currentUser
    // Reference to user collection
    const colRef = collection(db, "users")
    // Reference to user cart products 
    const docRef = doc(colRef, `${user?.uid}`, "cart", `${id}`)
    
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
        if(user) {
          toast.success("You have added one product in cart!")
        } else if (!user) {
          toast.error("You must login first!")
        }
        }
    

  return (
    <section className="flex flex-col items-center md:justify-center flex-grow md:flex-row md:space-y-0 md:space-x-24 space-y-12">

    <div className="relative min-w-[300px] min-h-[290px] max-w-[300px] max-h-[290px]
     md:min-w-[330px] md:min-h-[320px] md:max-w-[330px] md:max-h-[320px] border rounded-md shadow-lg overflow-hidden">
        {/* Product image */}
        <Image layout="fill" objectFit="contain" className="z-10"  src={image}/>
     </div>

     <ul className="flex-col space-y-2">
        <li>
        {/* Product name */}
          <p className="font-semibold text-md text-center md:text-xl lg:text-2xl text-primary">{name}</p>
        </li>

        <li>
          <hr className=" h-[2px] md:h-[3px] bg-primary"/>
        </li>

        <li>
        {/* Product description */}
          <p className="text-xs lg:text-base max-w-[300px] md:max-w-[500px] text-third">{description}</p>
        </li>

        <li>
        {/* Product price */}
        <p className="text-sm text-primary font-medium lg:text-base pt-3">Price starts at 
        <span className="font-bold text-secondary"> {price} EUR</span></p>
        </li>

       <div className="pb-5 flex space-x-3 pt-3">
        {/* Button to add product to cart, if the user isn't logged in he won't be able to buy
        AND the button will be disabled for a second after being user*/}
       <button type="button" onClick={addProperToCart} disabled={!user || debouncer === true} className="btn-accent w-36">Add to cart</button>
       </div>
       
     </ul>

    </section>
  )
}

export default ProductCard