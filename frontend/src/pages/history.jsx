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
                      FirstName
                   }));
        const receivedTx = (response.data.recieved || []).map((tx) => ({
                       ...tx,
                       type: "received",
                       FirstName
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
        <div className="bg-gray-200 px-2 py-10">
  <div id="transaction-history" className="mx-auto max-w-6xl">
    <p className="text-center text-base font-semibold leading-7 text-primary-500">
      Transaction History
    </p>
    <h2 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
      Your Recent Transactions
    </h2>
    <ul className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {transactionhistory.map((tx) => (
        <li
          key={tx._id}
          className={`rounded-xl px-6 py-6 shadow-sm text-slate-800 ${
            tx.type === "sent" ? "bg-red-200" : "bg-green-200"
          }`}
        >
          <h3 className="font-display text-lg font-medium mb-2">
            {tx.type === "sent" ? "Sent Transaction" : "Received Transaction"}
          </h3>

          {tx.type === "sent" ? (
            <>
              <p className="text-sm">Receiver: <span className="font-semibold">{tx.sendto}</span></p>
              <p className="text-sm">Receiver Name: <span className="font-semibold">{tx.FirstName}</span></p>
              <p className="text-sm">Amount Sent: <span className="font-semibold">{tx.sentAmount}</span></p>
            </>
          ) : (
            <>
              <p className="text-sm">Sender: <span className="font-semibold">{tx.sendto}</span></p>
              <p className="text-sm">Amount Received: <span className="font-semibold">{tx.sentAmount}</span></p>
            </>
          )}

          <p className="text-sm mt-2">Transaction ID: {tx.transactionID}</p>
          <p className="text-xs text-gray-600">Time: {new Date(tx.date).toLocaleString()}</p>
        </li>
      ))}
    </ul>
  </div>
</div>
    </div>
}

export default TransactionHistory;