import React from "react";
import Dropdown from "./dropdown";

export function Appbar ({type ,BarText}){

function logout (){
    localStorage.clear();
 window.location.href="/"
} 

if (type === "true"){
       return  <nav className="bg-white border-gray-200 dark:bg-gray-900 overflow-visible">
        <div className="items-streach max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 overflow-visible">
         <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
           {BarText}
           
         </span>
        <span className="flex text-xl text-white overflow-visible">
            <span className="rounded-full h-8 w-8 bg-slate-400 flex justify-center mt-1 mr-2">
                <span className="flex flex-col justify-center text-s">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg> 
                </span>
            </span>
            <button onClick={logout} className="ml-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
</svg>
</button>
           
        </span>
           
           </div>
       </nav>
}else {
   return  <nav className="bg-white border-gray-200 dark:bg-gray-900 overflow-visible">
        <div className="items-streach max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 overflow-visible">
         <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
           {BarText}
         </span>
        <span className="flex text-xl text-white overflow-visible">
            <span className="rounded-full h-8 w-8 bg-slate-400 flex justify-center mt-1 mr-2">
                <span className="flex flex-col justify-center text-s">
                 <button><svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg></button>
                </span>
            </span>
            <div className="relative">
            <Dropdown/>
           </div>
        </span>
        
           </div>
           
       </nav>
}
}