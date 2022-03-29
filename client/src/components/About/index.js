import React from "react";
//import image from "./xenia-radchenko-ezEn4jYrVYQ-unsplash.jpg"

export default function About() {

  return (
    <div className="About dark:text-white">
      <div className="h-screen flex justify-center items-center"> 
        <p className="font-bold text-9xl">About.</p>
      </div>

      <div className="h-screen flex bg-gray-200 dark:bg-white dark:text-white" >
        <div className="flex flex-col justify-center items-center w-1/2" >
          <p className="font-bold text-8xl p-10">All Game reviews in one place.</p>
          
        </div>

        <div className="w-1/2">
          <div className="h-screen flex items-end bg-cover bg-[url('/src/assets/lorenzo-herrera-p0j-mE6mGo4-unsplash.jpg')]">
            <p className="text-3xl text-white font-bold p-10">Datasets from Kaggle,<br></br> Game covers scrapped from Google </p>
          </div>
        </div>
      </div>

      <div className="h-screen flex flex-col" >
        <div className="h-1/2 flex items-center justify-center">
          <p className="text-7xl font-bold h-1/4">Our Team.</p>
        </div>

        <div className="h-1/2 flex ">
          <div className="w-1/2 p-10">
            <p className="text-4xl ">Banatech is a dedicated software development company which strives for quality and customer satisfaction.</p>
          </div>

          <div className="w-1/2 p-10">
            <p className="text-2xl font-bold">Developers</p>
            <p className="text-2xl  mt-10">Sirine</p>
            <p className="text-2xl  mt-5">Asli</p>
            <p className="text-2xl  mt-5">Jei</p>
            <p className="text-2xl  mt-5">Rodrigo</p>
            <p className="text-2xl  mt-5">Le</p>
          </div>

        </div>
      </div>
      
      <p></p>

    </div>
  );
}
// <img src={image} alt="arcade" className="object-cover h-screen w-full"></img>
//<p className="text-4xl p-10">Datasets from Kaggle, Game covers scrapped from Google </p>