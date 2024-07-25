"use client"
import { createAccounting, deleteItem} from "@/app/firebase"
import "./page.css"
import { useFormState, useFormStatus } from "react-dom"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getFirestore,collection,onSnapshot, query, orderBy } from "firebase/firestore";


function sub(prevState:any, formData:FormData){
    const time = formData.get("time")
    const user = formData.get("name")
    const io = formData.get("io") 
    const content = formData.get("content");
    let price = formData.get("price");
    if(price===null || price==="" || content===null || content==="" ){
        return;
    }
    if(io==="支出"){
        price = "-" + price
    }
    createAccounting(user,time,io,content,price)
}
function del(prevState:any,formData:FormData){
    const id = formData.get("id")
    const time = formData.get("time")
    const user = formData.get("name")
    deleteItem(user,time,id)
}
function SubmitBtn({content,}:{content:string}){
    const {pending} = useFormStatus()
    return(
        <button type="submit" aria-disabled={pending}>
            {content}
        </button>
    )
}

export default function Item(){
    const params = useParams()
    const time = params.date as string
    const name = params.id as string
    const [list,setList] = useState<any[]>([])
    const [money,setMoney] = useState<number>(0)

    useEffect(()=>{  
        const db = getFirestore()
        const ref = collection(db,"accounting",name,time)
        const q = query(ref,orderBy("createTime"))
        onSnapshot(q,(messages)=>{
            const result = messages.docs.map(doc=>{
                const data=doc.data()
                const id = doc.id
                return {id,...data}
              });
            setList(result)
            let m:number = 0
            result.forEach((i:any)=>{m+=Number(i.price)})
            setMoney(m)
        })
    },[])
    const [state,formAction] = useFormState(sub,null)
    const [dstate,deleteAction] = useFormState(del,null)
    if(!list){return};
    return (
        <section className="i__container">
            <h1>{params.date}</h1>
            <form className="input__container" action={formAction}>
                <select name="io">
                    <option>支出</option>
                    <option>收入</option>
                </select>
                <label>內容<input name="content"></input></label>
                <label>價錢<input name="price"></input></label>
                <input type="hidden" name="time" value={time}></input>
                <input type="hidden" name="name" value={name}></input>
                <SubmitBtn content="送出"/>
            </form>
            <div>
                {list.map((item:any,index)=>{
                    return (
                        <div className="item__container" key={index}>
                            <div >{item.content}</div>
                            <div >{item.price}</div>
                            <form action={deleteAction}> 
                            <input type="hidden" name="id" value={item.id}></input>
                            <input type="hidden" name="time" value={time}></input>
                            <input type="hidden" name="name" value={name}></input>
                                <SubmitBtn content="刪除"/>
                            </form>
                        </div>
                )})}
                <div className="item__container">
                    <div>總金額：</div>
                    <div>{money}元</div>
                </div>
            </div>
            
        </section>
    )
}