"use client"
import "./page.css"
import {  login } from "../firebase"
import { useFormStatus,useFormState } from "react-dom"


function loginin(prevState:any, formData:FormData){

    const acount = formData.get("acount");
    const password = formData.get("password");
    login(acount,password) as (boolean | unknown);
}

function SubmitBtn(){
    const {pending} = useFormStatus()

    return(
        <button type="submit" aria-disabled={pending}>
            登入
        </button>
    )
}

export default function Login(){
    const [state,formAction] = useFormState(loginin, null)

    return (
        <div className="conatiner">
            <form className="form" action={formAction}>
                <label>帳號<input type="text" name="acount"></input></label>
                <label>密碼<input type="password" name="password"></input></label>
                <SubmitBtn/>
            </form>
        </div>
    )
}