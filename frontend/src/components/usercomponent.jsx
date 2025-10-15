import React from "react";
import { useState } from "react";
import SearchBar from "./searchbar";
import SendMoney from "./sendmoney";
import { useEffect } from "react";
import { BACKEND_URL } from "../config";
import { Button } from "./button";
import axios from "axios";

export default function Usercomponent() {
 
    const [showSendMoney, setshowSendMoney] = useState(false)
    const [FirstName, setFirstName] = useState(null)
    const [LastName, setLastName] = useState(null)
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function FullName() {
            try {
                const response = await axios.get(BACKEND_URL + "/user/getinfo", {
                    headers: {
                        authorization: localStorage.getItem('token')
                    }
                })
                setFirstName(response.data.FirstName)
                setLastName(response.data.LastName)
            } catch (error) {
                console.error("Error loading value")
            }
        }
        FullName()
    }, [])

    useEffect(() => {
        async function allUsers() {
            try {
                const response = await axios.get(BACKEND_URL + "/user/users", {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                })
                setUsers(response.data)
            } catch (error) {
                console.error("Error loading value")
            }
        }
        allUsers()
    }, [])

    const handleToggle = (userId) => {
        setshowSendMoney((prev) => (prev === userId ? null : userId))
    }

    return (
        <div className="min-h-screen bg-[#1a2233] px-6 py-8">
            <div className="max-w-4xl mx-auto">
                {/* User Info Card */}
                <div className="bg-[#0f1623] border border-cyan-500/30 rounded-xl p-6 mb-8 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">
                                {FirstName ? FirstName[0] : "?"}
                            </span>
                        </div>
                        <div>
                            <div className="text-sm text-gray-400 mb-1">Welcome back,</div>
                            <div className="text-2xl font-bold text-white">
                                {FirstName !== null ? FirstName : "Loading..."} {LastName !== null ? LastName : "Loading..."}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Available Users Section */}
                <div className="bg-[#0f1623] border border-cyan-500/30 rounded-xl p-6 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                    <div className="flex items-center gap-3 mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 text-cyan-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>
                        <h2 className="text-2xl font-bold text-white">Available Users</h2>
                    </div>

                    {users.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-lg">No users found</div>
                        </div>
                    ) : (
                        <ul className="space-y-3">
                            {users.map((user) => (
                                <li 
                                    key={user._id} 
                                    className="bg-[#1a2233] border border-cyan-500/20 rounded-lg overflow-hidden hover:border-cyan-500/40 transition-all"
                                >
                                    <div className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                                                <span className="text-lg font-semibold text-white">
                                                    {user.FirstName[0]}{user.LastName[0]}
                                                </span>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-white text-lg">
                                                    {user.FirstName} {user.LastName}
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    Send money instantly
                                                </div>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => handleToggle(user._id)} 
                                            className="px-5 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                                        >
                                            {showSendMoney === user._id ? (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                    </svg>
                                                    Cancel
                                                </>
                                            ) : (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                                    </svg>
                                                    Send Money
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    {showSendMoney === user._id && (
                                        <div className="px-4 pb-4 pt-2 border-t border-cyan-500/20">
                                            <SendMoney 
                                                reciever={user._id} 
                                                FirstName={user.FirstName} 
                                                LastName={user.LastName}
                                            />
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}