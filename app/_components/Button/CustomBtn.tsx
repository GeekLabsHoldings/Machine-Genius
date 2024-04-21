'use client';
import Link from 'next/link';
import styles from './CustumBtn.module.css';
import { IBtn } from "@/app/interfaces/interfaces";

const CustomBtn = ({word,icon,btnColor,href}:IBtn)=>{


return(
    <Link href={href} className = {btnColor === 'white' ? styles.whiteBtn : styles.blackBtn}
    >
    <div className={styles.iconAndTxtBtn}>
    {icon ? icon : null}
    <span>{word}</span>
    </div>
    </Link>
)

}

export default CustomBtn;
