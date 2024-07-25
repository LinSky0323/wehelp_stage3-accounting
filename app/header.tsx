import Link from "next/link";
import "./globals.css";

export default function Header(){

    return (
        <header className="header">
            <h1><Link href={"/"}>公子請記帳！</Link></h1>
            <div className="header__btn">
                <Link href={"/signup"}>註冊</Link>
                <Link href={"/login"}>登入</Link>
                <Link href={"/logout"}>登出</Link>
            </div>
        </header>
    )
}