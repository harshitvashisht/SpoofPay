import React from "react";
import { Appbar } from "../components/appbar";
import { useState , useEffect } from "react";
import transaction from "transaction";
import { BACKEND_URL } from "../config";

function TransactionHistory (){
 
    const[transactionhistory , setTransactionHistory] = useState([])
   
        useEffect(()=>{
              async function allTransactions(){
              try {
                
                   const response = await axios.get(BACKEND_URL + "/account/transactionhistory",{
                    headers: {
                        authorization : localStorage.getItem('token')
                    }
                }) 

            const sentTx = (response.data.sent || []).map((tx) => ({
                      ...tx,
                      type: "sent",
                   }));
        const receivedTx = (response.data.recieved || []).map((tx) => ({
                       ...tx,
                       type: "received",
        }));

        const merged = [...sentTx, ...receivedTx].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )
        setTransactionHistory(merged)

              } catch (error) {
                console.error("Server Error !")
              }
              }
              allTransactions()
        },[])
    


    return <div>
        <Appbar BarText={"Transaction History"} type={"true"}/>
        <ul className="space-y-4 mt-4">
        {transactionhistory.map((tx) => (
          <li
            key={tx._id}
            className={`shadow-md p-3 rounded ${
              tx.type === "sent" ? "bg-red-200" : "bg-green-200"
            }`}
          >
            {tx.type === "sent" ? (
              <>
                <div>Receiver: {tx.sendto}</div>
                <div>Amount Sent: {tx.sentAmount}</div>
              </>
            ) : (
              <>
                <div>Sender: {tx.sendto}</div>
                <div>Amount Received: {tx.sentAmount}</div>
              </>
            )}
            <div>Transaction ID: {tx.transactionID}</div>
            <div>Time: {new Date(tx.date).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
}

export default TransactionHistory;