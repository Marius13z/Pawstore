

const Error404 = () => {
  return (
    <main className="max-w-6xl h-[80vh] mx-auto justify-center items-center flex flex-col md:flex-row ">
    {/* Error 404 page */}
    <img className="max-h-32 md:max-h-64" src="404.png"/>
    <div className="flex-col flex">
    <h1 className="mainHeading text-xs max-w-[200px] text-center md:max-w-xl font-medium text-primary md:text-md lg:text-3xl">Oops! This is an 404 error, seems like this page does not exist.</h1>
    </div>
  </main>
  )
}

export default Error404