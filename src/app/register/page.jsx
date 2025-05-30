'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
export default function Register() {
  const [data,setData] =  useState({Username:'',Email:'',Password:''})
  const router = useRouter()
  const submit =()=>{
    const toastId = toast.loading('Submitting..')
    if (!data.Email.includes('@') || !data.Email.includes('.')){
      toast.error('Please provide a proper email format',{id:toastId})
      return
    }
    if(data.Email.startsWith('@')){
      toast.error('Email substring need to be at least 1 character',{id:toastId})
      return
    }
    else{
      async function submitUser(){
        const payload = JSON.stringify({
          Username: data.Username,
          Email:data.Email,
          Password:data.Password
        })
        const encodedPayload = btoa(payload) 
        const response = await fetch('/api/submituser',{
          method:'POST',
          headers:{
            'Content-Type' : 'text-plain'
          },
          body:encodedPayload
        })
        if(response.status===409){
          toast.error('This email is already registered!',{id:toastId})
        }else if(response.status===200){
          toast.success('Registration completed!',{id:toastId})
        }
        if(response.ok){
          router.push('/login')
        }
        return response
      }
      submitUser()
      
    }
  }
  return (
    <div className="bg-[url(/assets/book.jpg)] bg-fixed bg-cover w-screen h-screen bg-center">
        <div className="fixed inset-0 flex justify-center items-center w-full h-full p-10">
          <div className="flex flex-col justify-evenly items-center w-3/8 h-full bg-neutral-900 rounded-2xl p-4">
            <div className="flex flex-col w-full h-10 justify-center items-center">
              <span className="text-2xl font-bold text-white">Register</span>
            </div>
            <div className="flex flex-col w-full h-2/3 py-6 gap-4 bg-neutral-700 rounded-lg">
              {['Username','Email','Password'].map((items, index)=>{
                const identifier={
                    Username:{
                      text:'Hirodero',
                      type:'text'
                    },
                    Email:{
                      text:'hirohirohiro@gmail.com',
                      type:'text'
                    },
                    Password:{
                      text:'********',
                      type:'Password'
                    }
                }
                return(
                <div 
                key={index}
                className={`w-full flex justify-center `}>
                    <div className="flex flex-col w-8/9">
                        <span className="text-lg font-semibold text-white">
                            {items}
                        </span>
                        <input 
                        value={data[items]}
                        onChange={(e)=>setData((prev)=>{
                          const clone = {...prev};
                          clone[items] = e.target.value;
                          return clone
                        })}
                        className="p-2 w-10/11 h-full rounded-2xl bg-white" type={identifier[items].type} placeholder={identifier[items].text}/>
                    </div>
                </div>
                )
              })}
              <div className="ml-8">
                <span
                onClick={()=>router.push('/login')}
                className="cursor-pointer font-semibold text-white hover:text-neutral-300">
                  Login Here!
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-20 bg-neutral-600 rounded-lg">
              <button
              onClick={submit}
              className="cursor-pointer hover:bg-white hover:text-neutral-800 active:bg-black active:text-white w-9/11 h-5/9 bg-neutral-800 rounded-xl text-white text-lg font-semibold">
                Submit
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}
