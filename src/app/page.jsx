'use client'
import { useState, useEffect } from "react"
export default function Home() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const data = localStorage.getItem('user')
    if (data) {
      setUser(JSON.parse(data))
    }
  }, [])

  return (
    <div className="bg-[url(/assets/redwall.jpg)] bg-fixed bg-cover w-screen h-screen bg-center">
      <div className="flex w-full h-full items-center justify-center">
        <div className="flex flex-col font-bold text-white text-2xl justify-center items-center"> 
          <p className="text-4xl mb-5">
            Welcome!
          </p>{
            user?(
              <>
                <span>Nice to meet you {user.Username}</span>
              </>
            ):(
              <>
                <p>
                  There's nothin much to do here, 
                </p>
                <p>
                  so perhaps.. you should try logging in?
                </p>
              </>
            )
          }
        </div>
      </div>
    </div>
  );
}
