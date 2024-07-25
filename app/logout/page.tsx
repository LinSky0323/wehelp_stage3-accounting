"use client"
import { logout } from "../firebase"
import "./page.css"
import { useRouter } from "next/navigation" 

export default function Logout(){
    const router = useRouter()
    const loginout = ()=>{
        logout()
        router.push("/")
    }

    return(
        <div className="container">
            <button onClick={loginout} className="btn">登出</button>
        </div>
    )
}