'use client'
import { useState, useEffect } from "react"
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion"
export function Profile({close}){
    const [user, setUser] = useState(null)
    const [profile,setProfile] = useState([])
    useEffect(() => {
        document.body.style.overflow='hidden'
        const data = localStorage.getItem('user')
        if (data) {
        setUser(JSON.parse(data))
        }
    }, [])
    useEffect(()=>{
        if(user){
            async function fetchProfile(){
                const payload = JSON.stringify({
                  UserID:user.UserID,
                })
                const encodedPayload = btoa(payload) 
                const response = await fetch('/api/profile',{
                  method:'POST',
                  headers:{
                    'Content-Type' : 'text-plain'
                  },
                  body:encodedPayload
                })
                if (response.ok){
                  const result = await response.json();
                  setProfile(result.data)
                  return response
                }
              }
              fetchProfile()
        }
    },[user])
    return(
        <motion.div 
        initial={{opacity:0}} 
        animate={{opacity:1}} 
        exit={{opacity:0}} 
        transition={{duration:0.3}} 
        className="flex fixed inset-0 justify-center items-center bg-neutral-900/40">
            <div className="h-4/5 w-2/5 bg-black rounded-2xl">
                <div className="relative w-full h-full">
                    <button 
                    onClick={()=>{
                        close();
                        document.body.style.overflow='auto';
                    }}
                    className="rounded-full bg-red-500 w-12 h-12 text-4xl text-white hover:text-red-600">
                        &times;
                    </button>
                    {
                        profile?(
                            <div className="absolute inset-10 flex flex-col justify-center items-center text-xl text-white">
                                <div className="p-10 flex flex-col items-baseline w-full h-full gap-5 font-semibold">
                                    <span className="text-4xl font-bold">My Profile</span>
                                    <div className="flex flex-col gap-2 items-baseline w-full">
                                        <div className="flex flex-col w-full p-2 items-baseline bg-neutral-600 rounded-xl">    
                                            <span>
                                                Username: 
                                            </span>
                                            <span className="p-2 py-5 flex w-full items-baseline bg-neutral-900 rounded-lg border-1 border-white">
                                                {profile[0]?.Username}
                                            </span>
                                        </div>
                                        <div className="flex flex-col w-full p-2 items-baseline bg-neutral-600 rounded-xl">    
                                            <span>
                                                Email: 
                                            </span>
                                            <span className="p-2 py-5 flex w-full items-baseline bg-neutral-900 rounded-lg border-1 border-white">
                                                {profile[0]?.Email}
                                            </span>
                                        </div>
                                        <div className="flex flex-col w-full p-2 items-baseline bg-neutral-600 rounded-xl">
                                            ??    
                                            <span className="p-2 py-5 flex w-full items-baseline bg-neutral-900 rounded-lg border-1 border-white">
                                                {profile[0]?.Description}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button 
                                onClick={()=>{
                                    localStorage.clear();
                                    close();
                                    window.location.reload();
                                    document.body.style.overflow='auto'
                                }}
                                className="cursor-pointer hover:text-rd-600 hover:bg-white hover:text-red-600 bg-red-600 px-7 py-2 font-semibold rounded-xl text-lg"
                                >
                                    Logout
                                </button>
                            </div>
                        ):(
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <ClipLoader size={35} color="#8B5CF6" speedMultiplier={0.6} />
                        </div>
                        )
                    }
                </div>
            </div>

        </motion.div>
    )
}