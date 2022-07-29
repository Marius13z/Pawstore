import { NextPage } from 'next';
import Link from 'next/link';

const Custom404:NextPage = () => {
  return (
    <main className="max-w-6xl h-[80vh] mx-auto justify-center items-center flex flex-col md:flex-row ">
      <img className="max-h-64" src="404.png"/>
      <div className="flex-col flex">
      <h1 className="mainHeading text-4xl">Oops! This is an 404 error, seems like this page does not exist.</h1>
      </div>
    </main>
  );
}

export default Custom404