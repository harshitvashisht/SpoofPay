import React from "react";
import { Appbar } from "../components/appbar";
import Userbalance from "../components/userbalance";
import Usercomponent from "../components/usercomponent";



function Dashboard (){
     
    return <div>
     
     <Appbar BarText={"SpoofPay"} type={"true"}/>
     <Userbalance/> 
     <Usercomponent/>
    
    </div>
}

export default Dashboard;