"use client"
import { onAuthStateChanged,getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase";
import "./page.css";
import { useRouter } from "next/navigation";
const app = initializeApp(firebaseConfig);

export default function Home() {
  const auth1 = getAuth()
  const router = useRouter()
  onAuthStateChanged(auth1,(user)=>{
    if(user){
      router.push(`/${user.uid}`)
    }
    else{
      return
    }
  })
  return (
    <main className="main">
      <section className="index">
        <h1>歡迎光臨！</h1>
        <h3>請先註冊/登入會員</h3>
      </section>
    </main>
  );
}


