import React from "react";
import { Appbar } from "../components/appbar";
import { useState , useEffect } from "react";
import transaction from "transaction";
import { BACKEND_URL } from "../config";

function TransactionHistory (){
 
    const[transactionhistory , setTransactionHistory] = useState([])
    const[recievedTransaction , setRecievedTransaction] = useState([])
        useEffect(()=>{
              async function allTransactions(){
              try {
                
                   const response = await axios.get(BACKEND_URL + "/account/transactionhistory",{
                    headers: {
                        authorization : localStorage.getItem('token')
                    }
                }) 

            setTransactionHistory(response.data.sent)
            setRecievedTransaction(response.data.recieved)

              } catch (error) {
                console.error("Server Error !")
              }
              }
              allTransactions()
        },[])
    


    return <div>
        <Appbar BarText={"Transaction History"} type={"true"}/>
        <ul className="space-y-4 mt-4 ">
            {transactionhistory.map((transactions) => (
      <li className="shadow-md p-3  bg-red-200 ">
        <div>Reciever's Name : {transactions.fullname}</div>
        <div>Amount: {transactions.sentAmount}</div>
        <div>Reciever: {transactions.sendto}</div>
        <div>TransactionID: {transactions.transactionID}  </div>
        <div>Time : {new Date(transactions.date).toLocaleString()} </div>
      
      </li>
    ))}
        </ul>

        <ul className="space-y-4 mt-2">
        {recievedTransaction.map((tx) => (
          <li key={tx._id} className="shadow-md p-3 bg-green-200 rounded">
            <div>Sender: {tx.sendto}</div>
            <div>Amount Received: {tx.sentAmount}</div>
            <div>Transaction ID: {tx.transactionID}</div>
            <div>Time: {new Date(tx.date).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
}

export default TransactionHistory;