'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import classes from "./nav_link.module.css";

export default function NavLink({ href, linkName}) {
    const activePath = usePathname();
    
    return (
        <Link href={href} className={activePath.startsWith(href) ? classes.active : undefined}>
            {linkName}
        </Link>

    )

}