import React from "react"
import { Heading } from "../components/heading";
import { Subheading } from "../components/subheading";
import { Button } from "../components/button";
import { Input } from "../components/inputbox"; 
import { ButtomWarning } from "../components/buttomwarning";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";


function Signin (){
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const navigate = useNavigate()

  async function createSignin() {
          const email = emailRef.current.value;
          const password = passwordRef.current.value;

       const response =  await axios.post(BACKEND_URL + "/user/signin",{
            email,
            password
          })
          const jwt = response.data.token;
          localStorage.setItem("token" ,jwt)
          navigate('/pages/dashboard')
  }
    return <div className="flex items-center justify-center min-h-screen bg-[#1a2233]  ">
         <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 ">
          <div className="text-center font-medium text-gray-900 justify-items-center text-white">
            <Heading label={"Sign in"} />
            <Subheading label={"Login With Your Credentials !"}/>
          </div>
               <div className="text-white space-y-2">
              <Input referance={emailRef} label={"Email"} placeholder={"someone@gmail.com"}/>
              <Input referance={passwordRef} label={"Password"} placeholder={"***********"} />
              </div>
              <div className="pt-4 text-center underline space-y-2 text-white" >
                <Button onClick={createSignin} label={"Sign In "}  />
                <ButtomWarning label={"Don't have an account ? "} warningtext={"Sign up"} to={"/pages/signup"}/>
              </div>  
    
        </div>
    
        </div>
    
}

export default Signin;