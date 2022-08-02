import { XCircleIcon } from "@heroicons/react/outline"
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
  // Currently logged in user details
  const user = useContext(UserContext)
  // Router used to push users to other pages
  const router = useRouter()

  // When clicking the X Circle Icon the product will be deleted from the cart 
  // and a toast will be shown
  const deleteProductFromCart = async () => {
    await deleteDoc(doc(db, "users", `${user?.uid}`, "cart", `${id}`))
    toast("Deleted product from your cart", { icon: "🗑️"})
  }


  return (
  

        <div className="group items-center flex border w-[300px] sm:w-[400px]  lg:w-[600px] lg:h-[150px] 
        h-24 sm:h-28 bg-white border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300">
          {/* When image is clicked user will be pushed to the product page */}
            <img onClick={() => router.push(`/treats/${id}`)} className="object-contain cursor-pointer 
            h-[80px] w-[80px] sm:h-[100px] sm:w-[130px]  lg:h-[130px] lg:w-[200px] p-1" src={image}/>

            <div className="flex flex-col pl-3 md:pl-0 lg:pl-4 space-y-2">
              {/* Product name */}
              <h2 className="font-bold text-[0.65rem] sm:text-sm lg:text-base w-32 sm:w-56 text-primary">{name}</h2>
              
              {/* Quantity and price block */}
              <div className="flex space-x-5 ">
                  <p className="text-xs sm:text-sm font-medium text-primary">Price: <span className="text-secondary">{price} EUR</span></p>
                  <p className="text-xs sm:text-sm font-medium text-primary">Quantity: <span className="">{quantity}</span></p>
              </div>

            </div>

            {/* Button to delete products from cart */}
            <button type="button" onClick={deleteProductFromCart}>
              <XCircleIcon className="group-hover:h-4 sm:group-hover:h-5 lg:group-hover:h-6 relative left-[40px] sm:left-[8px] md:left-[20px] bottom-[33px] sm:bottom-[38px] md:bottom-[40px] lg:left-[123px] lg:bottom-[55px] 
               text-primary hover:rotate-90 transition duration-300 hover:text-red-500"/>
            </button>

        </div>   
     
   
  )
}

export default UserCart