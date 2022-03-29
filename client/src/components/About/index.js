import React from "react";
import image from "../../assets/xenia-radchenko-ezEn4jYrVYQ-unsplash.jpg"

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
          <div className="">
            <img src={image} alt="arcade" className="object-cover h-screen w-full"></img>
            
          </div>
        </div>
      </div>

      <div className="h-screen " >
        <p>Our Team.</p>
      </div>
      
      <p></p>

    </div>
  );
}
//<p className="text-4xl p-10">Datasets from Kaggle, Game covers scrapped from Google </p>