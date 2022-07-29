import { useRouter } from "next/router"

type Product = {
  image: string,
  id: string,
  category: string,
  name: string,
  price: number
}

const Card: React.FC<Product> = ({ category, name, price, image, id }) => {
  const router = useRouter()

  return (
    <div className="  relative group flex flex-col">

     <div onClick={() => router.push(`/${category}/${id}`) }   className="group cursor-pointer relative border 
     flex items-center z-20 bg-white pt-3 space-y-2 flex-col w-[200px] h-[250px] md:w-[170px] md:h-[230px] lg:w-[230px] lg:h-[270px]
      border-gray-200 rounded-lg shadow-lg">

       <img className=" h-[110px] md:h-[90px] lg:h-[140px] object-contain" src={image}/>
       <p className="text-xs pt-3 pb-3 w-[180px] md:w-[150px] text-primary font-bold text-center">{name}</p>
       <p className="text-primary text-sm">Price: <span className="font-medium text-secondary">{price} EUR</span></p>
      

      </div>
      <div className="absolute blur-md opacity-50 transition duration-300 group-hover:bg-secondary
       w-[200px] h-[250px] md:w-[170px] md:h-[230px] lg:w-[230px] lg:h-[270px]">
     </div>
    
    </div>
  )
}

export default Card