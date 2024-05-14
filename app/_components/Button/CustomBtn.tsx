'use client';
import Link from 'next/link';
import styles from './CustumBtn.module.css';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, LinkHTMLAttributes, ReactElement } from 'react';

// custom button props 
type IBtn =  React.DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
    word?:string,
    btnColor:'white'|'black',
    icon?: ReactElement,
    href?:string,
    widthSize?:string | '',
    width ?: string,
    class?: string,
    paddingVal?:string
}

const CustomBtn = (props:IBtn)=>{


return(
    // custom button to navigate to the last or next page with black or white style and with icon or without it
    <Link className = {`${props.btnColor === 'white' ? styles.whiteBtn  : styles.blackBtn } ${props.class} ${props.width ? props.width : 'w-fit'} `} {...props} href={props.href?props.href:''}>
    <div className={`${styles.iconAndTxtBtn} ${props.paddingVal ? props.paddingVal : `py-[0.5vw] px-[3vw]`}`}>
    {props.icon ? props.icon : null}
    {props.word ?  <span>{props.word}</span> : null}
    </div>
    </Link>
)

}

export default CustomBtn;
