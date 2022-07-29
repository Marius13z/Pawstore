import { XCircleIcon } from "@heroicons/react/solid"
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useContext } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../lib/context";
import { db } from "../lib/firebase";

interface Props {
  image: string;
  name: string;
  price: number;
  id: string;
  quantity: number;
}

const UserCart:React.FC<Props> = ({ image, name, price, id, quantity }) => {
  const user = useContext(UserContext)
  const router = useRouter()

  const deleteProductFromCart = async () => {
    await deleteDoc(doc(db, "users", `${user?.uid}`, "cart", `${id}`))
    toast("Deleted product from your cart", { icon: "🗑️"})
  }


  return (
  

        <div className="items-center flex border w-96 lg:w-[600px] lg:h-[150px] 
        h-28 rounded-xl bg-white  border-primary shadow-md">
            <img onClick={() => router.push(`/treats/${id}`)} className="object-contain cursor-pointer 
             h-[100px] w-[130px] lg:h-[130px] lg:w-[200px] p-1" src={image}/>
            <div className="flex flex-col lg:pl-4 space-y-2">
              <h2 className="font-bold w-56 text-primary">{name}</h2>             
              <div className="flex space-x-5 ">
                  <p className="text-sm font-medium text-primary">Price: <span className="text-secondary">{price} EUR</span></p>
                  <p className="text-sm font-medium text-primary">Quantity: <span className="">{quantity}</span></p>
              </div>
            </div>
            <button onClick={deleteProductFromCart}>
              <XCircleIcon className="h-5 lg:h-7 relative bottom-[40px] left-[2px] lg:left-[123px] lg:bottom-[55px] 
               text-primary hover:rotate-90 transition duration-300 hover:text-red-500"/>
            </button>
        </div>   
     
   
  )
}

export default UserCart