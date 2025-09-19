import React from "react"
import { Appbar } from "../components/appbar";

 function Home (){
  return <div >
    <Appbar BarText={"SpoofPay"} type={"false"}/>
  <div className="flex items-center justify-center min-h-screen bg-[#1a2233]">
    <div className="text-8xl text-bold text-white animate-neonTextGlow">
           SpoofPay
      </div>
  </div>
  </div>
 }

export default Home ;