import React from "react"
import { BrowserRouter , Routes , Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import  Send from "./pages/home"
import  Signin from "./pages/signin"
import  Signup from "./pages/signup"
import Home from "./pages/home"
import TransactionHistory from "./pages/history"




function App() {

  return (
  <div>
    <Routes>
      <Route path="/" element ={<Home/>}/>
      <Route path="/pages/dashboard" element = {<Dashboard/>}/>
      <Route path="/pages/send" element = {<Send/>}/>
      <Route path="/pages/signup" element = {<Signup/>}/>
      <Route path="/pages/signin" element = {<Signin/>}/>
      <Route path="/pages/history" element = {<TransactionHistory/>} />
    </Routes>
     </div>
  
  )

}
 

export default App
