import { collection, DocumentData, getDocs } from "firebase/firestore"
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next"
import Card from "../components/Card"
import { db } from "../lib/firebase"


// Pre-render shop page
export async function getStaticProps() {

   // Collection reference to all the available products
   const colRef = collection(db, "products")
 
   // Pull products data to display them on UI
   const docSnap = (await getDocs(colRef)).docs.map(doc => {
    return {
      data: doc?.data(),
      id: doc?.id
    }
   })


  return {
    props: {
      data: JSON.stringify(docSnap)
    }
  }

} 

const shop:NextPage = ({ data }: any) => { 
  const products = JSON.parse(data).map((doc:DocumentData) => doc)

  

  return (
        <main>
        <section className="flex  flex-col items-center mt-20 px-16 space-y-7 justify-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-center text-primary font-bold">One toy, treat or walk can make him happy</h1>
        <hr className="h-[2px] bg-primary min-w-[200px] md:min-w-[400px] lg:min-w-[500px] shadow-md " />

        </section>
        <section className={`grid grid-flow-col grid-rows-12 md:grid-rows-6 xl:grid-rows-5
         mt-10 mb-16 justify-center gap-y-5 gap-x-5 lg:gap-x-10 lg:gap-y-10 px-16`}>

          {/* Available products */}
       {products && products?.map((product:DocumentData) => (
        <Card image={product?.data.image}
         category={product?.data.category}
         id={product.id}
         key={product.id} 
         name={product?.data.name} 
         price={product?.data.price}
         />
       ))}
       </section>
        
        </main>
  )
}

export default shop