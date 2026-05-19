import Link from "next/link";
import Image from "next/image";
import MainHeaderBackground from "./main_header_background";
import LogoImage from "@/assets/logo.png";
import classes from './main_header.module.css';
import NavLink from "./nav_link";

export default function MainHeader(){

    return (
        <>
            <MainHeaderBackground/>
            <header className={classes.header}>
                <Link href="/" className={classes.logo}>
                    <Image src={LogoImage} alt="Logo" priority/>
                    NextLevel Food
                </Link>

                <nav className={classes.nav}>
                    <ul>
                        <li><NavLink linkName="Browser Meals" href="/meals"/></li>
                        <li><NavLink linkName="Community" href="/community"/></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}