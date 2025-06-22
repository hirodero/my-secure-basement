'use client'
import { useState, useEffect } from "react"
import { ClipLoader } from "react-spinners";
export default function Home() {
  const [user, setUser] = useState(null)
  const [check,setCheck] = useState(false)
  useEffect(() => {
    const data = localStorage.getItem('user')
    if (data) {
      setUser(JSON.parse(data))
    }else{
      setCheck(true)
    }
  }, [])

  return (
    <div className="bg-[url(/assets/redwall.jpg)] bg-fixed bg-cover w-screen h-screen bg-center">
      <div className="flex w-full h-full items-center justify-center">
        <div className="flex flex-col font-bold text-white text-2xl justify-center items-center"> 
          {
            user?(
              <>
                <p className="text-4xl mb-5">
                  Welcome!
                </p>
                <span>Nice to meet you {user.Username}</span>
              </>
            ):(
              check?(
                <>
                  <p className="text-4xl mb-5">
                    Welcome!
                  </p>
                  <p>
                    There's nothin much to do here, 
                  </p>
                  <p>
                    so perhaps.. you should try logging in?
                  </p>
                </>
              ):(
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="p-4 bg-neutral-950/90 border-3 rounded-2xl border-gray-400">
                    <ClipLoader size={35} color="#8B5CF6" speedMultiplier={0.6} />
                  </div>
                </div>
              )
            )
          }
        </div>
      </div>
    </div>
  );
}
