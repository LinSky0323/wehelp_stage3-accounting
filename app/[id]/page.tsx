"use client"
import { useEffect, useState } from "react";
import { getauth } from "../firebase";
import TimeSelector from "./date";
import { useParams, useRouter } from "next/navigation";


export default function Accounding(){
    const [isLog,setIsLog] = useState<boolean|null>(null)
    const params = useParams()
    const name = params.id as string
    const router = useRouter()
    useEffect(()=>{
        getauth().then((e)=>{
            if(e.uid===name){
                setIsLog(true)
            }
            else{
                router.push("/"+e.uid)
            }
        }).catch((err)=>{
            router.push("/login")
        })
    },[])
    if(isLog===true){
        return(
            <section>
               <TimeSelector/>
           </section>
       )
    }
}