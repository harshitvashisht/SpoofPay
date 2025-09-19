import React from "react";
import { useState } from "react";
import SearchBar from "./searchbar";
import SendMoney from "./sendmoney";
import { useEffect } from "react";
import { BACKEND_URL } from "../config";
import { Button } from "./button";


export default function Usercomponent (){
 
    const [showSendMoney , setshowSendMoney] = useState(false)
    const [FirstName , setFirstName] =  useState(null)
    const  [LastName , setLastName] = useState(null)
    const [users , setUsers] = useState([])
    



    useEffect (()=>{
              async function FullName (){
                try {
                  
                    const response = await axios.get(BACKEND_URL + "/user/getinfo",{
                        headers : {
                           authorization: localStorage.getItem('token')
                        }
                    })
                   setFirstName(response.data.FirstName)
                   setLastName (response.data.LastName)
                

                } catch (error) {
                    console.error("Errorloading value")
                }
              }
              FullName()
    },[])

    useEffect(() => {
        async function allUsers (){
            try {
                const response = await axios.get(BACKEND_URL + "/user/users",{
                     
                      headers: {
                        authorization : localStorage.getItem("token")
                      }
                })
               setUsers(response.data)
               
            } catch (error) {
                console.error("Errorloading value")
            }
        }
        allUsers()
    },[])

    const handleToggle = (userId) => {
        setshowSendMoney((prev)=>(prev === userId ? null : userId))
    }

    return <div className=" mt-6 shadow-md pt-4 shadow-mu bg-gray-100 ">
        <div className="flex justify-between w-full">
        <div className="text-2xl font-semibold uppercase justify-between">
            {FirstName  !== null ? FirstName : "Loading..."}  {LastName !== null ? LastName : "Loading...."}
            
            </div>
        </div>
       <div className="mt-4 text-2xl font-bold ">Available Users : </div>
       <ul className="space-y-4 mt-4 w-ful">
               {users.map((user)=>(
                <li className="shadow-md p-3 flex items-start justify-between" key={user._id}>
                    <div className="font-medium">
                        {user.FirstName} {user.LastName}
                    </div>
                    <div>
                        <button onClick={()=>handleToggle(user._id)} className="l-4 rounded bg-slate-800 px-2.5 py-1 text-sm text-white hover:bg-slate-700">
                            {showSendMoney === user._id ? "Cancel" : "Send Money"}
                        </button>
                    </div>
                    {showSendMoney === user._id && (
                        <div className="mt-4 flex justify-center">
                            <SendMoney reciever={user._id} FirstName={user.FirstName} LastName={user.LastName}/>
                        </div>
                    )}
                </li>
               ))}
       
       </ul>
   </div> 
}