import React from "react"
import { Heading } from "../components/heading";
import { Subheading } from "../components/subheading";
import { Button } from "../components/button";
import { Input } from "../components/inputbox"; 
import { ButtomWarning } from "../components/buttomwarning";
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import { redirect } from "react-router-dom";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";


function Signup (){

const firstnameRef = useRef(null);
const lastnameRef = useRef(null);
const emailRef = useRef(null);
const passwordRef = useRef(null);
const navigate = useNavigate()
     async function connectSignup (){
        const FirstName = firstnameRef.current.value;
        const LastName = lastnameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
          
       await axios.post(BACKEND_URL + "/user/signup", {
            FirstName,
            LastName,
            email,
            password
          }
        )
        alert("User Signed Up!")
        
      
      }


    return <div className="flex items-center justify-center min-h-screen bg-[#1a2233]  ">
     <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 ">
      <div className="text-center font-medium text-gray-900 justify-items-center text-white">
        <Heading label={"Sign up"} />
        <Subheading label={"Enter your information to create an"}/>
        account
      </div>
          
          <div className="flex text-white space-x-2 space-y-1 pt-2"> 
          <Input referance={firstnameRef} label={"First Name"} placeholder={"Harshit"} />
          <Input referance={lastnameRef} label={"Last Name"} placeholder={"Upadhyay"} />
           </div>
           <div className="text-white">
          <Input referance={emailRef}  label={"Enter Your Email Address"} placeholder={"someone@gmail.com"}/>
          <Input referance={passwordRef} label={"Password"} placeholder={"***********"} />
          </div>
          <div className="pt-4 text-center underline space-y-2 text-white" >
            <Button label={"Sign Up "} onClick={connectSignup} />
            <ButtomWarning label={"Already have an account ? "} warningtext={"Sign in"} to={"/pages/signin"}/>
          </div>  

    </div>

    </div>
}

export default Signup;