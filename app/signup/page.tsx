"use client"
import { useFormState, useFormStatus } from "react-dom"
import { signup } from "../firebase"
import "./page.css"


async function sign_up(prevState:any, formData:FormData){
    const acount = formData.get("acount");
    const password = formData.get("password");
    signup(acount,password)
}

function SubmitBtn(){
    const {pending} = useFormStatus()

    return(
        <button type="submit" aria-disabled={pending}>
            註冊
        </button>
    )
}




export default function Signup(){
    const [state,formAction] = useFormState(sign_up, null)
   
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