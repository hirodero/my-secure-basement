'use client'
import { useState, useEffect } from "react"
import { ClipLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion"
import toast from "react-hot-toast";
export function Profile({close,open}){
    const [user, setUser] = useState(null)
    const [profile,setProfile] = useState([])
    const [changeUsername,setUsername] = useState(false)
    const [newName,setNewName] = useState('')
    async function fetchUser(){
        const data = JSON.parse(localStorage.getItem('user'))
            const payload = JSON.stringify({
              Email:data.Email,
              Password:data.Password
            })
            const encodedPayload = btoa(payload) 
            const response = await fetch('/api/fetchuser',{
              method:'POST',
              headers:{
                'Content-Type' : 'text-plain'
              },
              body:encodedPayload
            })
            if (response.ok){
              const result = await response.json();
              localStorage.setItem('user', JSON.stringify(result.data[0]));
              return response
            }
          }
    async function submitUsernameChanges(){
        const toastId = toast.loading('Changing username..')
        if(newName.length<=0){
            toast.error('New username character must be atleast one',{id:toastId}) 
            return  
        }
        const payload = JSON.stringify({
                  UserID:user.UserID,
                  newUsername:newName
            })
        const encodedPayload = btoa(payload) 
        const response = await fetch('/api/changeUsername',{
            method:'POST',
            headers:{
                'Content-Type' : 'text-plain'
            },
                body:encodedPayload
            })
        if (response.ok){
            toast.success('Username changed successfully',{id:toastId})
            setUsername(false)
            close()
            setTimeout(() => {
                open()
            }, 500);
            fetchUser()
        }
              
    }
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
            <div className="bg-neutral-800 w-2/5 rounded-2xl">
                <div className="pt-8 pb-2 px-10 min-h-130 flex flex-col items-baseline w-full h-full gap-5 font-semibold  justify-center  text-xl text-white">
                    {
                        profile[0]?(
                        <>
                            <div className="flex flex-row w-full">
                                <span className="text-4xl font-bold">My Profile</span>
                                   <button 
                                    onClick={()=>{
                                        close();
                                        document.body.style.overflow='auto';
                                        window.location.reload()
                                    }}
                                    className="cursor-pointer text-white hover:bg-white hover:text-neutral-900 bg-red-600 ml-auto flex justify-center -translate-y-2 translate-x-6 rounded-full w-12 h-12 text-4xl">
                                        &times;
                                    </button>
                            </div>
                            <div className="flex flex-col gap-2 items-baseline w-full">
                                <div className="flex flex-col w-full p-2 gap-2 items-baseline bg-neutral-600 rounded-xl">    
                                    <span>
                                        Username: 
                                    </span>
                                    <AnimatePresence mode="wait">
                                        {!changeUsername?(
                                        <motion.span 
                                        key="username"  
                                        animate={{ width: '100%' }} 
                                        exit={{ width: '83.4%' , background:'#808080', color:'#808080'}} 
                                        transition={{duration:0.4, type:'tween'}}
                                        className="p-2 py-5 flex w-full items-baseline bg-neutral-900 rounded-lg border-1 border-white">
                                            {profile[0]?.Username}
                                        </motion.span>
                                        ):(
                                            <motion.div 
                                            key="input"
                                            exit={{ width: '116.8%', color:'#ffffff' }} 
                                            transition={{duration:0.4,type:'tween'}}
                                            className="flex w-full gap-2">
                                                <motion.input 
                                                animate={{background:'#808080'}}
                                                value={newName}
                                                onChange={(e)=>setNewName(e.target.value)}
                                                className="p-2 py-5 flex w-full items-baseline bg-neutral-900 rounded-lg border-1 border-white" type="text" placeholder="New name"/>
                                                <motion.div
                                                exit={{opacity:0}}
                                                transition={{duration:0.2}}
                                                 className="flex justify-center items-center">
                                                    <button 
                                                    onClick={()=>setUsername(false)}
                                                    className="cursor-pointer py-2 rounded-2xl px-3 text-white text-lg hover:bg-white hover:text-neutral-900 bg-red-600 ml-auto ">Cancel</button>
                                                </motion.div>
                                            </motion.div>                                    
                                        )}
                                    </AnimatePresence>
                                    <div className="flex w-full">
                                        <AnimatePresence mode="wait">
                                            {!changeUsername?(
                                                <motion.button
                                                key='username'
                                                initial={{opacity:0}}
                                                animate={{opacity:1}}
                                                exit={{opacity:0}}
                                                transition={{duration:0.01}}
                                                onClick={()=>setUsername(true)} 
                                                className="cursor-pointer text-white hover:bg-white hover:text-neutral-900 bg-red-600 py-2 px-5 rounded-xl">
                                                    Change Username
                                                </motion.button>                        
                                             ):(
                                                <motion.button
                                                key='submit'
                                                initial={{opacity:0}}
                                                animate={{opacity:1}}
                                                transition={{duration:0.2}}
                                                onClick={submitUsernameChanges} 
                                                className="cursor-pointer text-white hover:bg-white hover:text-neutral-900 bg-green-600 py-2 px-5 rounded-xl ml-auto">
                                                    Submit
                                                </motion.button>
                                            )}
                                        </AnimatePresence>
                                    </div>
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
                        </>
                            ):(
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <ClipLoader size={35} color="#8B5CF6" speedMultiplier={0.6} />
                            </div>
                            )
                        }
                            </div>
                    <div className="flex bg-neutral-600 w-full rounded-b-2xl py-2 items-center justify-center">
                        <button 
                            onClick={()=>{
                            localStorage.clear();
                            close();
                            window.location.reload();
                            document.body.style.overflow='auto'
                            }}
                            className="cursor-pointer text-white hover:bg-white hover:text-neutral-900 bg-red-600 px-7 py-2 font-semibold rounded-xl text-lg"
                        >
                            Logout
                        </button>
                    </div>
                </div>

        </motion.div>
    )
}