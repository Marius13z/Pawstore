import Image from "next/image"
import { useRouter } from "next/router"

type Product = {
  image: string,
  id: string,
  category: string,
  name: string,
  price: number
}

const ProductsCard: React.FC<Product> = ({ category, name, price, image, id }) => {
  // Router used to push users to other pages
  const router = useRouter()

  // Card used to display every product
  return (
    
    <section className="  relative group flex flex-col">
      {/* When clicked user will navigate to the specific product he has clicked */}
     <ul onClick={() => router.push(`/${category}/${id}`) } className="group cursor-pointer relative border justify-center
     flex items-center z-20 bg-white  pt-3 space-y-2 flex-col h-[210px] w-[140px] sm:w-[200px] sm:h-[250px] md:w-[170px] md:h-[230px] lg:w-[230px] lg:h-[270px]
      border-gray-200 rounded-lg shadow-lg">
        
        <li className="w-[70px] h-[70px] relative sm:w-[110px] sm:h-[110px] md:w-[90px] md:h-[90px] lg:w-[140px] lg:h-[140px]">
        {/* Products Image */}
       <Image  layout="fill" objectFit="contain"  src={image}/>
        </li>

       <li>
       {/* Products Name */}
       <p className="font-medium text-[0.75rem] text-xs pt-3 pb-3 w-[120px] sm:w-[180px] md:w-[150px] text-primary sm:font-bold text-center">{name}</p>
       </li>

       <li>
       {/* Products Price */}
       <p className="text-primary text-xs sm:text-sm pb-3">Price: <span className="font-medium text-secondary">{price} EUR</span></p>
       </li>
    

      </ul>
      
      <div className="absolute blur-md opacity-50 transition duration-300 group-hover:bg-secondary
        h-[210px] w-[140px] sm:w-[200px] sm:h-[250px] md:w-[170px] md:h-[230px] lg:w-[230px] lg:h-[270px]">
     </div>
    
    </section>
  )
}

export default ProductsCard