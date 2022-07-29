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
    const [quantity, setQuantity] = useState<number>()
    const [debouncer, setDebouncer] = useState<boolean>(false)
    const user = useContext(UserContext)
    const colRef = collection(db, "users")
    const docRef = doc(colRef, `${user?.uid}`, "cart", `${id}`)
    const checkUser = auth.currentUser
    
    
    // 2. Everytime the user buys again the doc he'll receive back the doc with real-time quantity
    useEffect(() => {
      return onSnapshot(docRef, (snapshot) => setQuantity(snapshot?.data()?.quantity))
    }, [quantity])
    

    // 3. When user presses on "Buy Now" he will update the quantity of the product he has and send it to the server
      const addProperToCart = async () => {
        setDebouncer(true)
        if(!quantity) {
          await setDoc(docRef, {
            image,
            price,
            name,
            id,
            quantity: 1
          })
        } else if (quantity >= 1) {
          await updateDoc(docRef, {
            quantity: quantity + 1
          })

        }

        setTimeout(() => {
          setDebouncer(false)
        }, 1000)
        
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
       <img className="z-10 relative object-fit w-[298px] h-[288px]  md:w-[348px] md:h-[318px] 
        rounded-md" src={image}/>
       <div className="bg-primary transition duration-350 top-0
        absolute blur-sm opacity-70 w-[300px] h-[290px] md:w-[330px] md:h-[320px] rounded-md "></div>
     </div>

     <div className="flex-col space-y-2">
        <h1 className="font-semibold text-md text-center md:text-xl lg:text-2xl text-primary">{name}</h1>
        <hr className=" h-[2px] md:h-[3px] bg-primary"/>
        <p className="text-xs lg:text-base max-w-[300px] md:max-w-[500px] text-third">{description}</p>
        <p className="text-sm font-medium lg:text-base pt-3">Price starts at 
        <span className="text-sm lg:text-base font-bold text-secondary"> {price} EUR</span></p>
       <div className="pb-5 flex space-x-3 pt-3">
       <button onClick={addProperToCart} disabled={!checkUser || debouncer === true} className="accentButton w-36">Add to cart</button>
       </div>
     </div>

    </div>
  )
}

export default BigCard