import React from "react";
import { useState } from "react";
import { Heading } from "./heading";
import { Input } from "./inputbox";
import { Button } from "./button";
import { useRef } from "react";
import { BACKEND_URL } from "../config";


export default function SendMoney ({FirstName , LastName,reciever}){
   const amountRef = useRef(null)

async function moneyTransaction (){
        
        const amount= amountRef.current.value;
         const response = await axios.post(BACKEND_URL + "/account/transfer",{
            reciever,
            amount
        },{
            headers: {
                authorization : localStorage.getItem('token')
            }
        } 
    ) 
    alert("Transaction Completed")
}
    return <div className=" flex items-center justify-center min-h-screen">
    <div className="w-full max-w-sm p-4  justify-items-center  rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-200 dark:border-gray-700">
        <Heading label={"Send Money"} />
 <div className="font-semibold text-2xl mt-4 mb-2 ">
    <svg className="mt-2 flex items-center  justify-center" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
            {FirstName}
            {LastName}
        </div>
        <div className="space-y-2">
            <Input referance={amountRef} placeholder={"Amount (in Rs.)" } />
            <Button  onClick={moneyTransaction} label={"Initiate Transaction"} />
          
        </div>
    </div>
    </div>
}