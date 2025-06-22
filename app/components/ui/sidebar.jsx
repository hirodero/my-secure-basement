'use client'
import { useState, useEffect } from "react"
import { motion,AnimatePresence } from "framer-motion"
export function Sidebar({close}){
    const [user, setUser] = useState(null)
    const [friends,setFriends] = useState([])
    const [showFriend,setShowFriend] = useState(false) 
    useEffect(() => {
        document.body.style.overflow='hidden'
        const data = localStorage.getItem('user')
        if (data) {
        setUser(JSON.parse(data))
        }
    }, [])

    async function fetchFriends(){
        if(user){
            const payload = JSON.stringify({
            UserID:user.UserID,
        })
        const encodedPayload = btoa(payload) 
        const response = await fetch('/api/fetchfriends',{
            method:'POST',
            headers:{
            'Content-Type' : 'text-plain'
            },
            body:encodedPayload
        })
        if (response.ok){
            const result = await response.json();
            setFriends(result.data)
            return response
        }
        }
        
    }
    return(
        <motion.div 
        initial={{translateX:-100,opacity:0}} 
        animate={{translateX:0,opacity:1}} 
        exit={{translateX:-100,opacity:0}} 
        transition={{duration:0.3}} 
        className="flex fixed inset-0 justify-baseline items-center bg-neutral-900/40">
            <motion.div 
            initial={{opacity:0}} 
            animate={{opacity:1}} 
            exit={{opacity:0}} 
            transition={{duration:0.3}}
            className="h-full w-1/5 bg-neutral-700 p-6"
             >
                <button 
                    onClick={()=>{
                        close();
                        document.body.style.overflow='auto';
                    }}
                    className="cursor-pointer hover:text-neutral-500  text-4xl text-white">
                        &#9776;
                </button>
                <div className="flex flex-col justify-baseline gap-2 w-full h-full bg-neutral-900 rounded-xl p-2">
                    {
                        ['Friends List','Add Friends (inaccessible)'].map((items,index)=>{
                            return(
                                <div 
                                key={index}
                                onClick={()=>{
                                    if(items==='Friends List'){
                                        fetchFriends();
                                        setShowFriend(!showFriend)
                                    }
                            
                                }}
                                className="cursor-pointer hover:bg-neutral-500 flex h-10 w-full justify-baseline bg-neutral-800 p-2 text-white font-bold rounded-xl border-1 border-black">
                                    {items}
                                </div>
                            )
                        })
                    }
                    
                </div>
                
            </motion.div>
            <AnimatePresence>
                {
                        showFriend&&(
                            <motion.div 
                            initial={{translateX:-100,opacity:0,zIndex:-10}} 
                            animate={{translateX:0,opacity:1}} 
                            exit={{translateX:-100,opacity:0,zIndex:-10}} 
                            transition={{duration:0.3}}
                            className="flex flex-col gap-2 h-full mt-50 w-1/5 bg-neutral-800 border-5 border-neutral-700 rounded-r-2xl p-4"
                            >
                                {friends.map((items,index)=>{
                                    return(
                                        <div key={index} className="cursor-pointer hover:bg-neutral-500 flex h-10 w-full justify-baseline bg-neutral-600 p-2 text-white font-bold rounded-xl border-1 border-black">
                                        {items.Username}
                                </div>
                                    )
                                })}
                                
                            </motion.div>
                        )
                        
                    }
            </AnimatePresence>
        </motion.div>
    )
}