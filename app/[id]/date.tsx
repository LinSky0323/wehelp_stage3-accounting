"use client"
import { useState } from "react";
import "./page.css"
import { useParams, useRouter } from "next/navigation";

export default function TimeSelector(){
    const router = useRouter()
    const pathname = useParams()
    const Day = new Date()
    const [thisMonth,setThisMonth] = useState(Day.getMonth()+1)
    const firstWeek = (new Date(`2024-${thisMonth}-01`)).getDay()
    const months:string[] = [
        "一月", "二月", "三月", "四月", "五月", "六月",
        "七月", "八月", "九月", "十月", "十一月", "十二月"
    ];
    const days:number[] = ((Day.getFullYear()%4===0 || Day.getFullYear()%100 !==0) ?[31,29,31,30,31,30,31,31,30,31,30,31]:[31,28,31,30,31,30,31,31,30,31,30,31])
    const daysOfWeek:string[] = ["日", "一", "二", "三", "四", "五", "六"];
    const day = days[thisMonth-1]
    const weeks = Math.ceil((firstWeek+day)/7)
    const array1:any[] = new Array(firstWeek).fill('')
    const mainArray:any[] = []
    for(let i=1;i<=day;i++){
        mainArray.push(i)
    }
    const array2:any[] = new Array((weeks*7-firstWeek-day)).fill('')
    const result = (array1.concat(mainArray)).concat(array2);

    const handlechange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        const month:number = e.target.selectedIndex+1;
        setThisMonth(month)
    }
    const handleClick=(e:React.MouseEvent<HTMLDivElement>)=>{
        const target = e.target as HTMLDivElement;
        router.push(`/${pathname.id}/${thisMonth}-${target.innerText}`)
    }

    return(
        <div className="account__container">
            <select onChange={handlechange} className="data__list" value={months[thisMonth-1]}> 
            {months.map((item)=>{
                return <option key={item} >{item}</option>
            })}
            </select>
            <section className="date__container">
                {daysOfWeek.map((item)=>{
                    return <div key={item} className="date__week">{item}</div>
                })}
                {result.map((item,index)=>{
                    return <div key={index} className={`date__item ${((parseInt(item)===Day.getDate()) && (thisMonth===Day.getMonth()+1)) && "date__today"}`}
                    onClick={(e)=>handleClick(e)} >{item}</div>
                })}
            </section>

        </div>
    )
}