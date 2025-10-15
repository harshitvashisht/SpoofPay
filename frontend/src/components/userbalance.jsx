import React from "react";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";
import SearchBar from "./searchbar";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import axios from "axios";

export default function Userbalance() {

    const [balance, setBalance] = useState(null)
    const navigate = useNavigate()

    function handleHistory() {
        navigate('/pages/history')
    }

    useEffect(() => {
        async function getBalance() {
            try {
                const response = await axios.get(BACKEND_URL + "/account/balanceEnquiry", {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                })
                setBalance(response.data.accountBalance)
            } catch (error) {
                console.error("Error loading value")
            }
        }
        getBalance()
    }, [])

    return (
        <div className="bg-[#1a2233] px-6 py-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-[#0f1623] border border-cyan-500/30 rounded-xl p-6 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        {/* Balance Section */}
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 text-cyan-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400 mb-1">Available Balance</div>
                                <div className="text-3xl font-bold text-white">
                                    {balance !== null ? `₹${balance.toLocaleString('en-IN')}` : (
                                        <span className="text-gray-500">Loading...</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Transaction History Button */}
                        <button
                            onClick={handleHistory}
                            className="px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Transaction History
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}