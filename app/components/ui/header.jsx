'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Profile } from "./profile"
import { Sidebar } from "./sidebar"
import { AnimatePresence } from "framer-motion"
export function Header(){
    const router= useRouter()
    const [user, setUser] = useState(null)
    const [modal,setModal] = useState({profile:false,sidebar:false})
    useEffect(() => {
    const data = localStorage.getItem('user');
    if (data) {
        try {
        setUser(JSON.parse(data));
        } catch (err) {
        localStorage.removeItem('user');
        }
    }
    }, []);

    return(
        <div className="fixed inset-0">
            <div className="flex flex-row w-full items-center bg-neutral-800/80 h-1/8">
                <div className="p-4">
                    <button 
                    onClick={()=>setModal((prev)=>{
                                const clone = {...prev}
                                clone.sidebar=true
                                return clone})}
                    className="cursor-pointer hover:text-neutral-500  text-3xl text-white">
                        &#9776;
                    </button>
                </div>
                <div className="w-full p-4 text-end">
                    {
                    user?(
                    <button 
                    onClick={()=>setModal((prev)=>{
                                const clone = {...prev}
                                clone.profile=true
                                return clone})}
                    className="cursor-pointer transition duration-25 active:scale-105 hover:text-gray-500 hover:bg-white text-white border-2 border-neutral-700 px-5 py-3 bg-gray-500 rounded-lg">
                        <span className="font-bold">
                            Profile
                        </span>
                    </button>
                        ):(
                        <button 
                        onClick={()=>router.push('/login')}
                        className="cursor-pointer transition duration-25 active:scale-105 hover:text-gray-500 hover:bg-white text-white border-2 border-neutral-700 px-5 py-3 bg-gray-500 rounded-lg">
                            <span className="font-bold">
                                Login
                            </span>
                        </button>
                        )
                    }
                    <AnimatePresence>
                        {modal.profile&&(
                            <Profile 
                            close={() => setModal((prev)=>{
                                const clone = {...prev}
                                clone.profile=false
                                return clone
                            })}
                            open={() => setModal((prev)=>{
                                const clone = {...prev}
                                clone.profile=true
                                return clone
                            })}
                            />
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {modal.sidebar&&(
                            <Sidebar close={() => setModal(false)} />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}