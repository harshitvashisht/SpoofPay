import React from "react";
import { useState,useEffect } from "react";
import { BACKEND_URL } from "../config";
import SearchBar from "./searchbar";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";

export default function Userbalance (){

    const [balance , setBalance] = useState(null)
    const navigate = useNavigate()

    function handleHistory (){
    navigate('/pages/history')
}

useEffect(()=>{
    async function getBalance() {
        try {
            const response = await axios.get(BACKEND_URL + "/account/balanceEnquiry",{
               headers:{
                authorization : localStorage.getItem("token")
               }
            })
            setBalance(response.data.accountBalance)
        } catch (error) {
            console.error("Errorloading value")
        }
    }
    getBalance()
},[])
    return <span className=" w-screen self-center flex flex-row text-2xl font-semibold mt-4 justify-between ">
        <div className="font-semibold ml-2">
            Your Balance :  
           {balance !== null ? `₹ ${balance}` : "Loading...."} 
        </div>
        <div className="mr-2 self-auto ">
             <Button onClick={handleHistory} label={"Transaction History"}/>
        </div>
    </span>

}