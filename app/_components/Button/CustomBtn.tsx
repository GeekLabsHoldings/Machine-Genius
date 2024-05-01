'use client';
import Link from 'next/link';
import styles from './CustumBtn.module.css';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, LinkHTMLAttributes, ReactElement } from 'react';

// custom button props 
type IBtn =  React.DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
    word:string,
    btnColor:'white'|'black',
    icon?: ReactElement,
    href?:string
}

const CustomBtn = (props:IBtn)=>{


return(
    // custom button to navigate to the last or next page with black or white style and with icon or without it
    <Link className = {props.btnColor === 'white' ? styles.whiteBtn : styles.blackBtn} {...props} href={props.href?props.href:''}>
    <div className={styles.iconAndTxtBtn}>
    {props.icon ? props.icon : null}
    <span>{props.word}</span>
    </div>
    </Link>
)

}

export default CustomBtn;
